# Generated by Django 4.1 on 2025-01-02 03:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_image_project'),
    ]

    operations = [
        migrations.CreateModel(
            name='Badge',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=40, verbose_name='Название')),
                ('link', models.URLField(verbose_name='Ссылка на значок')),
            ],
            options={
                'verbose_name': 'Значок',
                'verbose_name_plural': 'Значки',
            },
        ),
        migrations.CreateModel(
            name='Tech',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=40, verbose_name='Название группы')),
                ('detail', models.TextField(verbose_name='Подробности')),
                ('badges', models.ManyToManyField(to='main.badge', verbose_name='Значки технологий')),
                ('image', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='main.image', verbose_name='Изображение')),
            ],
            options={
                'verbose_name': 'Блок технологий',
                'verbose_name_plural': 'Блоки технологий',
            },
        ),
    ]
