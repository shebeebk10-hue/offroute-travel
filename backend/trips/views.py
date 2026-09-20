from rest_framework import generics
from .models import Trip, SiteSettings
from .serializers import TripSerializer, SiteSettingsSerializer

class TripListView(generics.ListAPIView):
    queryset = Trip.objects.filter(
        published=True
    ).order_by("display_order")
    serializer_class = TripSerializer


class TripDetailView(generics.RetrieveAPIView):
    queryset = Trip.objects.filter(published=True)
    serializer_class = TripSerializer
    lookup_field = "slug"


class SiteSettingsView(generics.RetrieveAPIView):
    queryset = SiteSettings.objects.all()
    serializer_class = SiteSettingsSerializer

    def get_object(self):
        return SiteSettings.objects.first()