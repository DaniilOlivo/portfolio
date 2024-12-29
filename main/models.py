from django.db import models

class About (models.Model):
    text = models.TextField("Текст")
    photo = models.ImageField("Фото", null=True)
    resume = models.FileField("Файл резюме", null=True)

    def __str__(self):
        return "Блок"

    class Meta:
        verbose_name = "Блок 'Обо мне'"
        verbose_name_plural = "Блок 'Обо мне'"
