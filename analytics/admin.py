from django.contrib import admin
from analytics.models import Visit
from django.http import HttpResponseRedirect
from django.urls import reverse, path

class VisitAdmin (admin.ModelAdmin):
    change_list_template = "analytics/admin_changelist.html"


admin.site.register(Visit, VisitAdmin)
