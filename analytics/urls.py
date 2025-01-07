from django.urls import path
from analytics.views import recieve_analytics

urlpatterns = [
    path("time/", recieve_analytics, name="recieve_analytics")
]
