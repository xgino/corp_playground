# api/contact/tests.py
from django.test import SimpleTestCase
from rest_framework.test import APIClient

URL = "/api/contact/"


class ContactEndpointTests(SimpleTestCase):
    def setUp(self):
        self.client = APIClient()

    def post(self, data):
        return self.client.post(URL, data, format="json")

    def test_valid_message_returns_201(self):
        response = self.post({"name": "Anna", "message": "Hallo!"})

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json(), {"success": True})

    def test_missing_fields_return_400_with_errors(self):
        response = self.post({})

        self.assertEqual(response.status_code, 400)
        self.assertEqual(set(response.json()["errors"]), {"name", "message"})

    def test_missing_message_only_flags_message(self):
        response = self.post({"name": "Anna"})

        self.assertEqual(response.status_code, 400)
        self.assertEqual(set(response.json()["errors"]), {"message"})

    def test_blank_fields_return_400(self):
        response = self.post({"name": "", "message": ""})

        self.assertEqual(response.status_code, 400)
        self.assertEqual(set(response.json()["errors"]), {"name", "message"})

    def test_whitespace_only_fields_return_400(self):
        response = self.post({"name": "   ", "message": " \n\t "})

        self.assertEqual(response.status_code, 400)
        self.assertEqual(set(response.json()["errors"]), {"name", "message"})

    def test_name_too_long_returns_400(self):
        response = self.post({"name": "a" * 101, "message": "Hallo"})

        self.assertEqual(response.status_code, 400)
        self.assertEqual(set(response.json()["errors"]), {"name"})

    def test_message_too_long_returns_400(self):
        response = self.post({"name": "Anna", "message": "a" * 2001})

        self.assertEqual(response.status_code, 400)
        self.assertEqual(set(response.json()["errors"]), {"message"})

    def test_max_length_values_are_accepted(self):
        response = self.post({"name": "a" * 100, "message": "b" * 2000})

        self.assertEqual(response.status_code, 201)

    def test_non_string_value_returns_400(self):
        response = self.post({"name": {"x": 1}, "message": ["y"]})

        self.assertEqual(response.status_code, 400)
        self.assertEqual(set(response.json()["errors"]), {"name", "message"})

    def test_get_returns_405(self):
        response = self.client.get(URL)

        self.assertEqual(response.status_code, 405)
