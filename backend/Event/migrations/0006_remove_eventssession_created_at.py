# Generated by Django 5.0 on 2024-07-30 11:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Event', '0005_eventssession_date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='eventssession',
            name='created_at',
        ),
    ]
