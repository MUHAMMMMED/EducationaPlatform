from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
 
from .models import* 
from .serializers import *

from Courses.serializers import CourseSerializer
from Courses.models import*
 
from Quiz.models import *
from Quiz.serializers import ExamSerializer,ExamSerializer
   
from LiveCourses.models import UserLiveCourse ,LiveCourse
from LiveCourses.serializers import LiveCourseSerializer

from Query.models import Category
from Query.serializers import CategorySerializer

from accounts.models import User
from accounts.serializers import UserSerializerwithId
 
from Query.serializers  import *
from Query.models  import *
 

 
def check_permissions(request):
    """
    Check if the user is authenticated and has permission to access the data.
    """
    if not request.user.is_authenticated:
        return Response({'error': 'User not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

    if request.user.user_type != 'M':  # Assuming 'M' represents the Manager user type
        return Response({'error': 'You do not have permission to access this data.'}, status=status.HTTP_403_FORBIDDEN)
    
    return None  # No error, user is authenticated and has permission


  

 
@api_view(['GET'])
def MyLearning(request):
    try:
        user = request.user
        # Filter user-related courses, live courses, and exams
        user_courses = UserCourse.objects.filter(student=user)
        user_live_courses = UserLiveCourse.objects.filter(student=user)
        user_exams = UserExam.objects.filter(student=user)

        # Extract course, live course, and exam IDs
        course_ids = user_courses.values_list('course', flat=True)
        live_course_ids = user_live_courses.values_list('course', flat=True)
        exam_ids = user_exams.values_list('exam', flat=True)

        # Filter Course, LiveCourse, and Exam instances based on the IDs
        courses = Course.objects.filter(active=True, id__in=course_ids)
        live_courses = LiveCourse.objects.filter(active=True, id__in=live_course_ids)
        exams = Exam.objects.filter(active=True, id__in=exam_ids)

        # Create a dictionary to hold the statuses of live courses
        live_course_status = {}
        for user_live_course in user_live_courses:
            live_course_status[user_live_course.course_id] = user_live_course.status

        # Serialize the data
        course_serializer = CourseSerializer(courses, many=True)
        live_course_serializer = LiveCourseSerializer(live_courses, many=True)
        exam_serializer = ExamSerializer(exams, many=True)

        # Add status to each live course data
        for live_course_data in live_course_serializer.data:
            live_course_data['status'] = live_course_status.get(live_course_data['id'], '')

        # Return the response
        data = {
            'courses': course_serializer.data,
            'live_courses': live_course_serializer.data,
            'exams': exam_serializer.data
        }
        return Response(data)

    except Exception as e:
        # Return an appropriate error response
        return Response({'message': 'You need to log in first to view the page.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

@api_view(['GET'])
def Item_list(request):
    # Retrieve all active courses, live courses, and exams from the database
    courses = Course.objects.filter(active=True)
    live_courses = LiveCourse.objects.filter(active=True)
    exams = Exam.objects.filter(active=True)

    # Serialize the retrieved data into JSON format
    course_serializer = CourseSerializer(courses, many=True)
    live_course_serializer = LiveCourseSerializer(live_courses, many=True)
    exam_serializer = ExamSerializer(exams, many=True)

    # Construct the response data with serialized course, live course, and exam data
    data = {
        'courses': course_serializer.data,  # Serialized course data
        'live_courses': live_course_serializer.data,  # Serialized live course data
        'exams': exam_serializer.data  # Serialized exam data
    }

    # Return the response with the constructed data
    return Response(data)

 
 

@api_view(['GET'])
def Teacher_Dashboard(request):
    # Check if the user is authenticated
    if not request.user.is_authenticated:
            return Response({'detail': 'You need to log in first to view the page.'}, status=status.HTTP_401_UNAUTHORIZED)
    try:
        user = request.user
        courses = LiveCourse.objects.filter(author=user)
        serializer = LiveCourseSerializer(courses, many=True)
     
        return Response(serializer.data)

    except Exception as e:
        # Return an appropriate error response
        return Response({'message': 'You need to log in first to view the page.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def Filter(request):
    # Retrieve the 'query' parameter from the request, defaulting to an empty string if not provided
    query = request.GET.get('query', '')

    # If no query is provided, retrieve all active courses, live courses, and exams
    if query == '':
        courses = Course.objects.filter(active=True)
        live_courses = LiveCourse.objects.filter(active=True)
        exams = Exam.objects.filter(active=True)
    else:
        # If a query is provided, filter courses, live courses, and exams by title containing the query string
        courses = Course.objects.filter(active=True, title__icontains=query)
        live_courses = LiveCourse.objects.filter(active=True, title__icontains=query)
        exams = Exam.objects.filter(active=True, title__icontains=query)

    # Serialize the filtered data into JSON format
    course_serializer = CourseSerializer(courses, many=True)
    live_course_serializer = LiveCourseSerializer(live_courses, many=True)
    exam_serializer = ExamSerializer(exams, many=True)

    # Construct the response data with serialized course, live course, and exam data
    data = {
        'courses': course_serializer.data,  # Serialized course data
        'live_courses': live_course_serializer.data,  # Serialized live course data
        'exams': exam_serializer.data  # Serialized exam data
    }

    # Return the response with the constructed data and a 200 OK status
    return Response({'results': data}, status=status.HTTP_200_OK)
 
@api_view(['GET'])
def Category_Filter(request, id):
    # Retrieve the 'query' parameter from the request, defaulting to an empty string if not provided
    query = request.GET.get('query', '')
    
    # Filter courses, live courses, and exams based on the provided category ID
    courses = Course.objects.filter(active=True, category__id=id)
    live_courses = LiveCourse.objects.filter(active=True, category__id=id)
    exams = Exam.objects.filter(active=True, category__id=id)

    # If a query string is provided, filter the results by title containing the query
    if query:
        courses = courses.filter(title__icontains=query)
        live_courses = live_courses.filter(title__icontains=query)
        exams = exams.filter(title__icontains=query)

    # Serialize the filtered data into JSON format
    course_serializer = CourseSerializer(courses, many=True)
    live_course_serializer = LiveCourseSerializer(live_courses, many=True)
    exam_serializer = ExamSerializer(exams, many=True)

    # Construct the response data with serialized course, live course, and exam data
    data = {
        'courses': course_serializer.data,  # Serialized course data
        'live_courses': live_course_serializer.data,  # Serialized live course data
        'exams': exam_serializer.data  # Serialized exam data
    }

    # Return the response with the constructed data and a 200 OK status
    return Response({'results': data}, status=status.HTTP_200_OK)
 

 

@api_view(['GET'])
def filter_value(request):
    # Retrieve all categories from the database
    categories = Category.objects.all()
    
    # Serialize the retrieved categories into JSON format
    category_serializer = CategorySerializer(categories, many=True)

    # Define a list of levels
    levels = ['Beginner', 'Intermediate', 'Advanced']

    # Retrieve all users with the user_type 'T' (e.g., instructors)
    user = User.objects.filter(user_type='T')

    # Serialize the retrieved users into JSON format with their IDs
    instructors_serializer = UserSerializerwithId(user, many=True)

    # Construct the response data including categories, levels, and instructors
    data = {
        'categories': category_serializer.data,  # Serialized category data
        'levels': levels,  # List of levels
        'instructors': instructors_serializer.data,  # Serialized instructor data
    }

    # Return the response with the constructed data and a 200 OK status
    return Response({'results': data}, status=status.HTTP_200_OK)
 
 
 


@api_view(['GET'])
def filter_courses(request):
    # Retrieve query parameters from the request
    category = request.GET.get('category')  # Categories to filter by
    instructor = request.GET.get('instructor')  # Instructors to filter by
    price = request.GET.get('price')  # Price range to filter by
    level = request.GET.get('level')  # Level to filter by
    query = request.GET.get('query', '')  # General search query

    # Initialize empty filtered lists
    filtered_courses = []
    filtered_live_courses = []
    filtered_exams = []

    # Retrieve all active courses, live courses, and exams
    filtered_courses = Course.objects.filter(active=True)
    filtered_live_courses = LiveCourse.objects.filter(active=True)
    filtered_exams = Exam.objects.filter(active=True)

    # Apply category filter if provided
    if category:
        categories = [int(cat_id) for cat_id in category.split(',')]  # Convert category IDs to integers
        filtered_courses = filtered_courses.filter(category__id__in=categories)
        filtered_live_courses = filtered_live_courses.filter(category__id__in=categories)  # Filter live courses by categories
        filtered_exams = filtered_exams.filter(category__id__in=categories)

    # Apply instructor filter if provided
    if instructor:
        instructors = [int(inst_id) for inst_id in instructor.split(',')]  # Convert instructor IDs to integers
        filtered_courses = filtered_courses.filter(author__id__in=instructors)
        filtered_live_courses = filtered_live_courses.filter(author__id__in=instructors)  # Filter live courses by instructors
        filtered_exams = filtered_exams.filter(creator__id__in=instructors)

    # Apply price filter if provided
    if price:
        if price == 'FREE':
            filtered_courses = filtered_courses.filter(price=0)
            filtered_live_courses = filtered_live_courses.filter(price=0)  # Filter live courses by price
            filtered_exams = filtered_exams.filter(price=0)
        elif price == 'Paid':
            filtered_courses = filtered_courses.filter(price__gt=0)
            filtered_live_courses = filtered_live_courses.filter(price__gt=0)  # Filter live courses by price
            filtered_exams = filtered_exams.filter(price__gt=0)

    # Apply level filter if provided
    if level:
        filtered_courses = filtered_courses.filter(level=level)
        filtered_live_courses = filtered_live_courses.filter(level=level)  # Filter live courses by level
        filtered_exams = filtered_exams.filter(level=level)

    # Apply general search query to all types
    if query:
        filtered_courses = filtered_courses.filter(title__icontains=query)
        filtered_live_courses = filtered_live_courses.filter(title__icontains=query)  # Filter live courses by query
        filtered_exams = filtered_exams.filter(title__icontains=query) 

    # Serialize the filtered data
    course_serializer = CourseSerializer(filtered_courses, many=True)
    live_course_serializer = LiveCourseSerializer(filtered_live_courses, many=True)
    exam_serializer = ExamSerializer(filtered_exams, many=True)

    # Return JSON response containing the filtered data
    data = {
        'courses': course_serializer.data,
        'live_courses': live_course_serializer.data,
        'exams': exam_serializer.data
    }

    return Response(data, status=status.HTTP_200_OK)
 

@api_view(['GET'])
def Categories_filter(request):
    # Check permissions for the request
    error_response = check_permissions(request)  # Checking permissions
    if error_response:  # If there's an error response from permission check
        return error_response  # Return the error response

    # Retrieve the 'query' parameter from the request, defaulting to an empty string if not provided
    query = request.GET.get('query', '')
    
    # Get all categories from the database
    Cat = Category.objects.all()
    
    # If a query is provided, filter categories by title containing the query string
    if query:
        Cat = Cat.filter(title__icontains=query)
    
    # Serialize the filtered categories
    serializer = CategorySerializer(Cat, many=True)
    
    # Return the serialized data with a 200 OK status
    return Response(serializer.data, status=status.HTTP_200_OK)
 

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def Category_api(request, id=None):
    # Check permissions for the request
    error_response = check_permissions(request)  # Checking permissions
    if error_response:  # If there's an error response from permission check
        return error_response  # Return the error response

    # Handle GET request
    if request.method == 'GET':
        if id:  # If an id is provided
            Cat = Category.objects.get(id=id)  # Retrieve a single category by id
            Cat_serializer = CategorySerializer(Cat)  # Serialize the category data
            return Response(Cat_serializer.data)  # Return serialized data
        else:
            events = Category.objects.all()  # Retrieve all categories
            serializer = CategorySerializer(events, many=True)  # Serialize the list of categories
            return Response(serializer.data)  # Return serialized data

    # Handle POST request
    elif request.method == 'POST':
        serializer = CategorySerializer(data=request.data)  # Create a serializer with request data
        if serializer.is_valid():  # Check if the data is valid
            serializer.save()  # Save the new category
            return Response(serializer.data, status=status.HTTP_201_CREATED)  # Return success response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Return error response if data is invalid

    # Handle PUT request
    elif request.method == 'PUT':
        Cat = Category.objects.get(id=id)  # Retrieve the category to update
        serializer = CategorySerializer(Cat, data=request.data)  # Create a serializer with updated data
        if serializer.is_valid():  # Check if the data is valid
            serializer.save()  # Save the updated category
            return Response(serializer.data)  # Return updated data
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Return error response if data is invalid

    # Handle DELETE request
    elif request.method == 'DELETE':
        Cat = Category.objects.get(id=id)  # Retrieve the category to delete
        Cat.delete()  # Delete the category
        return Response(status=status.HTTP_204_NO_CONTENT)  # Return success response with no content