from django.db import models
from accounts.models import User
from Query.models import Category
 
  

class LiveCourse(models.Model):
    LEVEL_CHOICES = ( ('Beginner', 'Beginner'), ('Intermediate', 'Intermediate'), ('Advanced', 'Advanced'), )
    active = models.BooleanField(default=False)
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES, default='')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateField(auto_now=True)
    category = models.ForeignKey(Category,on_delete=models.SET_NULL, blank=True, null=True , related_name='category_live_course')
    card_image = models.ImageField(upload_to='files/images/LiveCourse/card_image/image/%Y/%m/%d/', blank=True)  
    title = models.CharField(max_length=225,blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    discount = models.IntegerField(null=False, default=0)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='author_live_course')
    Enroll = models.FloatField(default=0)
    waitingDate= models.DateField(blank=True, null=True)
    time = models.TimeField( blank=True, null=True)
    join_telegram  = models.TextField(blank=True, null=True)
    join_whatsapp  = models.TextField(blank=True, null=True)
    views  = models.IntegerField(default=0,blank=True, null=True)

    def __str__(self):
        return self.title
         
