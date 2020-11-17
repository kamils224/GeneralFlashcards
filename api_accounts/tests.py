from typing import Dict

from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase

from api_accounts.models import User


class UserAccountsTest(APITestCase):

    def setUp(self):
        self.user_data = {
            'username': 'exampleUser',
            'password': 'password123',
            'email': 'user@example.com'
        }
        self.bad_email_data = {
            'username': 'exampleUser',
            'password': 'password123',
            'email': 'bad_email.com'
        }

    def _post_register(self, user_data: Dict[str, str]):
        url = reverse('api_accounts:register')
        return self.client.post(url, user_data, format='json')

    def _post_login(self, user_data: Dict[str, str]):
        url = reverse('api_accounts:login')
        data = user_data.copy()
        del data['email']
        return self.client.post(url, data, format='json')

    def test_register(self):
        response = self._post_register(self.user_data)

        self.assertEquals(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().username, self.user_data['username'])

    def test_short_password(self):
        user_data = self.user_data
        user_data['password'] = '123'
        response = self._post_register(user_data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_bad_email_register(self):
        response = self._post_register(self.bad_email_data)

        self.assertEquals(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 0)

    def test_user_exists(self):
        User.objects.create_user(**self.user_data)
        response = self._post_register(self.user_data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)

    def test_login(self):
        User.objects.create_user(**self.user_data)
        response = self._post_login(self.user_data)
        data = response.data

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(data['username'], self.user_data['username'])

        self.assertEqual(data['username'], self.user_data['username'])
        self.assertEqual(data['email'], self.user_data['email'])
        self.assertTrue('user_id' in data)
        self.assertTrue('token' in data)

    def test_login_fail(self):
        User.objects.create_user(**self.user_data)
        user_data = self.user_data.copy()
        user_data['password'] = 'wrong_password'
        response = self._post_login(user_data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_password_change(self):
        old_user_data = self.user_data

        User.objects.create_user(**old_user_data)
        user = User.objects.get(username=old_user_data['username'])
        token = user.auth_token
        password_data = {'old_password': self.user_data['password'],
                         'new_password': 'new_password'}

        url = reverse('api_accounts:password_change')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

        new_user_data = self.user_data.copy()
        new_user_data['password'] = password_data['new_password']

        password_change_response = self.client.put(url, password_data)
        old_password_response = self._post_login(old_user_data)
        new_password_response = self._post_login(new_user_data)

        self.assertEqual(password_change_response.status_code, status.HTTP_200_OK)
        self.assertEqual(old_password_response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(new_password_response.status_code, status.HTTP_200_OK)
