# Generated by Django 5.0 on 2024-07-30 12:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Event', '0006_remove_eventssession_created_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='eventssession',
            name='IP',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
    ]
