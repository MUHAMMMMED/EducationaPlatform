# Generated by Django 5.0 on 2024-07-30 11:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Event', '0004_alter_eventssession_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='eventssession',
            name='date',
            field=models.DateField(auto_now=True),
        ),
    ]
