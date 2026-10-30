# api/config/urls.py
from django.urls import include, path

urlpatterns = [
    path("api/contact/", include("contact.urls")),
]
