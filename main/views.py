from django.views.generic import TemplateView, ListView
from main.models import About, Project

class PageMixin:
    github_link = True

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["current_page"] = self.id_page
        context["github_link"] = self.github_link
        return context
    

class IndexView (PageMixin, TemplateView):
    template_name = "main/index.html"
    id_page = "about"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        records_db = About.objects.all()
        # Объект по умолчанию
        about = About(text="Какой же я классный")
        if (records_db):
            about = records_db[0]
        context["about"] = about
        return context


class PortfolioView (PageMixin, ListView):
    template_name = "main/portfolio.html"
    id_page = "portfolio"
    model = Project
    context_object_name = "projects"


class ContactsView (PageMixin, TemplateView):
    template_name = "main/contacts.html"
    id_page = "contacts"
    github_link = False
