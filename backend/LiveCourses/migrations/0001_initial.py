# Generated by Django 5.0 on 2024-05-21 19:11

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Query', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='CourseDefinition',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('description', models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Point',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('description', models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='UserLiveCourse',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('W', 'Waiting'), ('L', 'Live'), ('F', 'Finshed'), ('O', 'Out')], default='S', max_length=1)),
                ('phone', models.CharField(max_length=50)),
                ('date', models.DateField()),
                ('Paid', models.IntegerField(default=0)),
                ('discount', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Ask',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(blank=True, choices=[('waiting', 'Waiting'), ('live', 'live')], max_length=10, null=True)),
                ('content', models.TextField(blank=True, null=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('student', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Answr',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField()),
                ('Teacher', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('parent_comment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='answrs', to='LiveCourses.ask')),
            ],
        ),
        migrations.CreateModel(
            name='LiveCourse',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('active', models.BooleanField(default=False)),
                ('level', models.CharField(choices=[('Beginner', 'Beginner'), ('Intermediate', 'Intermediate'), ('Advanced', 'Advanced')], default='', max_length=20)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateField(auto_now=True)),
                ('card_image', models.ImageField(blank=True, upload_to='files/images/LiveCourse/card_image/image/%Y/%m/%d/')),
                ('title', models.CharField(blank=True, max_length=225, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('price', models.IntegerField(default=0)),
                ('discount', models.IntegerField(default=0)),
                ('Enroll', models.FloatField(default=0)),
                ('waitingDate', models.DateField(blank=True, null=True)),
                ('time', models.TimeField(blank=True, null=True)),
                ('join_telegram', models.TextField(blank=True, null=True)),
                ('join_whatsapp', models.TextField(blank=True, null=True)),
                ('views', models.IntegerField(blank=True, default=0, null=True)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('category', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='LiveCourse', to='Query.category')),
            ],
        ),
        migrations.AddField(
            model_name='ask',
            name='course',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='LiveCourses.livecourse'),
        ),
        migrations.CreateModel(
            name='LiveCourseCouponCode',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Code', models.CharField(max_length=100)),
                ('date', models.DateField(blank=True, null=True)),
                ('time', models.TimeField(blank=True, null=True)),
                ('Enroll', models.FloatField(default=1)),
                ('discount', models.IntegerField(default=0)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='LiveCourses.livecourse')),
            ],
        ),
        migrations.CreateModel(
            name='LiveCourseFrequentlyAsked',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.TextField(blank=True, null=True)),
                ('answer', models.TextField(blank=True, null=True)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='LiveCourses.livecourse')),
            ],
        ),
        migrations.CreateModel(
            name='LiveCourseRate',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.TextField(blank=True, null=True)),
                ('created', models.DateTimeField(auto_now=True)),
                ('rate_number', models.IntegerField(default=0)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='LiveCourses.livecourse')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='live_course_rates', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='LiveCourseReview',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='files/images/LiveCourseReview/Review_images/image/%Y/%m/%d/')),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='LiveCourses.livecourse')),
            ],
        ),
        migrations.CreateModel(
            name='LearningPathPoint',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('point', models.ManyToManyField(blank=True, to='LiveCourses.point')),
            ],
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('question', models.TextField(blank=True, null=True)),
                ('answer', models.TextField(blank=True, null=True)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='LiveCourses.livecourse')),
            ],
        ),
        migrations.CreateModel(
            name='Speaker',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(max_length=500)),
                ('Teacher', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Base',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pixal_id', models.CharField(blank=True, max_length=500, null=True)),
                ('Language', models.CharField(choices=[('ar', 'ar'), ('en', 'en')], default='ar', max_length=2)),
                ('logo', models.ImageField(blank=True, upload_to='files/images/Base/card_image/image/%Y/%m/%d/')),
                ('gold_title', models.CharField(max_length=225)),
                ('intro_video', models.CharField(blank=True, max_length=100, null=True)),
                ('intro_Waiting_video', models.CharField(blank=True, max_length=100, null=True)),
                ('intro_Live_video', models.CharField(blank=True, max_length=100, null=True)),
                ('intro_image', models.ImageField(blank=True, upload_to='files/images/Base/course_images/image/%Y/%m/%d/')),
                ('title_Course_Definition', models.CharField(max_length=225)),
                ('author_Title', models.CharField(max_length=225)),
                ('job_title', models.CharField(blank=True, max_length=300, null=True)),
                ('author_Image', models.ImageField(blank=True, null=True, upload_to='files/images/Base/author_image/image/%Y/%m/%d/')),
                ('author_Description1', models.TextField(blank=True, null=True)),
                ('author_Description2', models.TextField(blank=True, null=True)),
                ('author_Description3', models.TextField(blank=True, null=True)),
                ('Title_Achievements_Hour', models.CharField(max_length=225)),
                ('Number_Achievements_Hour', models.CharField(max_length=10)),
                ('Title_Achievements_Book', models.CharField(max_length=225)),
                ('Number_Achievements_Book', models.CharField(max_length=10)),
                ('Title_Achievements_Grade', models.CharField(max_length=225)),
                ('Number_Achievements_Grade', models.CharField(max_length=10)),
                ('title_Learning_Path', models.CharField(max_length=100)),
                ('Title_CountdownHead', models.CharField(max_length=300)),
                ('Countdown_Description', models.TextField(blank=True, null=True)),
                ('Countdown_Button', models.CharField(max_length=225)),
                ('Countdown_P', models.CharField(max_length=225)),
                ('expired', models.CharField(blank=True, max_length=50, null=True)),
                ('sale', models.CharField(blank=True, max_length=50, null=True)),
                ('join_telegram_public', models.TextField(blank=True, null=True)),
                ('join_whatsapp_public', models.TextField(blank=True, null=True)),
                ('definition', models.ManyToManyField(blank=True, to='LiveCourses.coursedefinition')),
                ('learning_Path', models.ManyToManyField(blank=True, to='LiveCourses.learningpathpoint')),
                ('course', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='LiveCourses.livecourse')),
                ('speaker', models.ManyToManyField(blank=True, to='LiveCourses.speaker')),
            ],
        ),
        migrations.CreateModel(
            name='Timeline',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=225)),
                ('join_Quiz', models.TextField(blank=True, null=True)),
                ('Quiz_Coupon', models.CharField(blank=True, max_length=100, null=True)),
                ('material_link', models.TextField(blank=True, null=True)),
                ('Lesson_link', models.TextField(blank=True, null=True)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='LiveCourses.livecourse')),
            ],
        ),
    ]
