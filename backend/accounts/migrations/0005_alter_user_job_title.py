# Generated by Django 5.0 on 2024-02-15 00:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_user_image_user_job_title'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='job_title',
            field=models.CharField(blank=True, max_length=300, null=True, verbose_name='Job Title'),
        ),
    ]
