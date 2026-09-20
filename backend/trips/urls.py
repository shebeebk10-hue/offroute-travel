from django.urls import path
from .views import (
    TripListView,
    TripDetailView,
    SiteSettingsView,
)
urlpatterns = [
    path("trips/", TripListView.as_view(), name="trip-list"),
    path("trips/<slug:slug>/", TripDetailView.as_view(), name="trip-detail"),
    path("site-settings/", SiteSettingsView.as_view(), name="site-settings"),
]