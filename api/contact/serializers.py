# api/contact/serializers.py
from django.conf import settings
from rest_framework import serializers


class ContactSerializer(serializers.Serializer):
    """Validates a contact message. Whitespace is trimmed before checks."""

    name = serializers.CharField(
        max_length=settings.CONTACT_NAME_MAX_LENGTH,
        trim_whitespace=True,
        error_messages={
            "required": "Vul je naam in.",
            "null": "Vul je naam in.",
            "blank": "Vul je naam in.",
            "invalid": "Vul je naam in.",
            "max_length": "Je naam mag maximaal {max_length} tekens zijn.",
        },
    )
    message = serializers.CharField(
        max_length=settings.CONTACT_MESSAGE_MAX_LENGTH,
        trim_whitespace=True,
        error_messages={
            "required": "Vul een bericht in.",
            "null": "Vul een bericht in.",
            "blank": "Vul een bericht in.",
            "invalid": "Vul een bericht in.",
            "max_length": "Je bericht mag maximaal {max_length} tekens zijn.",
        },
    )
