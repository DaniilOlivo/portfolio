from django.urls import path
from analytics.views import recieve_analytics, DashboardView

urlpatterns = [
    path("dashboard/", DashboardView.as_view(), name="dashboard"),
    path("time/", recieve_analytics, name="recieve_analytics")
]
