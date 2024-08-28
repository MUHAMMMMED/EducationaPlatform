from rest_framework import serializers
from .models import *

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'


class LearnSerializer(serializers.ModelSerializer):
    class Meta:
        model = Learn
        fields = '__all__'
 
 
class SpeakerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Speaker
        fields = '__all__'
 
        def validate_image(self, value):
           """
           Custom validation to check if uploaded file is an image.
           """
           if not value.content_type.startswith('image/'):
              raise serializers.ValidationError('Uploaded file must be an image.')
           return value
 
# class EventsSessionSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = EventsSession
#         fields = '__all__'
 