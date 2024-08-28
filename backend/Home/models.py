from django.db import models
from accounts.models import User

class Slide(models.Model):
    top_slider_web= models.FileField(upload_to="files/images/Slide/image/%Y/%m/%d/", blank=True, null=True)
    top_slider_mobile= models.FileField(upload_to="files/images/Slide/image/%Y/%m/%d/", blank=True, null=True)
    is_active = models.BooleanField(default=True)
 

class Info(models.Model):
    logo_title = models.CharField(max_length=100, blank=True, null=True)
    about = models.CharField(max_length=500, blank=True, null=True)
    offer_message = models.CharField(max_length=500, blank=True, null=True)
    whatsapp = models.CharField(max_length=15, blank=True, null=True)
    linkedin = models.CharField(max_length=300, blank=True, null=True)
    snapchat = models.CharField(max_length=300, blank=True, null=True)
    instagram = models.CharField(max_length=300, blank=True, null=True)
    twitter = models.CharField(max_length=300, blank=True, null=True)
    facebook = models.CharField(max_length=300, blank=True, null=True)
    email = models.CharField(max_length=300, blank=True, null=True)
    pixal_id= models.CharField(max_length=500,blank=True, null=True)
    views  = models.IntegerField(default=0,blank=True, null=True)


    def __str__(self):
        return self.logo_title if self.logo_title else f'Info #{self.pk}'

 
 
class Rate(models.Model):
    created = models.DateTimeField(auto_now=True)
    message = models.TextField( blank=True, null=True)
    rate_number = models.IntegerField(default=0)
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='student_Rate_home', blank=True, null=True)



 
class Supporters(models.Model):
    title = models.CharField(max_length=100,blank=True, null=True)
    image = models.ImageField(upload_to='files/images/Supporters/image/%Y/%m/%d') 
    def __str__(self):
       return self.title
     
class TeamMembers(models.Model):
     teacher = models.ForeignKey(User, on_delete=models.CASCADE,  null=True, related_name='teacher_team_members')

