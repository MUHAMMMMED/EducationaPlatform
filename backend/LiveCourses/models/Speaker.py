from django.db import models
from accounts.models import User


class Speaker(models.Model):
    Teacher = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, related_name='teacher_speaker') 
    description = models.CharField(max_length=500)
 