# Generated by Django 5.0 on 2024-05-22 10:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('LiveCourses', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='livecourse',
            name='price',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
    ]
