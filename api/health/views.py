# api/health/views.py
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView


class HealthView(APIView):
    """Public endpoint (contract v1: docs/contracts/health.md). Only proves the API answers."""

    permission_classes = [permissions.AllowAny]
    authentication_classes = []
    http_method_names = ["get", "options"]

    def get(self, request):
        return Response({"status": "ok"})
