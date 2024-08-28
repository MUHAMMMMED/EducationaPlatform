from django.db import models
from LiveCourses.models.LiveCourse import LiveCourse
from meetings.models import Meeting

class Timeline(models.Model):
    title = models.CharField(max_length=225)
    course = models.ForeignKey(LiveCourse, on_delete=models.CASCADE, related_name='course_timeline') 
    meeting = models.ForeignKey(Meeting, on_delete=models.SET_NULL, null=True, related_name='meeting_timeline') 
    join_Quiz = models.TextField(blank=True,null=True)
    Quiz_Coupon= models.CharField(max_length=100,blank=True,null=True)
    material_link= models.TextField(blank=True,null=True)
    Lesson_link = models.TextField(blank=True,null=True)
 
 