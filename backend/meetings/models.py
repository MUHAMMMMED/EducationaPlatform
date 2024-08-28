from django.db import models
from LiveCourses.models.LiveCourse import LiveCourse
import uuid
from uuid import uuid4


class Meeting(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    roomId = models.UUIDField(default=uuid.uuid4, unique=True ) 
    active = models.BooleanField(default=True)
    title = models.CharField(max_length=225)
    date= models.DateField(blank=True, null=True)
    start_time = models.TimeField(blank=True, null=True)
    end_time = models.TimeField(blank=True, null=True)
    course = models.ForeignKey(LiveCourse, on_delete=models.CASCADE, related_name='course_meetings')
    student =  models.IntegerField(null=False, default=0)
    join_meeting_link = models.TextField(null=True, blank=True)
    
    def __str__(self):
        return self.title
 
 



 
 