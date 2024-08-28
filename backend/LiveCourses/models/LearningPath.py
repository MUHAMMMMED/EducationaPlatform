
from django.db import models
 
class Point(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    def __str__(self):
        return self.title

class  LearningPathPoint(models.Model):
    title = models.CharField(max_length=100)
    point= models.ManyToManyField( Point , blank=True)  
    def __str__(self):
        return self.title