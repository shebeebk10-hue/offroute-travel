from rest_framework import serializers
from .models import (
    Trip,
    TripGalleryImage,
    TripItineraryDay,
    SiteSettings,
)

class TripGalleryImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = TripGalleryImage
        fields = [
            "id",
            "image",
            "caption",
            "order",
        ]


class TripItineraryDaySerializer(serializers.ModelSerializer):
    class Meta:
        model = TripItineraryDay
        fields = [
            "id",
            "day_number",
            "title",
            "description",
        ]


class TripSerializer(serializers.ModelSerializer):
    gallery_images = TripGalleryImageSerializer(
        many=True,
        read_only=True
    )

    itinerary = TripItineraryDaySerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = Trip
        fields = [
            "id",
            "title",
            "slug",
            "label",
            "destination",
            "duration",
            "short_description",
            "description",
            "card_image",
            "hero_image",
            "package_details",
            "included",
            "excluded",
            "important_information",
            "whatsapp_number",
            "whatsapp_message",
            "featured",
            "published",
            "created_at",
            "updated_at",
            "gallery_images",
            "itinerary",
        ]


class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = "__all__"