from django.db import models
from LiveCourses.models.LiveCourse import LiveCourse

from LiveCourses.models.LearningPath import LearningPathPoint
from LiveCourses.models.Speaker import Speaker
from LiveCourses.models.CourseDefinition import CourseDefinition
from LiveCourses.models.Timeline import Timeline


class Base (models.Model):
    pixal_id= models.CharField(max_length=500,blank=True, null=True)

    Language = models.CharField(max_length=2, choices=[('ar', 'ar'),('en', 'en') ], default='ar')
    course = models.ForeignKey(LiveCourse , null = False ,  blank=True,on_delete=models.CASCADE, related_name='course_base')
    logo = models.ImageField(upload_to='files/images/Base/card_image/image/%Y/%m/%d/', blank=True)  
    gold_title = models.CharField(max_length=225)
    intro_video = models.CharField(max_length=100, blank=True, null=True) 
    intro_Waiting_video = models.CharField(max_length=100, blank=True, null=True) 
    intro_Live_video = models.CharField(max_length=100, blank=True, null=True) 
    intro_image = models.ImageField(upload_to='files/images/Base/course_images/image/%Y/%m/%d/', blank=True) 
    # CourseDefinition
    title_Course_Definition = models.CharField(max_length=225)
    definition= models.ManyToManyField(CourseDefinition, blank=True)  
    # Speaker
    speaker= models.ManyToManyField(Speaker, blank=True)  
    # author
    author_Title = models.CharField(max_length=225)
    job_title = models.CharField(max_length=300, blank=True, null=True)
    author_Image = models.ImageField(upload_to='files/images/Base/author_image/image/%Y/%m/%d/', blank=True, null=True)  
    author_Description1 = models.TextField(blank=True, null=True)
    author_Description2 = models.TextField(blank=True, null=True)
    author_Description3 = models.TextField(blank=True, null=True)
    # AchievementsBoard
    Title_Achievements_Hour= models.CharField(max_length=225)
    Number_Achievements_Hour= models.CharField(max_length=10)
    Title_Achievements_Book= models.CharField(max_length=225)
    Number_Achievements_Book= models.CharField(max_length=10)
    Title_Achievements_Grade= models.CharField(max_length=225)
    Number_Achievements_Grade= models.CharField(max_length=10)
    # LearningPath
    title_Learning_Path = models.CharField(max_length=100)
    learning_Path= models.ManyToManyField(LearningPathPoint, blank=True)  
    # Countdown
    Title_CountdownHead= models.CharField(max_length=300)
    Countdown_Description  = models.TextField(blank=True, null=True)
    Countdown_Button=  models.CharField(max_length=225)
    Countdown_P=  models.CharField(max_length=225)
    timeline = models.ForeignKey(Timeline, on_delete=models.SET_NULL,  related_name='timeline_base'  ,blank=True, null=True)
    expired = models.CharField(max_length=50,blank=True, null=True)
    sale= models.CharField(max_length=50,blank=True, null=True)
    # join
    join_telegram_public = models.TextField(blank=True, null=True)
    join_whatsapp_public = models.TextField(blank=True, null=True)
 
 
 

 