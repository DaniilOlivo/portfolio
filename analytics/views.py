from analytics.models import Visit
from django.db.models import Avg
from django.views.generic import TemplateView
from django.http import HttpRequest, HttpResponse, JsonResponse
import json
import datetime


def recieve_analytics(request: HttpRequest):
    visit = Visit.objects.get(session=request.session.session_key)

    data = json.loads(request.body)
    new_delta = datetime.timedelta(milliseconds=int(data["milliseconds"]))
    visit.time_stay += new_delta
    visit.save()

    return HttpResponse("Ok")


def stats_view(request: HttpRequest):
    period = json.loads(request.body)["period"]

    map_delta_time = {
        "year": 365,
        "half-year": 365 // 2,
        "month": 30
    }

    if period == "all-time":
        visits = Visit.objects.all()
    else:
        visits = Visit.objects.filter(
            date__gt=datetime.datetime.now() - datetime.timedelta(days=map_delta_time[period])
            )
    count = visits.count()
    average = visits.aggregate(Avg("time_stay"))["time_stay__avg"]

    if average:
        average -= datetime.timedelta(microseconds=average.microseconds) # Убираем лишние микросекунды
    else:
        average = "Нет данных"

    return JsonResponse({
        "count": count,
        "average": str(average) # Преобразуем к читабельной строке
    })


class DashboardView (TemplateView):
    template_name = "analytics/dashboard.html"
    