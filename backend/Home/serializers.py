from rest_framework import serializers
from .models import *
from accounts.serializers import UserSerializer




class TipSerializer(serializers.ModelSerializer):
    author = UserSerializer()

class SlideSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slide
        fields = '__all__'

        def validate_image(self, value):
           """
           Custom validation to check if uploaded file is an image.
           """
           if not value.content_type.startswith('image/'):
              raise serializers.ValidationError('Uploaded file must be an image.')
           return value

class InfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Info
        fields = '__all__'


class Rate_Serializer(serializers.ModelSerializer):
 
    class Meta:
        model = Rate
        fields = '__all__'

class RateSerializer(serializers.ModelSerializer):
    student = UserSerializer()

    class Meta:
        model = Rate
        fields = '__all__'

class SupportersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supporters
        fields = '__all__'

        def validate_image(self, value):
           """
           Custom validation to check if uploaded file is an image.
           """
           if not value.content_type.startswith('image/'):
              raise serializers.ValidationError('Uploaded file must be an image.')
           return value


class TeamMembersSerializer(serializers.ModelSerializer):
    teacher = UserSerializer()

    class Meta:
        model = TeamMembers
        fields = '__all__'

class TeamMembers_Serializer(serializers.ModelSerializer):
 
    class Meta:
        model = TeamMembers
        fields = '__all__'