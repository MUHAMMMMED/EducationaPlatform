# Generated by Django 5.0 on 2024-05-22 10:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('LiveCourses', '0003_alter_livecourse_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userlivecourse',
            name='date',
            field=models.DateField(auto_now=True),
        ),
    ]
