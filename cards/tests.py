from typing import Dict

from rest_framework import status
from rest_framework.reverse import reverse, reverse_lazy
from rest_framework.test import APITestCase

from accounts.models import User
from cards.models import FlashcardsCollection, Flashcard


class FlashcardsTest(APITestCase):
    OBTAIN_TOKEN_URL = reverse_lazy("accounts:token_obtain_pair")

    USERS_COUNT = 3
    CARDS_APP = "cards"

    def _init_users(self, items_count: int):
        self.users = []
        self.users_json = []
        for i in range(items_count):
            user = {
                "password": "password123",
                "email": f"example_email{i}@example.com",
            }
            self.users.append(User.objects.create_user(**user))
            self.users_json.append(user)

        User.objects.all().update(is_active=True)

    def _init_collections(
        self, items_count: int, user_id: int, is_public: bool = False, prefix: str = ""
    ):
        self.collections = []
        user = User.objects.get(id=user_id)
        for i in range(items_count):
            item_data = {
                "title": f"{prefix}title{i}",
                "owner": user,
                "is_public": is_public,
            }
            self.collections.append(FlashcardsCollection.objects.create(**item_data))

    def _init_flashcards(self, items_count: int, collection_id: int):
        self.flashcards = []
        for i in range(items_count):
            item_data = {
                "primary_text": f"primary text{i}",
                "secondary_text": f"secondary text{i}",
            }
            collection = FlashcardsCollection.objects.get(id=collection_id)
            item_data["collection"] = collection
            self.flashcards.append(Flashcard.objects.create(**item_data))

    def _login_user(self, user: Dict[str, str]) -> None:
        """
        Call before any request, to get user authenticated.
        """
        response = self.client.post(self.OBTAIN_TOKEN_URL, user, format="json")
        access_token = response.data["access"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {access_token}")

    def _create_flashcards(self, flashcards_count):
        collections_count = 1
        user = self.users[0]
        user_json = self.users_json[0]
        self._init_collections(collections_count, user.id, is_public=False)
        collection = self.collections[0]
        self._init_flashcards(flashcards_count, collection.id)
        return user, user_json, collection

    def setUp(self) -> None:
        # Flashcards require users as owners, so init them in setUp method
        self._init_users(self.USERS_COUNT)

    def test_get_public_collections(self):
        collections_count = 5
        user_id = self.users[0].id

        self._init_collections(collections_count, user_id, True)
        self._init_collections(collections_count, user_id, False, prefix="private")
        url = reverse(f"{self.CARDS_APP}:collection-list")
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), collections_count)

    def test_get_all_accessible_collections(self):
        collections_count = 5
        user_id = self.users[0].id
        other_user_id = self.users[1].id
        user_json = self.users_json[0]

        self._init_collections(collections_count, user_id, False)
        self._init_collections(collections_count, user_id, True, prefix="public")
        self._init_collections(
            collections_count, other_user_id, False, prefix="other_user"
        )
        url = reverse(f"{self.CARDS_APP}:collection-list")

        self._login_user(user_json)
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 10)

    def test_get_user_collections(self):
        collections_count = 5
        user = self.users[0]
        user_json = self.users_json[0]

        self._init_collections(collections_count, user.id, is_public=False)
        url = reverse(f"{self.CARDS_APP}:collection-user-collections")
        self._login_user(user_json)
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), collections_count)

    def test_get_user_collections_not_logged_in(self):
        collections_count = 5
        user = self.users[0]
        self._init_collections(collections_count, user.id, is_public=False)
        url = reverse(f"{self.CARDS_APP}:collection-user-collections")
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_collection_items(self):
        collections_count = 2
        flashcards_count = 5
        user_1 = self.users[0]
        user_1_json = self.users_json[0]
        user_2 = self.users[1]

        self._init_collections(collections_count, user_1.id, is_public=False)
        self._init_collections(collections_count, user_2.id, is_public=False)
        collection_1 = self.collections[0]
        collection_2 = self.collections[1]

        self._init_flashcards(flashcards_count, collection_1.id)
        self._init_flashcards(flashcards_count, collection_2.id)

        url = reverse(
            f"{self.CARDS_APP}:collection-flashcards", kwargs={"pk": collection_1.id}
        )
        self._login_user(user_1_json)
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), flashcards_count)

    def test_post_collection(self):
        url = reverse(f"{self.CARDS_APP}:collection-list")
        collection_count = FlashcardsCollection.objects.count()

        self._login_user(self.users_json[0])

        new_collection = {"title": "test title"}
        response = self.client.post(url, new_collection)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(FlashcardsCollection.objects.count(), collection_count + 1)
        self.assertEqual(response.data["title"], new_collection["title"])

    def test_delete_collection(self):
        collections_count = 5
        user = self.users[0]
        user_json = self.users_json[0]
        self._init_collections(collections_count, user.id, is_public=False)

        collection_count = FlashcardsCollection.objects.count()
        last_item = FlashcardsCollection.objects.last()

        url = reverse(f"{self.CARDS_APP}:collection-detail", args=[last_item.id])
        self._login_user(user_json)
        response = self.client.delete(url)

        self.assertEqual(FlashcardsCollection.objects.count(), collection_count - 1)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_get_flashcards(self):
        url = reverse(f"{self.CARDS_APP}:flashcard-list")
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_flashcards_logged_in(self):
        collections_count = 1
        flashcards_count_1 = 5
        flashcards_count_2 = 10
        user_1 = self.users[0]
        user_1_json = self.users_json[0]
        user_2 = self.users[1]
        user_2_json = self.users_json[1]
        user_3_json = self.users_json[2]

        self._init_collections(collections_count, user_1.id, is_public=False)
        self._init_flashcards(flashcards_count_1, self.collections[0].id)

        self._init_collections(collections_count, user_2.id, is_public=False)
        self._init_flashcards(flashcards_count_2, self.collections[0].id)

        url = reverse(f"{self.CARDS_APP}:flashcard-list")

        self._login_user(user_1_json)
        response_1 = self.client.get(url)

        self._login_user(user_2_json)
        response_2 = self.client.get(url)

        self._login_user(user_3_json)
        response_3 = self.client.get(url)

        self.assertEqual(response_1.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response_1.data), flashcards_count_1)

        self.assertEqual(response_2.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response_2.data), flashcards_count_2)

        self.assertEqual(response_3.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response_3.data), 0)

    def test_post_flashcard(self):
        flashcards_count = 5
        user, user_json, collection = self._create_flashcards(flashcards_count)

        new_flashcard = {
            "primary_text": "p_text",
            "secondary_text": "s_text",
            "collection": collection.id,
        }

        url = reverse(f"{self.CARDS_APP}:flashcard-list")
        fail_response = self.client.post(url, new_flashcard)

        self.assertEqual(fail_response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(Flashcard.objects.count(), flashcards_count)

        self._login_user(user_json)
        ok_response = self.client.post(url, new_flashcard)

        self.assertEqual(ok_response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Flashcard.objects.count(), flashcards_count + 1)

    def test_put_flashcard(self):
        flashcards_count = 1
        user, user_json, collection = self._create_flashcards(flashcards_count)

        new_flashcard = {
            "primary_text": "edited",
            "secondary_text": "edited",
            "collection": collection.id,
        }

        flashcard_id = self.flashcards[0].id
        url = reverse(f"{self.CARDS_APP}:flashcard-detail", args=[flashcard_id])

        before_update = Flashcard.objects.get(id=flashcard_id)
        fail_response = self.client.put(url, new_flashcard)
        after_update = Flashcard.objects.get(id=flashcard_id)

        self.assertEqual(fail_response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(before_update, after_update)

        self._login_user(user_json)
        ok_response = self.client.put(url, new_flashcard)
        after_update = Flashcard.objects.get(id=flashcard_id)

        self.assertEqual(ok_response.status_code, status.HTTP_200_OK)
        self.assertEqual(after_update.primary_text, new_flashcard["primary_text"])
        self.assertEqual(after_update.secondary_text, new_flashcard["secondary_text"])

    def test_delete_flashcard(self):
        flashcards_count = 1
        user, user_json, collection = self._create_flashcards(flashcards_count)

        flashcard_id = self.flashcards[0].id
        url = reverse(f"{self.CARDS_APP}:flashcard-detail", args=[flashcard_id])

        fail_response = self.client.delete(url)

        self.assertEqual(fail_response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(Flashcard.objects.count(), flashcards_count)

        self._login_user(user_json)
        ok_response = self.client.delete(url)

        self.assertEqual(ok_response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Flashcard.objects.count(), 0)
