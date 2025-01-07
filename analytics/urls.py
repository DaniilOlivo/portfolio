from django.urls import path
from analytics.views import recieve_analytics, stats_view, DashboardView

urlpatterns = [
    path("stats/", stats_view, name="stats"),
    path("dashboard/", DashboardView.as_view(), name="dashboard"),
    path("time/", recieve_analytics, name="recieve_analytics")
]
