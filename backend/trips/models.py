from django.db import models


class Trip(models.Model):
    # Basic Information
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)

    label = models.CharField(max_length=100, blank=True)
    destination = models.CharField(max_length=200)
    duration = models.CharField(max_length=100)

    short_description = models.TextField()
    description = models.TextField()

    # Images
    card_image = models.ImageField(
        upload_to="trips/cards/"
    )

    hero_image = models.ImageField(
        upload_to="trips/heroes/"
    )

    # Package Information
    package_details = models.TextField(blank=True)
    included = models.TextField(blank=True)
    excluded = models.TextField(blank=True)
    important_information = models.TextField(blank=True)

    # WhatsApp
    whatsapp_number = models.CharField(
        max_length=20,
        blank=True
    )

    whatsapp_message = models.TextField(
        blank=True
    )

    # Settings
    featured = models.BooleanField(default=False)
    published = models.BooleanField(default=True)

    # Timestamps
    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return self.title


class TripGalleryImage(models.Model):
    trip = models.ForeignKey(
        Trip,
        on_delete=models.CASCADE,
        related_name="gallery_images"
    )

    image = models.ImageField(
        upload_to="trips/gallery/"
    )

    caption = models.CharField(
        max_length=200,
        blank=True
    )

    order = models.PositiveIntegerField(
        default=0
    )

    def __str__(self):
        return f"{self.trip.title} - Gallery Image {self.order}"


class TripItineraryDay(models.Model):
    trip = models.ForeignKey(
        Trip,
        on_delete=models.CASCADE,
        related_name="itinerary"
    )

    day_number = models.PositiveIntegerField()

    title = models.CharField(
        max_length=200
    )

    description = models.TextField()

    def __str__(self):
        return f"{self.trip.title} - Day {self.day_number}"


class SiteSettings(models.Model):
    # Homepage
    hero_title = models.CharField(
        max_length=200,
        default="Go Offroute. See the Unseen."
    )

    hero_description = models.TextField(
        blank=True
    )

    # About Section
    about_title = models.CharField(
        max_length=200,
        default="Travel Beyond The Ordinary."
    )

    about_description = models.TextField(
        blank=True
    )

    about_image = models.ImageField(
        upload_to="site/",
        blank=True,
        null=True
    )

    # Contact
    whatsapp_number_1 = models.CharField(
        max_length=20,
        blank=True
    )

    whatsapp_number_2 = models.CharField(
        max_length=20,
        blank=True
    )

    instagram_username = models.CharField(
        max_length=100,
        default="@offroute.inn"
    )

    instagram_url = models.URLField(
        blank=True
    )

    # Footer
    footer_text = models.TextField(
        blank=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return "Offroute Site Settings"