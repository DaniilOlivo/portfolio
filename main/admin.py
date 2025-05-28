from django.contrib import admin
from main.models import About, Image, Project, Badge, Tech
from solo.admin import SingletonModelAdmin

admin.site.register(About, SingletonModelAdmin)
admin.site.register(Image)
admin.site.register(Badge)

class PositionAdminMixin:
    list_display = ("title", "position",)
    ordering = ("position",)

@admin.register(Project)
class TechAdmin (PositionAdminMixin, admin.ModelAdmin):
    pass

@admin.register(Tech)
class TechAdmin (PositionAdminMixin, admin.ModelAdmin):
    pass
