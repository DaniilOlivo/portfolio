from django.urls import path
from main.views import *

urlpatterns = [
    path("portfolio/", PortfolioView.as_view(), name="portfolio"),
    path("contacts/", ContactsView.as_view(), name="contacts"),
    path("", IndexView.as_view(), name="index"),
]