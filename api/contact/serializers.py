# api/contact/serializers.py
from django.conf import settings
from rest_framework import serializers


class ContactSerializer(serializers.Serializer):
    """Validates a contact message. Whitespace is trimmed before checks.

    Error texts are the English DRF defaults; the frontend shows its own Dutch texts.
    """

    name = serializers.CharField(
        max_length=settings.CONTACT_NAME_MAX_LENGTH,
        trim_whitespace=True,
    )
    message = serializers.CharField(
        max_length=settings.CONTACT_MESSAGE_MAX_LENGTH,
        trim_whitespace=True,
    )
