from analytics.models import Visit
from django.db.models import Avg, Count, QuerySet
from django.db.models.functions import TruncMonth, TruncYear, TruncDay, Trunc
from django.views.generic import TemplateView, View
from django.http import HttpRequest, HttpResponse, JsonResponse
import json
from datetime import datetime, timedelta


months_labels = (
    "Январь", "Февраль", "Март",
    "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь",
    "Октябрь", "Ноябрь", "Декабрь",
)


def recieve_analytics(request: HttpRequest):
    try:
        visit = Visit.objects.get(session=request.session.session_key)
    except Visit.DoesNotExist:
        return JsonResponse({"status": "denied"})

    data = json.loads(request.body)
    new_delta = timedelta(milliseconds=int(data["milliseconds"]))
    visit.time_stay += new_delta
    visit.save()

    return JsonResponse({"status": "approved"})


class StatsView (View):
    map_delta_days = {
        "year": 365,
        "half-year": 180,
        "month": 30
    }

    map_periods = {
        "all-time": "year",
        "year": "month",
        "half-year": "month",
        "month": "day",
    }

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.queryset = QuerySet()
        self.response_data = {}
        self.chart_data = {}

    def get_queryset(self):
        period = self.kwargs["period"]
        if period == "all-time":
            visits = Visit.objects.all()
        else:
            visits = Visit.objects.filter(
                date__gt=datetime.now() - timedelta(days=self.map_delta_days[period])
            )
        self.queryset = visits
    
    def get_trunc_data(self, period: str):
        return (
            self.queryset
                .annotate(period=Trunc("date", period))
                .values("period")
                .annotate(count=Count("id"))
                .order_by("period")
        )

    def get_total_stats(self):
        average = self.queryset.aggregate(Avg("time_stay", default=timedelta()))["time_stay__avg"]
        average -= timedelta(microseconds=average.microseconds) # Убираем лишние микросекунды
        self.response_data["count"] = self.queryset.count()
        self.response_data["average"] = str(average)

    def get_chart_data(self):
        period = self.kwargs["period"]
        data = self.get_trunc_data(self.map_periods[period])

        if period == "all-time":
            years = [entry["period"].year for entry in data]
            min_year = min(years)
            max_year = max(years)
            
            # В случае если не прошло и более года
            if (max_year == max_year):
                last_year = datetime(year=min_year - 1, month=1, day=1).year
                years.insert(0, last_year)

            self.chart_data = {year:0 for year in years}
            for entry in data:
                self.chart_data[entry["period"].year] = entry["count"]

        elif period == "year" or period == "half-year":
            count_months = 12
            if period == "half-year":
                count_months = 6

            labels = [] 
            month = datetime.now().month
            for i in range(count_months):
                labels.append(month)
                month -= 1
                if month == 0:
                    month = 12
            labels.reverse()

            self.chart_data = {month:0 for month in labels}
            for entry in data:
                self.chart_data[entry["period"].month] = entry["count"]

        elif period == "month":
            labels = []
            date = datetime.now()
            for i in range(30):
                date -= timedelta(days=1)
                labels.append(date.day)
            labels.reverse()

            self.chart_data = {day:0 for day in labels }
            for entry in data:
                self.chart_data[entry["period"].day] = entry["count"]
        else:
            raise KeyError("Неправильный период")
        
        self.response_data["chart"] = {
            "data": list(self.chart_data.values()),
            "labels": list(self.chart_data.keys())
        }

    def get(self, *args, **kwargs):
        self.get_queryset()
        self.get_total_stats()
        self.get_chart_data()
        return JsonResponse(self.response_data)


class DashboardView (TemplateView):
    template_name = "analytics/dashboard.html"
    