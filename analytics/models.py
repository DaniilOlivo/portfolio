import datetime
from django.db import models
from django.utils import timezone

class Visit (models.Model):
    date = models.DateTimeField("Дата посещения", auto_now_add=True)
    session = models.CharField("Ключ сессии", max_length=40)
    time_stay = models.DurationField("Время на сайте", default=datetime.timedelta())

    def __str__(self):
        # Django не конвертирует время в нужный часовой пояс напрямую, он делает это только в шаблонах
        return f"{self.date.astimezone(timezone.get_default_timezone())} - {self.session}"

    class Meta:
        verbose_name = "Посещение"
        verbose_name_plural = "Посещения"
