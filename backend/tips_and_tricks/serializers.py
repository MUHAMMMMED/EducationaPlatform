from rest_framework import serializers
from .models import Tip
from accounts.serializers import UserSerializerwithId
from Query.serializers import CategorySerializer

class TipSerializer(serializers.ModelSerializer):
    category = CategorySerializer()   
    author = UserSerializerwithId()

    class Meta:
        model = Tip
        fields = '__all__'


class Tip_Serializer(serializers.ModelSerializer):
  
    class Meta:
        model = Tip
        fields = '__all__'
        def validate_image(self, value):
           """
           Custom validation to check if uploaded file is an image.
           """
           if not value.content_type.startswith('image/'):
              raise serializers.ValidationError('Uploaded file must be an image.')
           return value
