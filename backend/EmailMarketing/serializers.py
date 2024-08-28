
from rest_framework import serializers
from .models import * 

class CampaignSerializer(serializers.ModelSerializer):
    customers_count = serializers.ReadOnlyField(source='customer_count')

    class Meta:
        model = Campaign
        fields = '__all__'



class Customer_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['name', 'email_address']
  
class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'



