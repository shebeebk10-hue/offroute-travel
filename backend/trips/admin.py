from django.contrib import admin
from .models import (
    Trip,
    TripGalleryImage,
    TripItineraryDay,
    SiteSettings,
)

class TripGalleryImageInline(admin.TabularInline):
    model = TripGalleryImage
    extra = 1
    fields = (
        "image",
        "caption",
        "order",
    )
    verbose_name = "Gallery Image"
    verbose_name_plural = "Gallery Images"


class TripItineraryDayInline(admin.StackedInline):
    model = TripItineraryDay
    extra = 1
    fields = (
        "day_number",
        "title",
        "description",
    )
    verbose_name = "Itinerary Day"
    verbose_name_plural = "Day-by-Day Itinerary"


@admin.register(Trip)
class TripAdmin(admin.ModelAdmin):

    list_display = (
        "title",
        "destination",
        "duration",
        "featured",
        "display_order",
        "published",
    )

    list_editable = ("display_order",)

    list_filter = (
        "featured",
        "published",
    )

    search_fields = (
        "title",
        "destination",
    )

    prepopulated_fields = {
        "slug": ("title",)
    }

    fieldsets = (
        (
            "Basic Information",
            {
                "fields": (
                    "title",
                    "slug",
                    "label",
                    "destination",
                    "duration",
                    "short_description",
                    "description",
                )
            },
        ),

        (
            "Trip Images",
            {
                "fields": (
                    "card_image",
                    "hero_image",
                )
            },
        ),

        (
            "Package Information",
            {
                "fields": (
                    "package_details",
                    "included",
                    "excluded",
                    "important_information",
                ),
                "classes": ("collapse",),
            },
        ),

        (
            "WhatsApp Enquiry",
            {
                "fields": (
                    "whatsapp_number",
                    "whatsapp_message",
                ),
            },
        ),

        (
            "Publishing",
            {
                "fields": (
                    "featured",
                    "display_order",
                    "published",
                ),
            },
        ),

        (
            "System Information",
            {
                "fields": (
                    "created_at",
                    "updated_at",
                ),
                "classes": ("collapse",),
            },
        ),
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    inlines = (
        TripGalleryImageInline,
        TripItineraryDayInline,
    )


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    fieldsets = (
        (
            "Homepage",
            {
                "fields": (
                    "hero_title",
                    "hero_description",
                )
            },
        ),
        (
            "About Section",
            {
                "fields": (
                    "about_title",
                    "about_description",
                    "about_image",
                )
            },
        ),
        (
            "Contact",
            {
                "fields": (
                    "whatsapp_number_1",
                    "whatsapp_number_2",
                    "instagram_username",
                    "instagram_url",
                )
            },
        ),
        (
            "Footer",
            {
                "fields": (
                    "footer_text",
                )
            },
        ),
        (
            "System Information",
            {
                "fields": (
                    "updated_at",
                ),
                "classes": ("collapse",),
            },
        ),
    )

    readonly_fields = ("updated_at",)