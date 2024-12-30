from django.db import models

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
    text = models.TextField("Текст")
    photo = models.ImageField("Фото", null=True)
    resume = models.FileField("Файл резюме", null=True)

    def __str__(self):
        return "Блок"

    class Meta:
        verbose_name = "Блок 'Обо мне'"
        verbose_name_plural = "Блок 'Обо мне'"


class Project (models.Model):
    title = models.CharField("Название", max_length=120)
    desc = models.TextField("Описание")
    images = models.ManyToManyField(Image, verbose_name="Изображения")
    link_github = models.URLField("Ссылка на GitHub", null=True, blank=True)
    link_site = models.URLField("ССылка на сайт", null=True, blank=True)

    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name = "Проект"
        verbose_name_plural = "Проекты"