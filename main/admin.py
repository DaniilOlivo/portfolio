from django.contrib import admin
from main.models import About, Image, Project, Badge, Tech

admin.site.register(About)
admin.site.register(Image)
admin.site.register(Project)
admin.site.register(Badge)

@admin.register(Tech)
class TechAdmin (admin.ModelAdmin):
    list_display = ("title", "position",)
    ordering = ("position",)
