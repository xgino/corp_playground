# api/contact/tests.py
from django.test import SimpleTestCase, override_settings
from rest_framework.test import APIClient

URL = "/api/contact/"
ALLOWED_ORIGIN = "http://localhost:3000"


class ContactEndpointTests(SimpleTestCase):
    def setUp(self):
        self.client = APIClient()

    def post(self, data):
        return self.client.post(URL, data, format="json")

    def assert_invalid(self, response, expected):
        """Checks the contract's 400 body; expected maps field -> list of messages."""
        self.assertEqual(response.status_code, 400)
        self.assertEqual(
            response.json(),
            {"detail": "Invalid input", "code": "invalid", "errors": expected},
        )

    def test_valid_message_returns_201(self):
        response = self.post({"name": "Sanne", "message": "Hallo, ik heb een vraag."})

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json(), {"detail": "Message received", "code": "received"})

    def test_missing_fields_return_400_with_required_errors(self):
        response = self.post({})

        self.assert_invalid(
            response,
            {"name": ["This field is required."], "message": ["This field is required."]},
        )

    def test_missing_message_only_flags_message(self):
        response = self.post({"name": "Sanne"})

        self.assert_invalid(response, {"message": ["This field is required."]})

    def test_blank_fields_return_400(self):
        response = self.post({"name": "", "message": ""})

        self.assert_invalid(
            response,
            {
                "name": ["This field may not be blank."],
                "message": ["This field may not be blank."],
            },
        )

    def test_whitespace_only_fields_return_400(self):
        response = self.post({"name": "   ", "message": " \n\t "})

        self.assert_invalid(
            response,
            {
                "name": ["This field may not be blank."],
                "message": ["This field may not be blank."],
            },
        )

    def test_name_too_long_returns_400(self):
        response = self.post({"name": "a" * 101, "message": "Hallo"})

        self.assert_invalid(
            response,
            {"name": ["Ensure this field has no more than 100 characters."]},
        )

    def test_message_too_long_returns_400(self):
        response = self.post({"name": "Sanne", "message": "a" * 2001})

        self.assert_invalid(
            response,
            {"message": ["Ensure this field has no more than 2000 characters."]},
        )

    def test_max_length_values_are_accepted(self):
        response = self.post({"name": "a" * 100, "message": "b" * 2000})

        self.assertEqual(response.status_code, 201)

    def test_padded_values_are_trimmed_before_length_check(self):
        response = self.post({"name": "  " + "a" * 100 + "  ", "message": " Hallo "})

        self.assertEqual(response.status_code, 201)

    def test_non_string_value_returns_400(self):
        response = self.post({"name": {"x": 1}, "message": ["y"]})

        self.assertEqual(response.status_code, 400)
        body = response.json()
        self.assertEqual(set(body["errors"]), {"name", "message"})
        for messages in body["errors"].values():
            self.assertIsInstance(messages, list)

    def test_get_returns_405(self):
        response = self.client.get(URL)

        self.assertEqual(response.status_code, 405)
        self.assertEqual(response.json(), {"detail": 'Method "GET" not allowed.'})


@override_settings(CORS_ALLOWED_ORIGINS=[ALLOWED_ORIGIN])
class ContactCorsTests(SimpleTestCase):
    def setUp(self):
        self.client = APIClient()

    def preflight(self, origin):
        return self.client.options(
            URL,
            HTTP_ORIGIN=origin,
            HTTP_ACCESS_CONTROL_REQUEST_METHOD="POST",
            HTTP_ACCESS_CONTROL_REQUEST_HEADERS="content-type",
        )

    def test_preflight_from_allowed_origin_is_accepted(self):
        response = self.preflight(ALLOWED_ORIGIN)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response["Access-Control-Allow-Origin"], ALLOWED_ORIGIN)
        allowed = {m.strip() for m in response["Access-Control-Allow-Methods"].split(",")}
        self.assertEqual(allowed, {"POST", "OPTIONS"})

    def test_preflight_from_other_origin_gets_no_cors_headers(self):
        response = self.preflight("http://evil.example")

        self.assertNotIn("Access-Control-Allow-Origin", response)

    def test_post_from_allowed_origin_has_cors_header(self):
        response = self.client.post(
            URL,
            {"name": "Sanne", "message": "Hallo"},
            format="json",
            HTTP_ORIGIN=ALLOWED_ORIGIN,
        )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response["Access-Control-Allow-Origin"], ALLOWED_ORIGIN)
