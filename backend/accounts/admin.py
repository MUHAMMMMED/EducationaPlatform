from django.contrib import admin
from .models import  *

admin.site.register(User)
admin.site.register(OneTimePassword)
admin.site.register(Dictionary)
admin.site.register(Country)
admin.site.register(Region)
admin.site.register(City)
 