from django.urls import path
from main.views import *

urlpatterns = [
    path("portfolio/", PortfolioView.as_view(), name="portfolio"),
    path("", IndexView.as_view(), name="index"),
]