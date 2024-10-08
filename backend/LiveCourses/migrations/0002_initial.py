# Generated by Django 5.0 on 2024-05-21 19:11

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('LiveCourses', '0001_initial'),
        ('meetings', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='timeline',
            name='meeting',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='meetings.meeting'),
        ),
        migrations.AddField(
            model_name='base',
            name='timeline',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='meetings', to='LiveCourses.timeline'),
        ),
        migrations.AddField(
            model_name='userlivecourse',
            name='course',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='LiveCourses.livecourse'),
        ),
        migrations.AddField(
            model_name='userlivecourse',
            name='student',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
