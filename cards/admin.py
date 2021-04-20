from django.contrib import admin

from cards.models import Flashcard
from cards.models import FlashcardsCollection


class FlashcardAdmin(admin.ModelAdmin):
    list_display = ("primary_text", "secondary_text", "collection")


admin.site.register(Flashcard, FlashcardAdmin)


class FlashcardInline(admin.TabularInline):
    model = Flashcard


class FlashcardsCollectionAdmin(admin.ModelAdmin):
    list_display = ["title"]
    inlines = [FlashcardInline]


admin.site.register(FlashcardsCollection, FlashcardsCollectionAdmin)
