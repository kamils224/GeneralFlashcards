from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase

from api_accounts.models import User
from api_flashcards.models import FlashcardsCollection, Flashcard


class FlashcardsTest(APITestCase):
    USERS_COUNT = 3

    # Flashcards require users as owners, so init them in setUp method
    def _init_users(self, items_count: int):
        self.users = []
        for i in range(items_count):
            user = {'username': f'user{i}',
                    'password': 'password123',
                    'email': f'example_email{i}@example.com'}
            self.users.append(User.objects.create_user(**user))

    def _init_collections(self, items_count: int, user_id: int, is_public: bool = False):
        self.collections = []
        user = User.objects.get(id=user_id)
        for i in range(items_count):
            item_data = {
                'title': f'title{i}',
                'description': f'description{i}',
                'advancement_level': i,
                'owner': user,
                'is_public': is_public
            }
            self.collections.append(FlashcardsCollection.objects.create(**item_data))

    def _init_flashcards(self, items_count: int, collection_id: int):
        self.flashcards = []
        for i in range(items_count):
            item_data = {
                'primary_text': f'primary text{i}',
                'secondary_text': f'secondary text{i}',
            }
            collection = FlashcardsCollection.objects.get(id=collection_id)
            item_data['collection'] = collection
            self.flashcards.append(Flashcard.objects.create(**item_data))

    def _set_user_token(self, user):
        """
        Call before any request, to get user authenticated.
        """
        token = user.auth_token
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

    def setUp(self) -> None:
        self._init_users(self.USERS_COUNT)

    def test_get_public_collections(self):
        collections_count = 5
        user_id = self.users[0].id

        self._init_collections(collections_count, user_id, True)
        url = reverse('api_flashcards:collection-list')
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), collections_count)

    def test_get_private_collections(self):
        collections_count = 5
        user_id = self.users[0].id

        self._init_collections(collections_count, user_id, False)
        url = reverse('api_flashcards:collection-list')
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

    def test_get_user_collections(self):
        collections_count = 5
        user = self.users[0]
        self._init_collections(collections_count, user.id, is_public=False)

        url = reverse('api_flashcards:collection-user-collections')
        self._set_user_token(user)
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), collections_count)

    def test_get_user_collections_not_logged_in(self):
        collections_count = 5
        user = self.users[0]
        self._init_collections(collections_count, user.id, is_public=False)
        url = reverse('api_flashcards:collection-user-collections')
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_collection_items(self):
        collections_count = 2
        flashcards_count = 5
        user_1 = self.users[0]
        user_2 = self.users[1]

        self._init_collections(collections_count, user_1.id, is_public=False)
        self._init_collections(collections_count, user_2.id, is_public=False)
        collection_1 = self.collections[0]
        collection_2 = self.collections[1]

        self._init_flashcards(flashcards_count, collection_1.id)
        self._init_flashcards(flashcards_count, collection_2.id)

        url = reverse('api_flashcards:collection-items', kwargs={'pk': collection_1.id})
        self._set_user_token(user_1)
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), flashcards_count)

    def test_get_flashcards(self):
        url = reverse('api_flashcards:flashcard-list')
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_flashcards_logged_in(self):
        collections_count = 1
        flashcards_count_1 = 5
        flashcards_count_2 = 10
        user_1 = self.users[0]
        user_2 = self.users[1]
        user_3 = self.users[2]

        self._init_collections(collections_count, user_1.id, is_public=False)
        self._init_flashcards(flashcards_count_1, self.collections[0].id)

        self._init_collections(collections_count, user_2.id, is_public=False)
        self._init_flashcards(flashcards_count_2, self.collections[0].id)

        token_1 = user_1.auth_token
        url = reverse('api_flashcards:flashcard-list')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token_1.key)
        response_1 = self.client.get(url)

        token_2 = user_2.auth_token
        url = reverse('api_flashcards:flashcard-list')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token_2.key)
        response_2 = self.client.get(url)

        token_3 = user_3.auth_token
        url = reverse('api_flashcards:flashcard-list')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token_3.key)
        response_3 = self.client.get(url)

        self.assertEqual(response_1.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response_1.data), flashcards_count_1)

        self.assertEqual(response_2.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response_2.data), flashcards_count_2)

        self.assertEqual(response_3.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response_3.data), 0)

    def _create_flashcards(self, flashcards_count):
        collections_count = 1
        user = self.users[0]
        self._init_collections(collections_count, user.id, is_public=False)
        collection = self.collections[0]
        self._init_flashcards(flashcards_count, collection.id)
        return user, collection

    def test_post_flashcard(self):
        flashcards_count = 5
        user, collection = self._create_flashcards(flashcards_count)

        new_flashcard = {
            'primary_text': 'p_text',
            'secondary_text': 's_text',
            'collection': collection.id,
        }

        url = reverse('api_flashcards:flashcard-list')
        fail_response = self.client.post(url, new_flashcard)

        self.assertEqual(fail_response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(Flashcard.objects.count(), flashcards_count)

        self._set_user_token(user)
        ok_response = self.client.post(url, new_flashcard)

        self.assertEqual(ok_response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Flashcard.objects.count(), flashcards_count + 1)

    def test_put_flashcard(self):
        flashcards_count = 1
        user, collection = self._create_flashcards(flashcards_count)

        new_flashcard = {
            'primary_text': 'edited',
            'secondary_text': 'edited',
            'collection': collection.id,
        }

        flashcard_id = self.flashcards[0].id
        url = reverse('api_flashcards:flashcard-detail', args=[flashcard_id])

        before_update = Flashcard.objects.get(id=flashcard_id)
        fail_response = self.client.put(url, new_flashcard)
        after_update = Flashcard.objects.get(id=flashcard_id)

        self.assertEqual(fail_response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(before_update, after_update)

        self._set_user_token(user)
        ok_response = self.client.put(url, new_flashcard)
        after_update = Flashcard.objects.get(id=flashcard_id)

        self.assertEqual(ok_response.status_code, status.HTTP_200_OK)
        self.assertEqual(after_update.primary_text, new_flashcard['primary_text'])
        self.assertEqual(after_update.secondary_text, new_flashcard['secondary_text'])

    def test_delete_flashcard(self):
        flashcards_count = 1
        user, collection = self._create_flashcards(flashcards_count)

        flashcard_id = self.flashcards[0].id
        url = reverse('api_flashcards:flashcard-detail', args=[flashcard_id])

        fail_response = self.client.delete(url)

        self.assertEqual(fail_response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(Flashcard.objects.count(), flashcards_count)

        self._set_user_token(user)
        ok_response = self.client.delete(url)

        self.assertEqual(ok_response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Flashcard.objects.count(), 0)
