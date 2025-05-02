from django.db import models
from colorfield.fields import ColorField

class Image (models.Model):
    title = models.CharField("Название", max_length=256, blank=True)
    file = models.ImageField("Файл", upload_to="images")

    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name = "Изображение"
        verbose_name_plural = "Изображения"

    def save(self):
        if not self.title:
            self.title = self.file.name.split('/')[-1].split('.')[0]
        return super().save()


class About (models.Model):
    text = models.TextField("Текст", max_length=360)
    photo = models.ImageField("Фото", null=True)
    resume = models.FileField("Файл резюме", null=True)

    def __str__(self):
        return "Блок"

    class Meta:
        verbose_name = "Блок 'Обо мне'"
        verbose_name_plural = "Блок 'Обо мне'"


class Project (models.Model):
    title = models.CharField("Название", max_length=120)
    desc = models.TextField("Описание", max_length=700, help_text="Используй |, чтобы создать абзацы")
    images = models.ManyToManyField(Image, verbose_name="Изображения")
    link_github = models.URLField("Ссылка на GitHub", null=True, blank=True)
    link_site = models.URLField("ССылка на сайт", null=True, blank=True)

    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name = "Проект"
        verbose_name_plural = "Проекты"


class Badge (models.Model):
    title = models.CharField("Название", max_length=40)
    color = ColorField("Цвет", default="#FFFFFF")
    logo = models.ImageField("Лого технологии", upload_to="badges", null=True)

    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name = "Значок"
        verbose_name_plural = "Значки"


class Tech (models.Model):
    position = models.IntegerField("Позиция", unique=True, null=True)
    title = models.CharField("Название группы", max_length=40)
    image = models.ForeignKey(Image, verbose_name="Изображение", on_delete=models.PROTECT)
    badges = models.ManyToManyField(Badge, verbose_name="Значки технологий")
    detail = models.TextField("Подробности", max_length=250)

    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name = "Блок технологий"
        verbose_name_plural = "Блоки технологий"
