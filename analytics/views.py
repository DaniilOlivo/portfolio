from analytics.models import Visit
from django.http import HttpRequest, HttpResponse
import json
from datetime import timedelta

def recieve_analytics(request: HttpRequest):
    visit = Visit.objects.get(session=request.session.session_key)

    data = json.loads(request.body)
    new_delta = timedelta(milliseconds=int(data["milliseconds"]))
    visit.time_stay += new_delta
    visit.save()

    return HttpResponse("Ok")
    