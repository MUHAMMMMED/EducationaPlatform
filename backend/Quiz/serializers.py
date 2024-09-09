from rest_framework import serializers
from .models import *
from accounts.serializers import UserSerializer
from Query.serializers  import *
from accounts.serializers import UserSerializer,User_Serializer

class Question_categorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Question_category
        fields = '__all__'


class ExamToCourseDetailSerializer(serializers.ModelSerializer):
     category = CategorySerializer()
     class Meta:
        model = Exam
        fields = ['id','card_image', 'category',  'title', 'description','price']
 
class ExamSerializer(serializers.ModelSerializer):
    creator = UserSerializer()
    questions_count = serializers.SerializerMethodField()
    category = CategorySerializer()
    class Meta:
        model = Exam
        fields = '__all__'

    def get_questions_count(self, obj):
        return obj.questions.count()

class Exam_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Exam
    
        exclude = ['questions' ]

    def validate_card_image(self, value):
        """
        Custom validation to check if uploaded file is an image.
        """
        if not value.content_type.startswith('image/'):
            raise serializers.ValidationError('Uploaded file must be an image.')
        return value
 
class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
       model = Review
       fields = '__all__'
       def validate_card_image(self, value):
        """
        Custom validation to check if uploaded file is an image.
        """
        if not value.content_type.startswith('image/'):
            raise serializers.ValidationError('Uploaded file must be an image.')
        return value
    
class FrequentlyAskedSerializer(serializers.ModelSerializer):
    class Meta:
        model = FrequentlyAsked
        fields = '__all__'
 
  

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'

    def validate_question_image(self, value):
        """
        Custom validation to check if uploaded file is an image.
        """
        if value and not value.content_type.startswith('image/'):
            raise serializers.ValidationError('Uploaded file for question_image must be an image.')
        return value

  

class ExamDetailSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True)
    class Meta:
        model = Exam
        fields = '__all__'
        read_only_fields = ('questions')

class ExamSubmissionSerializer(serializers.ModelSerializer):
    user_full_name = serializers.CharField(source='user.get_full_name', read_only=True)
    class Meta:
        model = ExamSubmission
        exclude = ['wrong_answers','user','exam']
 
class ExamSubmissionSerializerList(serializers.ModelSerializer):
    exam=Exam_Serializer()
    wrong_answers = QuestionSerializer(many=True)
    class Meta:
        model = ExamSubmission
        fields = '__all__'
        
class ExamSubmission_Serializer(serializers.ModelSerializer):
    class Meta:
        model = ExamSubmission
        fields = '__all__'
 
class UserExamSerializerList(serializers.ModelSerializer):
    class Meta:
        model = UserExam
        fields = '__all__'
 
class UserExam_SerializerList(serializers.ModelSerializer):
    student = User_Serializer( read_only=True)
    class Meta:
        model = UserExam
        fields = '__all__'

class ExamCouponCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamCouponCode
        fields = '__all__'

