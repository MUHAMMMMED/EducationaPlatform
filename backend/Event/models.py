from django.db import models
import uuid
from uuid import uuid4


class Event(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    active = models.BooleanField(default=False)
    roomId = models.UUIDField(default=uuid.uuid4, unique=True ) 
    title = models.CharField(max_length=225, null=True)
    description = models.TextField(null=True)
    date= models.DateField( null=True)
    start_time = models.TimeField(  null=True)
    end_time = models.TimeField(  null=True)
    join_meeting_link = models.TextField(null=True, blank=True)
    completed = models.BooleanField(default=False)
    join_telegram  = models.TextField(blank=True, null=True)
    join_whatsapp  = models.TextField(blank=True, null=True)
    views  = models.IntegerField(default=0,blank=True, null=True)
 
    def __str__(self):
        return self.title
 
class Learn(models.Model):
    event = models.ForeignKey(Event , null = False , on_delete=models.CASCADE, related_name='event_Learn')
    title = models.CharField(max_length=500)
    def __str__(self):
        return self.title
 
class Speaker(models.Model):
    event = models.ForeignKey(Event , null = False , on_delete=models.CASCADE,  related_name='event_speaker')
    image = models.ImageField(upload_to='files/images/Event/Speaker/image/%Y/%m/%d/' )  
    name = models.CharField(max_length=225 )
    info = models.CharField(max_length=500)
    def __str__(self):
        return self.name
    
# class EventsSession(models.Model):
#     date= models.DateField(auto_now=True)
#     session_id = models.CharField(max_length=255)
#     IP = models.CharField(max_length=20,blank=True, null=True)
#     name = models.CharField(max_length=225,blank=True, null=True)
#     status = models.CharField(max_length=1, choices=[('L', 'Live'), ('B', 'Block'), ], default='L')
#     def __str__(self):
#         return self.name