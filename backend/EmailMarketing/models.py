from django.db import models
  
class Customer(models.Model):
    name = models.CharField(max_length=200)
    email_address = models.EmailField()
    customer_status = (('active', 'active',),('inactive','inactive'))
    status = models.CharField(max_length=50,choices=customer_status,default='active')
    
    def __str__(self):
        return self.name

class Campaign(models.Model):
    Language = models.CharField(max_length=2, choices=[('ar', 'ar'),('en', 'en') ], default='ar')
    name = models.CharField(max_length=200)
    subject= models.CharField(max_length=300)
    message = models.CharField(max_length=500)
    Link = models.CharField(max_length=300)
    button_action = models.CharField(max_length=300)
    customer = models.ManyToManyField(Customer, blank=True)  

    def __str__(self):
        return self.name
    
    def customer_count(self):
        return self.customer.count()



