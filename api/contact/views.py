# api/contact/views.py
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import ContactSerializer


class ContactView(APIView):
    """Public endpoint. Validates name and message; stores, logs and sends nothing."""

    permission_classes = [permissions.AllowAny]
    authentication_classes = []
    http_method_names = ["post", "options"]

    def post(self, request):
        serializer = ContactSerializer(data=request.data)
        if not serializer.is_valid():
            errors = {field: messages[0] for field, messages in serializer.errors.items()}
            return Response({"errors": errors}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"success": True}, status=status.HTTP_201_CREATED)
