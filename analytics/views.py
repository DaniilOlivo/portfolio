from analytics.models import Visit
from django.views.generic import TemplateView
from django.http import HttpRequest, HttpResponse
import json
from datetime import timedelta


def getStatsVisits():
    visits = Visit.objects.all()
    count = visits.count()
    average = sum(map(lambda v: v.time_stay, visits), timedelta()) / count
    return {
        "count": count,
        "average": average - timedelta(microseconds=average.microseconds) # Убираем лишние микросекунды
    }


def recieve_analytics(request: HttpRequest):
    visit = Visit.objects.get(session=request.session.session_key)

    data = json.loads(request.body)
    new_delta = timedelta(milliseconds=int(data["milliseconds"]))
    visit.time_stay += new_delta
    visit.save()

    return HttpResponse("Ok")


class DashboardView (TemplateView):
    template_name = "analytics/dashboard.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        stats = getStatsVisits()
        context.update(stats)
        return context
    
    