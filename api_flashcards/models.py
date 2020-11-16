from django.db import models
from django.conf import settings
from django.core.validators import MaxValueValidator, MinValueValidator


class FlashcardsCollection(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=255)
    advancement_level = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(10)])
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='collection', on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True)
    is_public = models.BooleanField(default=False)

    class Meta:
        unique_together = ('title', 'owner')

    def __str__(self):
        return self.title


class Flashcard(models.Model):
    primary_text = models.CharField(max_length=255, default='')
    secondary_text = models.CharField(max_length=255, default='')
    collection = models.ForeignKey(FlashcardsCollection,
                                   related_name='flashcards',
                                   on_delete=models.CASCADE,
                                   default=None)
