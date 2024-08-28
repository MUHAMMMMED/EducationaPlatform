from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from django.utils import timezone
from django.db.models import Sum 
from django.db.models.functions import Coalesce
from django.http import HttpResponse
import csv
from django.core.exceptions import ObjectDoesNotExist
from datetime import datetime, timedelta
from accounts.models import *
from accounts.serializers import User_Serializer ,UserUpdateSerializer
from Courses.models import Course,UserCourse
from LiveCourses.models import LiveCourse,UserLiveCourse
from Quiz.models import  Exam,UserExam
from Home.models import Info
from .serializers import *
 
 
def check_permissions(request):
    """
    Check if the user is authenticated and has permission to access the data.
    """
    if not request.user.is_authenticated:
        return Response({'error': 'User not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

    if request.user.user_type != 'M':  # Assuming 'M' represents the Manager user type
        return Response({'error': 'You do not have permission to access this data.'}, status=status.HTTP_403_FORBIDDEN)
    
    return None  # No error, user is authenticated and has permission
 




def get_month_info():
    # Get the current date
    today = datetime.today()
    
    # Get the start date of the current month
    first_day_current_month = today.replace(day=1)
    
    # Get the end date of the current month
    last_day_current_month = (first_day_current_month + timedelta(days=32)).replace(day=1) - timedelta(days=1)
    
    # Get the start date of the previous month
    first_day_previous_month = (first_day_current_month - timedelta(days=1)).replace(day=1)
    
    # Get the end date of the previous month
    last_day_previous_month = first_day_current_month - timedelta(days=1)
    
    # Get the start date of the month before the previous month
    first_day_month_before_previous = (first_day_previous_month - timedelta(days=1)).replace(day=1)
    
    # Get the end date of the month before the previous month
    last_day_month_before_previous = first_day_previous_month - timedelta(days=1)
    
    # Get the current year
    current_year = today.year
    
    # Get the previous year
    previous_year = current_year - 1
    
    # Get the year before the previous year
    year_before_previous = previous_year - 1
    
    return {
        "current_month": today.month,
        "first_day_current_month": first_day_current_month,
        "last_day_current_month": last_day_current_month,
        "first_day_previous_month": first_day_previous_month,
        "last_day_previous_month": last_day_previous_month,
        "first_day_month_before_previous": first_day_month_before_previous,
        "last_day_month_before_previous": last_day_month_before_previous,
        "current_year": current_year,
        "previous_year": previous_year,
        "year_before_previous": year_before_previous
    }
 



@api_view(['GET'])
def dashboard(request):

    # Check permissions
    error_response = check_permissions(request)
    if error_response:
        return error_response
 
    data = {}

    info = Info.objects.all().first()
     
    # Count users by type
    students_count = User.objects.filter(user_type='S').count()
    teacher_count = User.objects.filter(user_type='T').count()
    manager_count = User.objects.filter(user_type='M').count()

    # Count various entities
    course_count = Course.objects.all().count()
    live_course_count = LiveCourse.objects.all().count()
    exam_count = Exam.objects.all().count()
    user_course_count = UserCourse.objects.all().count()
    user_live_courses_count = UserLiveCourse.objects.all().count()
    user_exam_count = UserExam.objects.all().count()

  
    country = Country.objects.all()
    # Get unique country names and add to id first id =neme
    country_names = set(country.values_list('dictionary__name', flat=True))
    # Serialize the unique country names

    country_serializer = [name for name in country_names]
    # Serialize the unique country names
 

    # Get month information
    month_info = get_month_info()
    first_day_current_month = month_info["first_day_current_month"]
    last_day_current_month = month_info["last_day_current_month"]
    first_day_previous_month = month_info["first_day_previous_month"]
    last_day_previous_month = month_info["last_day_previous_month"]
    first_day_month_before_previous = month_info["first_day_month_before_previous"]
    last_day_month_before_previous = month_info["last_day_month_before_previous"]

    current_year = month_info["current_year"]
    previous_year = month_info["previous_year"]
    year_before_previous = month_info["year_before_previous"]

    # Calculate total number of users for each year and month
    total_User_current_year = total_User_year(current_year)
    total_User_previous_year = total_User_year(previous_year)
    total_User_current_month = total_User_month(first_day_current_month, last_day_current_month)
    total_User_previous_month = total_User_month(first_day_current_month, last_day_current_month)
 
    # Calculate total total_Paid for each entity type
    profit_current_year = calculate_total_Paid(current_year)
    profit_previous_year = calculate_total_Paid(previous_year)
    profit_year_before_previous = calculate_total_Paid(year_before_previous)

    # Calculate total Paid for each entity type for the current month
    profit_current_month = calculate_total_Paid_for_month(first_day_current_month, last_day_current_month)
    profit_previous_month = calculate_total_Paid_for_month(first_day_previous_month, last_day_previous_month)
    profit_month_before_previous = calculate_total_Paid_for_month(first_day_month_before_previous, last_day_month_before_previous)

    # Calculate percentage changes, handling division by zero gracefully
    percent_current_month = 0
    percent_previous_month = 0
    increase_percentage_current_year = 0
    increase_percentage_previous_year = 0

    # Calculate percentage changes, handling division by zero gracefully
    if profit_previous_month != 0:
        percent_current_month = ((profit_current_month - profit_previous_month) / profit_previous_month) * 100

    if profit_month_before_previous != 0:
        percent_previous_month = ((profit_previous_month - profit_month_before_previous) / profit_month_before_previous) * 100

    if profit_previous_year != 0:
        increase_percentage_current_year = ((profit_current_year - profit_previous_year) / profit_previous_year) * 100

    if profit_year_before_previous != 0:
        increase_percentage_previous_year = ((profit_previous_year - profit_year_before_previous) / profit_year_before_previous) * 100

    # Round percentages
    percent_current_month = round(percent_current_month, 1)
    percent_previous_month = round(percent_previous_month, 1)
    increase_percentage_current_year = round(increase_percentage_current_year, 1)
    increase_percentage_previous_year = round(increase_percentage_previous_year, 1)

    # Determine status based on percentages
    status_current_month = 'down' if percent_current_month <= 0 else 'up'
    status_previous_month = 'down' if percent_previous_month <= 0 else 'up'
    status_current_year = 'down' if increase_percentage_current_year <= 0 else 'up'
    status_previous_year = 'down' if increase_percentage_previous_year <= 0 else 'up'

    # Count students by month
    students_count_by_month = count_students_by_month(current_year)
    profit_Course_by_month = profit_course_by_month(UserCourse, current_year)
    profit_Exam_by_month = profit_course_by_month(UserExam, current_year)
    profit_iveCourse_by_month = profit_course_by_month(UserLiveCourse, current_year)
    total_profit_by_month = total_profit_current_year_by_month(UserCourse, UserLiveCourse, UserExam, current_year)
    country_list=model_list(Country)

    # Populate data dictionary


    data['views'] = info.views

    data['students_count'] = students_count
    data['teacher_count'] = teacher_count
    data['manager_count'] = manager_count
    data['course_count'] = course_count
    data['live_course_count'] = live_course_count
    data['exam_count'] = exam_count
    data['user_course_count'] = user_course_count
    data['user_live_courses_count'] = user_live_courses_count
    data['user_exam_count'] = user_exam_count

    data['status_current_year'] = status_current_year
    data['status_previous_year'] = status_previous_year
    data['percent_current_year'] = increase_percentage_current_year
    data['percent_previous_year'] = increase_percentage_previous_year

    data['status_current_month'] = status_current_month
    data['status_previous_month'] = status_previous_month
    data['percent_current_month'] = percent_current_month
    data['percent_previous_month'] = percent_previous_month

    data['total_User_current_year'] = total_User_current_year
    data['total_User_previous_year'] = total_User_previous_year
    data['total_User_current_month'] = total_User_current_month
    data['total_User_previous_month'] = total_User_previous_month

    data['total_price_current_year'] = profit_current_year
    data['total_price_previous_year'] = profit_previous_year
    data['total_price_current_month'] = profit_current_month
    data['total_price_previous_month'] = profit_previous_month

    data['students_count_by_month'] = students_count_by_month
    data['total_profit_by_month'] = total_profit_by_month
    data['profit_Course_by_month'] = profit_Course_by_month
    data['profit_iveCourse_by_month'] = profit_iveCourse_by_month
    data['profit_Exam_by_month'] = profit_Exam_by_month
    data['country_list'] = country_list
    data['country'] = country_serializer 


     # Return the combined data as a response
    return Response(data, status=status.HTTP_200_OK)


 




def calculate_total_Paid(year):
    """
    Calculate the total Paid for a given year by summing the Paid of UserCourse,
    UserLiveCourse, and UserExam instances.
    
    Args:
    - year (int): The year for which to calculate the total Paid.
    
    Returns:
    - total_Paid (float): The total Paid for the given year.
    """
    total_Paid = 0
    # Sum the Paid of UserCourse instances for the given year
    total_Paid += UserCourse.objects.filter(date__year=year).aggregate(total_Paid=Coalesce(Sum('Paid'), 0))['total_Paid']
    # Sum the Paid of UserLiveCourse instances for the given year
    total_Paid += UserLiveCourse.objects.filter(date__year=year).aggregate(total_Paid=Coalesce(Sum('Paid'), 0))['total_Paid']
    # Sum the Paid of UserExam instances for the given year
    total_Paid += UserExam.objects.filter(date__year=year).aggregate(total_Paid=Coalesce(Sum('Paid'), 0))['total_Paid']
    return total_Paid




def calculate_total_Paid_for_month(first_day, last_day):
    """
    Calculate the total Paid for a given month by summing the Paid of UserCourse,
    UserLiveCourse, and UserExam instances within the specified date range.
    
    Args:
    - first_day (datetime): The first day of the month.
    - last_day (datetime): The last day of the month.
    
    Returns:
    - total_Paid (float): The total Paid for the given month.
    """
    total_Paid = 0
    # Sum the Paid of UserCourse instances within the specified date range
    total_Paid += UserCourse.objects.filter(date__range=[first_day, last_day]).aggregate(total_Paid=Coalesce(Sum('Paid'), 0))['total_Paid']
    # Sum the Paid of UserLiveCourse instances within the specified date range
    total_Paid += UserLiveCourse.objects.filter(date__range=[first_day, last_day]).aggregate(total_Paid=Coalesce(Sum('Paid'), 0))['total_Paid']
    # Sum the Paid of UserExam instances within the specified date range
    total_Paid += UserExam.objects.filter(date__range=[first_day, last_day]).aggregate(total_Paid=Coalesce(Sum('Paid'), 0))['total_Paid']
    return total_Paid

def count_students_by_month(year):
    """
    Count the number of students joined each month in a given year.
    
    Args:
    - year (int): The year for which to count the students.
    
    Returns:
    - students_count_by_month (dict): A dictionary where keys are month names and values are the counts of students joined in each month.
    """
    students_count_by_month = {}
    # Loop through each month (from 1 to 12)
    for month in range(1, 13):
        # Construct a datetime object for the first day of the month
        first_day_of_month = datetime(year, month, 1)
        # Count the number of students joined in the current month
        count = User.objects.filter(user_type='S', date_joined__year=year, date_joined__month=month).count()
        # Store the count in the dictionary with the month name as the key
        students_count_by_month[first_day_of_month.strftime('%B')] = count
    return students_count_by_month


def profit_course_by_month(model, year):
    """
    Count the total Paid of user courses for each month in a given year.
    
    Args:
    - model: The model class representing the user courses (e.g., UserCourse, UserLiveCourse, UserExam).
    - year (int): The year for which to count the user courses.
    
    Returns:
    - user_course_count_by_month (dict): A dictionary where keys are month names and values are the total Paid of user courses for each month.
    """
    user_course_count_by_year = {}
    # Loop through each month (from 1 to 12)
    for month in range(1, 13):
        # Construct a datetime object for the first day of the month
        first_day_of_month = datetime(year, month, 1)
        # Count the total Paid of user courses for the current month
        total_Paid = model.objects.filter(date__year=year, date__month=month).aggregate(Sum('Paid'))['Paid__sum'] or 0
        # Store the total Paid in the dictionary with the month name as the key
        user_course_count_by_year[first_day_of_month.strftime('%B')] = total_Paid
    return user_course_count_by_year



def total_profit_current_year_by_month(model1, model2, model3, year):
    """
    Calculate the total Paid of user courses from multiple models for each month in a given year.

    Args:
    - model1: The model class representing the first type of user courses.
    - model2: The model class representing the second type of user courses.
    - model3: The model class representing the third type of user courses.
    - year (int): The year for which to calculate the total Paid of user courses.

    Returns:
    - user_course_count_by_month (dict): A dictionary where keys are month names and values are the total Paid of user courses for each month.
    """
    user_course_count_by_month = {}
    # Loop through each month (from 1 to 12)
    for month in range(1, 13):
        # Get the total Paid of user courses for each model
        total_Paid_model1 = model1.objects.filter(date__year=year, date__month=month).aggregate(Sum('Paid'))['Paid__sum']
        total_Paid_model2 = model2.objects.filter(date__year=year, date__month=month).aggregate(Sum('Paid'))['Paid__sum']
        total_Paid_model3 = model3.objects.filter(date__year=year, date__month=month).aggregate(Sum('Paid'))['Paid__sum']

        # Replace None with 0
        total_Paid_model1 = total_Paid_model1 or 0
        total_Paid_model2 = total_Paid_model2 or 0
        total_Paid_model3 = total_Paid_model3 or 0

        # Ensure all variables are integers
        total_Paid_model1 = int(total_Paid_model1)
        total_Paid_model2 = int(total_Paid_model2)
        total_Paid_model3 = int(total_Paid_model3)

        # Calculate the total Paid for the current month
        total_Paid = total_Paid_model1 + total_Paid_model2 + total_Paid_model3

        # Store the total Paid in the dictionary with the month name as the key
        user_course_count_by_month[datetime(year, month, 1).strftime('%B')] = total_Paid

    return user_course_count_by_month



def total_User_year(year):
    """
    Calculate the total number of user activities (courses, live courses, and exams) for a given year.

    Args:
    - year (int): The year for which to calculate the total number of user activities.

    Returns:
    - total_User (int): The total number of user activities for the specified year.
    """
    total_User = 0
    # Count the number of user activities for each model and add to the total
    total_User += UserCourse.objects.filter(date__year=year).count()
    total_User += UserLiveCourse.objects.filter(date__year=year).count()
    total_User += UserExam.objects.filter(date__year=year).count()
    return total_User

 

def total_User_month(first_day, last_day):
    """
    Calculate the total number of user activities (courses, live courses, and exams) for a given month.

    Args:
    - first_day (datetime.date): The first day of the month.
    - last_day (datetime.date): The last day of the month.

    Returns:
    - total_User (int): The total number of user activities for the specified month.
    """
    total_User = 0
    # Count the number of user activities for each model within the specified date range and add to the total
    total_User += UserCourse.objects.filter(date__range=[first_day, last_day]).count()
    total_User += UserLiveCourse.objects.filter(date__range=[first_day, last_day]).count()
    total_User += UserExam.objects.filter(date__range=[first_day, last_day]).count()
    return total_User
 
 
 
def model_list(Model):
    # Retrieve all entries from the model
    items = Model.objects.all()

    # Create a dictionary to store dictionary names and counts
    dictionary_counts = {}

    # Iterate over the queryset and calculate the count for each item
    for item in items:
        dictionary_name = item.dictionary.name
        # Count the number of occurrences of the item in the queryset
        count = Model.objects.filter(dictionary=item.dictionary).count()
        # Store the item name and count in the dictionary
        dictionary_counts[dictionary_name] = count

    # Return the dictionary containing dictionary names and their counts
    return dictionary_counts

  

 

@api_view(['GET'])
def Country_List(request):
    # Check permissions
    error_response = check_permissions(request)
    if error_response:
        return error_response

    # Extract 'country' parameter from query parameters
    name = request.query_params.get('country')
    
    # If 'country' parameter is not provided, return a 400 BAD REQUEST response
    if not name:
        return Response({"message": "Country parameter is missing"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Try to get the Dictionary object matching the country name
        Dic = Dictionary.objects.get(name=name)
        
        # Filter the Country object related to the Dictionary object
        country = Country.objects.filter(dictionary__id=Dic.id).first()
        
        # If no country is found, return a 404 NOT FOUND response
        if not country:
            return Response({"message": "Country not found"}, status=status.HTTP_404_NOT_FOUND)

        # Filter all Region objects related to the country's dictionary name
        regions = Region.objects.filter(country__dictionary__name=country.dictionary.name)

        # Get unique region names from the regions queryset
        regions_names = set(regions.values_list('dictionary__name', flat=True))
        
        # Serialize the unique region names into a list
        Regions_names = [name for name in regions_names]

        # Create a dictionary to store the count of regions per unique region name
        country_counts = {}
        for region_name in regions_names:
            count = regions.filter(dictionary__name=region_name).count()
            country_counts[region_name] = count

        # Prepare the response data
        data = { 
            'country_name': name,
            'region_counts': country_counts,
            'regions_names': Regions_names,
        }
        
        # Return the response data with a 200 OK status
        return Response(data, status=status.HTTP_200_OK)

    except ObjectDoesNotExist:
        # If the Dictionary object is not found, return a 404 NOT FOUND response
        return Response({"message": "Country not found"}, status=status.HTTP_404_NOT_FOUND)

 
 
 

@api_view(['GET'])
def Region_List(request):
    # Check permissions
    error_response = check_permissions(request)
    if error_response:
        return error_response

    # Extract 'Region' parameter from query parameters
    name = request.query_params.get('Region')
    
    # If 'Region' parameter is not provided, return a 400 BAD REQUEST response
    if not name:
        return Response({"message": "Region parameter is missing"}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        # Try to get the Dictionary object matching the region name
        Dic = Dictionary.objects.get(name=name)
        
        # Filter the Region object related to the Dictionary object
        region = Region.objects.filter(dictionary__id=Dic.id).first()
        
        # If no region is found, return a 404 NOT FOUND response
        if not region:
            return Response({"message": "Region not found"}, status=status.HTTP_404_NOT_FOUND)

        # Filter all City objects related to the region's dictionary name
        cities = City.objects.filter(region__dictionary__name=region.dictionary.name)
        
        # Create a dictionary to store the count of cities per unique city name
        region_counts = {}
        for city in cities:
            count = cities.filter(dictionary__name=city.dictionary.name).count()
            region_counts[city.dictionary.name] = count

        # Prepare the response data
        data = { 
            'region_name': region.dictionary.name,
            'region_counts': region_counts,
        }
        
        # Return the response data with a 200 OK status
        return Response(data, status=status.HTTP_200_OK)

    except ObjectDoesNotExist:
        # If the Dictionary object is not found, return a 404 NOT FOUND response
        return Response({"message": "Region not found"}, status=status.HTTP_404_NOT_FOUND)




@api_view(['GET'])
def dashboard_filter_courses(request):
    # Check permissions
    error_response = check_permissions(request)
    if error_response:
        return error_response
    
    category = request.GET.get('category')
    instructor = request.GET.get('instructor')
    query = request.GET.get('query', '')
    # Initialize empty filtered lists
    filtered_courses = Course.objects.all()
 
    if category:
        categories = [int(cat_id) for cat_id in category.split(',') if cat_id.isdigit()]
        filtered_courses = filtered_courses.filter(category__id__in=categories)
    
    if instructor:
        # Validate instructor IDs
        instructors = [int(inst_id) for inst_id in instructor.split(',') if inst_id.isdigit()]
        filtered_courses = filtered_courses.filter(author__id__in=instructors)
 
    # Apply query filter to all types
    if query:
        filtered_courses = filtered_courses.filter(title__icontains=query)

    # Serialize filtered data
    course_serializer = CourseSerializer(filtered_courses, many=True)
 
    data = course_serializer.data
    return Response(data, status=status.HTTP_200_OK)

 

@api_view(['GET'])
def dashboard_filter_LiveCourse(request):
    # Check permissions
    error_response = check_permissions(request)
    if error_response:
        return error_response
    
    category = request.GET.get('category')
    instructor = request.GET.get('instructor')
    query = request.GET.get('query', '')
    # Initialize empty filtered lists
    filtered_courses = LiveCourse.objects.all()
 
    if category:
        categories = [int(cat_id) for cat_id in category.split(',') if cat_id.isdigit()]
        filtered_courses = filtered_courses.filter(category__id__in=categories)
    
    if instructor:
        # Validate instructor IDs
        instructors = [int(inst_id) for inst_id in instructor.split(',') if inst_id.isdigit()]
        filtered_courses = filtered_courses.filter(author__id__in=instructors)
 
    # Apply query filter to all types
    if query:
        filtered_courses = filtered_courses.filter(title__icontains=query)

    # Serialize filtered data
    course_serializer = LiveCourseSerializer(filtered_courses, many=True)
 
    data = course_serializer.data
    return Response(data, status=status.HTTP_200_OK)
 



@api_view(['GET'])
def dashboard_filter_quiz(request):
    # Check permissions
    error_response = check_permissions(request)
    if error_response:
        return error_response
    
    category = request.GET.get('category')
    instructor = request.GET.get('instructor')
    query = request.GET.get('query', '')
    # Initialize empty filtered lists
    filtered_exam= Exam.objects.all()
 
    if category:
        categories = [int(cat_id) for cat_id in category.split(',') if cat_id.isdigit()]
        filtered_exam = filtered_exam.filter(category__id__in=categories)
    
    if instructor:
        # Validate instructor IDs
        instructors = [int(inst_id) for inst_id in instructor.split(',') if inst_id.isdigit()]
        filtered_exam = filtered_exam.filter(creator__id__in=instructors)
 
    # Apply query filter to all types
    if query:
        filtered_exam = filtered_exam.filter(title__icontains=query)

    # Serialize filtered data
    course_serializer = ExamSerializer(filtered_exam, many=True)
 
    data = course_serializer.data
    return Response(data, status=status.HTTP_200_OK)

 
  

def course_detail_total_profit_year(Model, year):
    # Aggregate the total Paid for the given year, using Coalesce to handle NULL values
    total_Paid = Model.filter(date__year=year).aggregate(
        total_Paid=Coalesce(Sum('Paid'), 0)
    )['total_Paid']
    
    # Return the total profit for the year
    return total_Paid
 
def course_detail_total_profit_for_month(Model, first_day, last_day):
    """
    Calculate the total profit for a specific month based on a given model, 
    using the provided first day and last day of the month.
    
    Args:
        Model: The Django model to query.
        first_day: The first day of the month (datetime object).
        last_day: The last day of the month (datetime object).
        
    Returns:
        The total profit for the specified month.
    """
    # Aggregate the total Paid for the given month, using Coalesce to handle NULL values
    total_Paid = Model.filter(date__range=[first_day, last_day]).aggregate(
        total_Paid=Coalesce(Sum('Paid'), 0)
    )['total_Paid']
    
    # Return the total profit for the month
    return total_Paid


 
def course_detail_profit_by_month(Model, year):
    """
    Calculate the profit for each month of a given year based on a provided model.

    Args:
        Model: The Django model to query.
        year: The year for which to calculate profits.

    Returns:
        A dictionary where keys are month names (e.g., 'January') and values are the corresponding profits.
    """
    # Initialize a dictionary to store profit for each month
    profit_by_month = {}

    # Loop through each month of the year
    for month in range(1, 13):
        # Calculate the first day of the month
        first_day_of_month = datetime(year, month, 1)
        
        # Calculate the last day of the month
        if month == 12:
            # If it's December, set the last day to December 31st of the given year
            last_day_of_month = datetime(year, month, 31)
        else:
            # Otherwise, set the last day to the last day of the next month minus one day
            last_day_of_month = datetime(year, month + 1, 1) - timedelta(days=1)

        # Filter model instances for the current month and year, and aggregate the sum of Paid
        profit_for_month = Model.filter(date__range=[first_day_of_month, last_day_of_month]).aggregate(Sum('Paid'))['Paid__sum'] or 0
        
        # Store the profit for the current month in the dictionary
        profit_by_month[first_day_of_month.strftime('%B')] = profit_for_month

    # Return the dictionary containing profits for each month
    return profit_by_month


 
def count_students_course_detail_by_month(Model, year):
    """
    Count the number of students enrolled in a course for each month of a given year.

    Args:
        Model: The Django model representing the course enrollments.
        year: The year for which to count students.

    Returns:
        A dictionary where keys are month names (e.g., 'January') and values are the corresponding student counts.
    """
    # Initialize a dictionary to store student counts for each month
    students_count_by_month = {}

    # Loop through each month of the year
    for month in range(1, 13):
        # Calculate the first day of the month
        first_day_of_month = datetime(year, month, 1)
        
        # Count the number of students enrolled in the course for the current month and year
        students_count_for_month = Model.filter(date__year=year, date__month=month).count()
        
        # Store the student count for the current month in the dictionary
        students_count_by_month[first_day_of_month.strftime('%B')] = students_count_for_month

    # Return the dictionary containing student counts for each month
    return students_count_by_month

 
def course_detail_total_User_year(Model, year):
    """
    Calculate the total number of users enrolled in a course for a specific year.

    Args:
        Model: The Django model representing the course enrollments.
        year: The year for which to calculate the total number of users.

    Returns:
        The total number of users enrolled in the course for the specified year.
    """
    # Initialize the total number of users
    total_users = 0
    
    # Count the number of users enrolled in the course for the specified year
    total_users += Model.filter(date__year=year).count()
    
    # Return the total number of users
    return total_users


def course_detail_total_User_month(Model, first_day, last_day):
    """
    Calculate the total number of users enrolled in a course for a specific month.

    Args:
        Model: The Django model representing the course enrollments.
        first_day: The first day of the month.
        last_day: The last day of the month.

    Returns:
        The total number of users enrolled in the course for the specified month.
    """
    # Initialize the total number of users
    total_users = 0
    
    # Count the number of users enrolled in the course for the specified month
    total_users += Model.filter(date__range=[first_day, last_day]).count()
    
    # Return the total number of users
    return total_users

 





def Country_name(Model):
    # Retrieve all entries from the model
    user_courses = Model.all()
    # Create a dictionary to store country names and their corresponding counts
    country_counts = {}

    # Iterate over the user courses
    for user_course in user_courses:
        user_id = user_course.student.id
        # Retrieve the countries associated with the user in this course
        country = Country.objects.filter(user_id=user_id)
        # Iterate over the queryset and calculate the count for each item
 
        # Get unique country names and add to id first id =neme
        country_names = set(country.values_list('dictionary__name', flat=True))
        # Serialize the unique country names

        country_counts = [name for name in country_names]
    # Serialize the unique country names
 
    # Return the dictionary containing dictionary names and their counts
    return country_counts

 
def Country_counts(Model1,Model2):
    # Retrieve all entries from the model
    user_courses = Model1.all()
    
    # Create a dictionary to store country names and their corresponding counts
    country_counts = {}

    # Iterate over the user courses
    for user_course in user_courses:
        user_id = user_course.student.id
        
        # Retrieve the countries associated with the user in this course
        user_countries = Model2.objects.filter(user_id=user_id)
        # Iterate over the countries and count occurrences of each name
        for country in user_countries:
            country_name = country.dictionary.name
            # Increment the count for this country name or initialize it to 1
            country_counts[country_name] = country_counts.get(country_name, 0) + 1
    # Return the dictionary containing country names and their counts
    return country_counts

 
 

@api_view(['GET'])
def dashboard_course_detail(request, id):
        # Check permissions
    error_response = check_permissions(request)
    if error_response:
        return error_response
    try:
        # Get the specific course instance
        course = Course.objects.get(id=id)
        course_serializer = CourseSerializer(course)
        
        views=course.views
 
        # Filter user courses by course id
        user_courses = UserCourse.objects.filter(course__id=id)
        user_courses_serializer = UserCourseSerializer(user_courses, many=True)
        
        country_counts=Country_counts(user_courses,Country) 
        country_name=Country_name(user_courses) 
  
        # Count of total user courses
        user_courses_count = user_courses.count()  
   
        # Get month information
        month_info = get_month_info()
        first_day_current_month = month_info["first_day_current_month"]
        last_day_current_month = month_info["last_day_current_month"]
        first_day_previous_month = month_info["first_day_previous_month"]
        last_day_previous_month = month_info["last_day_previous_month"]
        first_day_month_before_previous = month_info["first_day_month_before_previous"]
        last_day_month_before_previous = month_info["last_day_month_before_previous"]

        current_year = month_info["current_year"]
        previous_year = month_info["previous_year"]
        year_before_previous = month_info["year_before_previous"]
 
        # Initialize dictionary to store user courses count for each month
    
        profit_current_month = course_detail_total_profit_for_month(user_courses,first_day_current_month, last_day_current_month)
        profit_previous_month =  course_detail_total_profit_for_month(user_courses,first_day_previous_month, last_day_previous_month)
        profit_month_before_previous = course_detail_total_profit_for_month(user_courses,first_day_month_before_previous, last_day_month_before_previous)

        profit_current_year = course_detail_total_profit_year(user_courses, current_year)
        profit_previous_year = course_detail_total_profit_year(user_courses, previous_year)
        profit_year_before_previous = course_detail_total_profit_year(user_courses,year_before_previous)

 
        total_profit_by_month =  course_detail_profit_by_month(user_courses,current_year)
        students_count_by_month = count_students_course_detail_by_month(user_courses,current_year) 
 
        # Calculate total number of users for each year and month
        total_User_current_year = course_detail_total_User_year(user_courses,current_year)
        total_User_previous_year = course_detail_total_User_year(user_courses,previous_year)
        total_User_current_month = course_detail_total_User_month(user_courses,first_day_current_month, last_day_current_month)
        total_User_previous_month = course_detail_total_User_month(user_courses,first_day_previous_month, last_day_previous_month)

        # Calculate percentage changes, handling division by zero gracefully
        percent_current_month = 0
        percent_previous_month = 0
        increase_percentage_current_year = 0
        increase_percentage_previous_year = 0

        # Calculate percentage changes, handling division by zero gracefully
        if profit_previous_month != 0:
            percent_current_month = ((profit_current_month - profit_previous_month) / profit_previous_month) * 100

        if profit_month_before_previous != 0:
            percent_previous_month = ((profit_previous_month - profit_month_before_previous) / profit_month_before_previous) * 100

        if profit_previous_year != 0:
            increase_percentage_current_year = ((profit_current_year - profit_previous_year) / profit_previous_year) * 100

        if profit_year_before_previous != 0:
            increase_percentage_previous_year = ((profit_previous_year - profit_year_before_previous) / profit_year_before_previous) * 100

        # Round percentages
        percent_current_month = round(percent_current_month, 1)
        percent_previous_month = round(percent_previous_month, 1)
        increase_percentage_current_year = round(increase_percentage_current_year, 1)
        increase_percentage_previous_year = round(increase_percentage_previous_year, 1)

         # Determine status based on percentages
        status_current_month = 'down' if percent_current_month <= 0 else 'up'
        status_previous_month = 'down' if percent_previous_month <= 0 else 'up'
        status_current_year = 'down' if increase_percentage_current_year <= 0 else 'up'
        status_previous_year = 'down' if increase_percentage_previous_year <= 0 else 'up'
 

        # Combine the serialized data into course_data
        data = course_serializer.data
        data['views'] = views
 
        data['user_courses'] = user_courses_serializer.data
        data['user_count'] = user_courses_count
       
        data['total_User_current_year'] = total_User_current_year
        data['total_User_previous_year'] = total_User_previous_year
        data['total_User_current_month'] = total_User_current_month
        data['total_User_previous_month'] = total_User_previous_month
 
        data['total_price_current_year'] = profit_current_year
        data['total_price_previous_year'] = profit_previous_year
        data['total_price_current_month'] = profit_current_month
        data['total_price_previous_month'] = profit_previous_month

        data['status_current_year'] = status_current_year
        data['status_previous_year'] = status_previous_year
        data['percent_current_year'] = increase_percentage_current_year
        data['percent_previous_year'] = increase_percentage_previous_year

        data['status_current_month'] = status_current_month
        data['status_previous_month'] = status_previous_month
        data['percent_current_month'] = percent_current_month
        data['percent_previous_month'] = percent_previous_month
        data['students_count_by_month'] = students_count_by_month
        data['total_profit_by_month'] = total_profit_by_month
        data['country_counts'] = country_counts
        data['country_name'] = country_name

        # Return the combined data as a response
        return Response(data, status=status.HTTP_200_OK)
    except Course.DoesNotExist:
        return Response({'detail': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)



 
@api_view(['GET'])
def Region_counts_Course(request, id):
    # Check permissions
    error_response = check_permissions(request)
    if error_response:
        return error_response

    try:
        # Fetch all UserCourse objects for the given course ID
        user_courses = UserCourse.objects.filter(course__id=id)
    except AttributeError:
        # Handle the case where the course ID is not found
        return Response({"message": "User ID not found for the given course ID"}, status=status.HTTP_404_NOT_FOUND)

    # Retrieve the 'Region' parameter from the query string
    Region_name = request.query_params.get('Region')
    if not Region_name:
        # Handle the case where the 'Region' parameter is missing
        return Response({"message": "Region parameter is missing"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Fetch the dictionary object for the given region name
        dictionary = Dictionary.objects.get(name=Region_name)

        # Collect all user IDs for the course
        user_ids = [user_course.student.id for user_course in user_courses]

        # Query regions for all user IDs
        regions = Region.objects.filter(country__dictionary__name=dictionary.name, user_id__in=user_ids)

        # Get unique region names
        region_names = set(regions.values_list('dictionary__name', flat=True))

        # Count the number of users in each region
        country_counts = {}
        for region_name in region_names:
            count = regions.filter(dictionary__name=region_name).count()
            country_counts[region_name] = count

        # Prepare the response data
        data = {
            'Region_name': Region_name,  
            'region_counts': country_counts,
            'regions_names': list(region_names),
        }

        # Return the response with the data
        return Response(data, status=status.HTTP_200_OK)

    except ObjectDoesNotExist:
        # Handle the case where the region name is not found in the dictionary
        return Response({"message": "Region not found"}, status=status.HTTP_404_NOT_FOUND)



@api_view(['GET'])
def City_counts_Course(request, id):
    # Check permissions
    error_response = check_permissions(request)
    if error_response:
        return error_response

    try:
        # Fetch all UserCourse objects for the given course ID
        user_courses = UserCourse.objects.filter(course__id=id)
    except AttributeError:
        # Handle the case where the course ID is not found
        return Response({"message": "User ID not found for the given course ID"}, status=status.HTTP_404_NOT_FOUND)

    # Retrieve the 'City' parameter from the query string
    region_name = request.query_params.get('City')
    if not region_name:
        # Handle the case where the 'City' parameter is missing
        return Response({"message": "Region parameter is missing"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Fetch the dictionary object for the given city name
        dictionary = Dictionary.objects.get(name=region_name)

        # Collect all user IDs for the course
        user_ids = [user_course.student.id for user_course in user_courses]

        # Query cities for all user IDs
        cities = City.objects.filter(region__dictionary__name=dictionary.name, user_id__in=user_ids)

        # Count the occurrences of each city
        cities_count = {}
        for city in cities:
            city_name = city.dictionary.name  
            if city_name in cities_count:
                cities_count[city_name] += 1
            else:
                cities_count[city_name] = 1

        # Prepare and return the response with city counts and city name
        return Response({
            'cities_count': cities_count,
            'City_name': region_name,
        }, status=status.HTTP_200_OK)

    except ObjectDoesNotExist:
        # Handle the case where the city name is not found in the dictionary
        return Response({"message": "Region not found"}, status=status.HTTP_404_NOT_FOUND)


 


@api_view(['GET'])
def dashboard_LiveCourse_detail(request, id):
    # Check permissions
    error_response = check_permissions(request)
    if error_response:
        return error_response
    try:
        # Get the specific course instance
        course = LiveCourse.objects.get(id=id)
        course_serializer = LiveCourseSerializer(course)

        views=course.views
 


        # Filter user courses by course id
        user_courses = UserLiveCourse.objects.filter(course__id=id)
         

        country_counts=Country_counts(user_courses,Country) 
        country_name=Country_name(user_courses) 
 
        # Count of total user courses
        user_courses_count = user_courses.count()  
   
        # Get month information
        month_info = get_month_info()
        first_day_current_month = month_info["first_day_current_month"]
        last_day_current_month = month_info["last_day_current_month"]
        first_day_previous_month = month_info["first_day_previous_month"]
        last_day_previous_month = month_info["last_day_previous_month"]
        first_day_month_before_previous = month_info["first_day_month_before_previous"]
        last_day_month_before_previous = month_info["last_day_month_before_previous"]

        current_year = month_info["current_year"]
        previous_year = month_info["previous_year"]
        year_before_previous = month_info["year_before_previous"]
 
        # Initialize dictionary to store user courses count for each month
    
        profit_current_month = course_detail_total_profit_for_month(user_courses,first_day_current_month, last_day_current_month)
        profit_previous_month =  course_detail_total_profit_for_month(user_courses,first_day_previous_month, last_day_previous_month)
        profit_month_before_previous = course_detail_total_profit_for_month(user_courses,first_day_month_before_previous, last_day_month_before_previous)
        profit_current_year = course_detail_total_profit_year(user_courses, current_year)
        profit_previous_year = course_detail_total_profit_year(user_courses, previous_year)
        profit_year_before_previous = course_detail_total_profit_year(user_courses,year_before_previous)

        total_profit_by_month =  course_detail_profit_by_month(user_courses,current_year)
        students_count_by_month = count_students_course_detail_by_month(user_courses,current_year) 
 
        # Calculate total number of users for each year and month
        total_User_current_year = course_detail_total_User_year(user_courses,current_year)
        total_User_previous_year = course_detail_total_User_year(user_courses,previous_year)
        total_User_current_month = course_detail_total_User_month(user_courses,first_day_current_month, last_day_current_month)
        total_User_previous_month = course_detail_total_User_month(user_courses,first_day_previous_month, last_day_previous_month)

        # Calculate percentage changes, handling division by zero gracefully
        percent_current_month = 0
        percent_previous_month = 0
        increase_percentage_current_year = 0
        increase_percentage_previous_year = 0

        # Calculate percentage changes, handling division by zero gracefully
        if profit_previous_month != 0:
            percent_current_month = ((profit_current_month - profit_previous_month) / profit_previous_month) * 100

        if profit_month_before_previous != 0:
            percent_previous_month = ((profit_previous_month - profit_month_before_previous) / profit_month_before_previous) * 100

        if profit_previous_year != 0:
            increase_percentage_current_year = ((profit_current_year - profit_previous_year) / profit_previous_year) * 100

        if profit_year_before_previous != 0:
            increase_percentage_previous_year = ((profit_previous_year - profit_year_before_previous) / profit_year_before_previous) * 100

        # Round percentages
        percent_current_month = round(percent_current_month, 1)
        percent_previous_month = round(percent_previous_month, 1)
        increase_percentage_current_year = round(increase_percentage_current_year, 1)
        increase_percentage_previous_year = round(increase_percentage_previous_year, 1)

         # Determine status based on percentages
        status_current_month = 'down' if percent_current_month <= 0 else 'up'
        status_previous_month = 'down' if percent_previous_month <= 0 else 'up'
        status_current_year = 'down' if increase_percentage_current_year <= 0 else 'up'
        status_previous_year = 'down' if increase_percentage_previous_year <= 0 else 'up'
 
        # Combine the serialized data into course_data
        data = course_serializer.data
        data['user_count'] = user_courses_count
        data['views'] = views

        data['total_User_current_year'] = total_User_current_year
        data['total_User_previous_year'] = total_User_previous_year
        data['total_User_current_month'] = total_User_current_month
        data['total_User_previous_month'] = total_User_previous_month
 
        data['total_price_current_year'] = profit_current_year
        data['total_price_previous_year'] = profit_previous_year
        data['total_price_current_month'] = profit_current_month
        data['total_price_previous_month'] = profit_previous_month

        data['status_current_year'] = status_current_year
        data['status_previous_year'] = status_previous_year
        data['percent_current_year'] = increase_percentage_current_year
        data['percent_previous_year'] = increase_percentage_previous_year

        data['status_current_month'] = status_current_month
        data['status_previous_month'] = status_previous_month
        data['percent_current_month'] = percent_current_month
        data['percent_previous_month'] = percent_previous_month
        data['students_count_by_month'] = students_count_by_month
        data['total_profit_by_month'] = total_profit_by_month
        data['country_counts'] = country_counts
        data['country_name'] = country_name
 
        # Return the combined data as a response
        return Response(data, status=status.HTTP_200_OK)
    except LiveCourse.DoesNotExist:
        return Response({'detail': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)

 

@api_view(['GET'])
def Region_counts_LiveCourse(request, id):
    # Check permissions
    error_response = check_permissions(request)  # Check if the user has permission to access this endpoint
    if error_response:  # If there's an error in permissions
        return error_response  # Return the error response

    try:
        # Filter UserLiveCourse objects by course ID
        user_courses = UserLiveCourse.objects.filter(course__id=id)
    except AttributeError:
        # If the course ID is not found for the given user ID
        return Response({"message": "User ID not found for the given course ID"}, status=status.HTTP_404_NOT_FOUND)

    # Get the 'Region' query parameter from the request
    Region_name = request.query_params.get('Region')

    if not Region_name:  # If the 'Region' parameter is missing
        return Response({"message": "Region parameter is missing"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Get the Dictionary object with the specified name
        dictionary = Dictionary.objects.get(name=Region_name)
 
        # Collect all user IDs for the course
        user_ids = [user_course.student.id for user_course in user_courses]
 
        # Query regions for all user IDs
        regions = Region.objects.filter(country__dictionary__name=dictionary.name, user_id__in=user_ids)

        # Get unique region names
        region_names = set(regions.values_list('dictionary__name', flat=True))

        country_counts = {}
        # Count the number of users in each region
        for region_name in region_names:
            count = regions.filter(dictionary__name=region_name).count()
            country_counts[region_name] = count
        
        # Prepare response data
        data={
            'Region_name':Region_name,  
            'region_counts': country_counts,
            'regions_names': list(region_names),
        }
        return Response(data, status=status.HTTP_200_OK)

    except ObjectDoesNotExist:
        # If the specified region is not found
        return Response({"message": "Region not found"}, status=status.HTTP_404_NOT_FOUND)

 

@api_view(['GET'])
def City_counts_LiveCourse(request, id):
    # Check permissions
    error_response = check_permissions(request)  # Check if the user has permission to access this endpoint
    if error_response:  # If there's an error in permissions
        return error_response  # Return the error response

    try:
        # Filter UserLiveCourse objects by course ID
        user_courses = UserLiveCourse.objects.filter(course__id=id)
    except AttributeError:
        # If the course ID is not found for the given user ID
        return Response({"message": "User ID not found for the given course ID"}, status=status.HTTP_404_NOT_FOUND)

    # Get the 'City' query parameter from the request
    region_name = request.query_params.get('City')
    if not region_name:  # If the 'City' parameter is missing
        return Response({"message": "Region parameter is missing"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Get the Dictionary object with the specified name
        dictionary = Dictionary.objects.get(name=region_name)
        
        # Collect all user IDs for the course
        user_ids = [user_course.student.id for user_course in user_courses]
        
        # Query cities for all user IDs
        cities = City.objects.filter(region__dictionary__name=dictionary.name, user_id__in=user_ids)

        cities_count = {}
        # Count the number of occurrences of each city
        for city in cities:
            city_name = city.dictionary.name  
            if city_name in cities_count:
                cities_count[city_name] += 1
            else:
                cities_count[city_name] = 1

        # Prepare response data
        return Response({
            'cities_count': cities_count,
            'City_name': region_name,
        }, status=status.HTTP_200_OK)

    except ObjectDoesNotExist:
        # If the specified region is not found
        return Response({"message": "Region not found"}, status=status.HTTP_404_NOT_FOUND)


 




@api_view(['GET'])
def dashboard_quiz_detail(request, exam_id):

    # Check permissions
    error_response = check_permissions(request)
    if error_response:
        return error_response


    try:
        # Get the specific course instance
        exam = Exam.objects.get(id=exam_id)
        exam_serializer = ExamSerializer(exam)
        views=exam.views
  
        # Filter user courses by course id
        user_exam = UserExam.objects.filter(exam__id=exam_id)
        # user_exam_serializer = UserCourseSerializer(user_exam, many=True)
         
        country_counts=Country_counts(user_exam,Country) 
        country_name=Country_name(user_exam) 
 
        # Count of total user courses
        user_exam_count = user_exam.count()  
   
        # Get month information
        month_info = get_month_info()
        first_day_current_month = month_info["first_day_current_month"]
        last_day_current_month = month_info["last_day_current_month"]
        first_day_previous_month = month_info["first_day_previous_month"]
        last_day_previous_month = month_info["last_day_previous_month"]
        first_day_month_before_previous = month_info["first_day_month_before_previous"]
        last_day_month_before_previous = month_info["last_day_month_before_previous"]

        current_year = month_info["current_year"]
        previous_year = month_info["previous_year"]
        year_before_previous = month_info["year_before_previous"]
 
        # Initialize dictionary to store user courses count for each month
    
        profit_current_month = course_detail_total_profit_for_month(user_exam,first_day_current_month, last_day_current_month)
        profit_previous_month =  course_detail_total_profit_for_month(user_exam,first_day_previous_month, last_day_previous_month)
        profit_month_before_previous = course_detail_total_profit_for_month(user_exam,first_day_month_before_previous, last_day_month_before_previous)
        profit_current_year = course_detail_total_profit_year(user_exam, current_year)
        profit_previous_year = course_detail_total_profit_year(user_exam, previous_year)
        profit_year_before_previous = course_detail_total_profit_year(user_exam,year_before_previous)

        total_profit_by_month =  course_detail_profit_by_month(user_exam,current_year)
        students_count_by_month = count_students_course_detail_by_month(user_exam,current_year) 
 
        # Calculate total number of users for each year and month
        total_User_current_year = course_detail_total_User_year(user_exam,current_year)
        total_User_previous_year = course_detail_total_User_year(user_exam,previous_year)
        total_User_current_month = course_detail_total_User_month(user_exam,first_day_current_month, last_day_current_month)
        total_User_previous_month = course_detail_total_User_month(user_exam,first_day_previous_month, last_day_previous_month)

        # Calculate percentage changes, handling division by zero gracefully
        percent_current_month = 0
        percent_previous_month = 0
        increase_percentage_current_year = 0
        increase_percentage_previous_year = 0

        if profit_previous_month != 0:
            percent_previous_month = ((profit_previous_month - profit_month_before_previous) / profit_previous_month) * 100

        if profit_previous_year != 0:
            increase_percentage_previous_year = ((profit_previous_year - profit_year_before_previous) / profit_previous_year) * 100

        if profit_previous_month != 0:
            percent_current_month = ((profit_current_month - profit_previous_month) / profit_previous_month) * 100

        if profit_previous_year != 0:
            increase_percentage_current_year = ((profit_current_year - profit_previous_year) / profit_previous_year) * 100

        # Round percentages
        percent_current_month = round(percent_current_month, 1)
        percent_previous_month = round(percent_previous_month, 1)
        increase_percentage_current_year = round(increase_percentage_current_year, 1)
        increase_percentage_previous_year = round(increase_percentage_previous_year, 1)

        # Determine status based on percentages
        status_current_month = 'down' if percent_current_month <= 0 else 'up'
        status_previous_month = 'down' if percent_previous_month <= 0 else 'up'
        status_current_year = 'down' if increase_percentage_current_year <= 0 else 'up'
        status_previous_year = 'down' if increase_percentage_previous_year <= 0 else 'up'

        # Combine the serialized data into course_data
        data = exam_serializer.data
    
        data['views'] = views
 
        data['user_courses'] = exam_serializer.data
        data['user_count'] = user_exam_count
        data['total_User_current_year'] = total_User_current_year
        data['total_User_previous_year'] = total_User_previous_year
        data['total_User_current_month'] = total_User_current_month
        data['total_User_previous_month'] = total_User_previous_month
        data['total_price_current_year'] = profit_current_year
        data['total_price_previous_year'] = profit_previous_year
        data['total_price_current_month'] = profit_current_month
        data['total_price_previous_month'] = profit_previous_month
        data['status_current_year'] = status_current_year
        data['status_previous_year'] = status_previous_year
        data['percent_current_year'] = increase_percentage_current_year
        data['percent_previous_year'] = increase_percentage_previous_year
        data['status_current_month'] = status_current_month
        data['status_previous_month'] = status_previous_month
        data['percent_current_month'] = percent_current_month
        data['percent_previous_month'] = percent_previous_month
        data['students_count_by_month'] = students_count_by_month
        data['total_profit_by_month'] = total_profit_by_month
        data['country_counts'] = country_counts
        data['country_name'] = country_name
        # Return the combined data as a response
        return Response(data, status=status.HTTP_200_OK)
    except Course.DoesNotExist:
        return Response({'detail': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)
 
# profit_LiveCourse_by_month
 
@api_view(['GET'])
def Region_counts_quiz(request, id):
    # Check permissions
    error_response = check_permissions(request)  # Check if the user has permission to access this endpoint
    if error_response:  # If there's an error in permissions
        return error_response  # Return the error response

    try:
        # Filter UserExam objects by exam ID
        user_courses = UserExam.objects.filter(exam__id=id)
    except AttributeError:
        # If the exam ID is not found for the given user ID
        return Response({"message": "User ID not found for the given course ID"}, status=status.HTTP_404_NOT_FOUND)

    # Get the 'Region' query parameter from the request
    Region_name = request.query_params.get('Region')
    if not Region_name:  # If the 'Region' parameter is missing
        return Response({"message": "Region parameter is missing"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Get the Dictionary object with the specified name
        dictionary = Dictionary.objects.get(name=Region_name)
 
        # Collect all user IDs for the exam
        user_ids = [user_exam.student.id for user_exam in user_courses]
 
        # Query regions for all user IDs
        regions = Region.objects.filter(country__dictionary__name=dictionary.name, user_id__in=user_ids)

        # Get unique region names
        region_names = set(regions.values_list('dictionary__name', flat=True))

        country_counts = {}
        # Count the number of users in each region
        for region_name in region_names:
            count = regions.filter(dictionary__name=region_name).count()
            country_counts[region_name] = count
        
        # Prepare response data
        data={
            'Region_name':Region_name,  
            'region_counts': country_counts,
            'regions_names': list(region_names),
        }
        return Response(data, status=status.HTTP_200_OK)

    except ObjectDoesNotExist:
        # If the specified region is not found
        return Response({"message": "Region not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def City_counts_quiz(request, id):
    # Check permissions
    error_response = check_permissions(request)  # Check if the user has permission to access this endpoint
    if error_response:  # If there's an error in permissions
        return error_response  # Return the error response

    try:
        # Filter UserExam objects by exam ID
        user_courses = UserExam.objects.filter(exam__id=id)
    except AttributeError:
        # If the exam ID is not found for the given user ID
        return Response({"message": "User ID not found for the given course ID"}, status=status.HTTP_404_NOT_FOUND)

    # Get the 'City' query parameter from the request
    region_name = request.query_params.get('City')
    if not region_name:  # If the 'City' parameter is missing
        return Response({"message": "Region parameter is missing"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Get the Dictionary object with the specified name
        dictionary = Dictionary.objects.get(name=region_name)
        
        # Collect all user IDs for the exam
        user_ids = [user_exam.student.id for user_exam in user_courses]
        
        # Query cities for all user IDs
        cities = City.objects.filter(region__dictionary__name=dictionary.name, user_id__in=user_ids)

        cities_count = {}
        # Count the number of occurrences of each city
        for city in cities:
            city_name = city.dictionary.name  
            if city_name in cities_count:
                cities_count[city_name] += 1
            else:
                cities_count[city_name] = 1

        # Prepare response data
        return Response({
            'cities_count': cities_count,
            'City_name': region_name,
        }, status=status.HTTP_200_OK)

    except ObjectDoesNotExist:
        # If the specified region is not found
        return Response({"message": "Region not found"}, status=status.HTTP_404_NOT_FOUND)


 
def filter(users, query='', email='', start_date='', end_date=''):
    # Filter users by first name if a query is provided
    if query:
        users = users.filter(first_name__icontains=query)

    # Filter users by email if an email is provided
    if email:
        users = users.filter(email__icontains=email)

    # Filter users by date range if both start_date and end_date are provided
    if start_date and end_date:
        users = users.filter(date_joined__range=[start_date, end_date])

    # Serialize the filtered users
    user_serializer = User_Serializer(users, many=True)

    # Count the number of filtered users
    user_count = users.count()

    # Create a dictionary to hold filtered data and user count
    data = {
        'users': user_serializer.data,
        'user_count': user_count
    }
    return data






@api_view(['GET'])
def student_filter(request):
    # Check permissions
    error_response = check_permissions(request)  # Check user permissions
    if error_response:
        return error_response  # Return error response if permissions check fails
    
    try:
        # Get filter parameters from request query parameters
        query = request.GET.get('query', '')  # Search query parameter
        start_date = request.GET.get('start_date', '')  # Start date parameter
        end_date = request.GET.get('end_date', '')  # End date parameter
        email = request.GET.get('email', '')  # Email parameter
        
        # Filter users based on user type (assumed to be 'S' for students)
        users = User.objects.filter(user_type='S')  # Fetch all users of type 'S' (students)
        
        # Apply additional filtering based on query parameters
        data = filter(users, query, email, start_date, end_date)  # Apply custom filter function
        
        # Return filtered data as response
        return Response(data)  # Return filtered data
        
    except Exception as e:
        # Return error response if an exception occurs
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)  # Return internal server error response with error message

@api_view(['GET'])
def teacher_filter(request):
    # Check permissions
    error_response = check_permissions(request)
    if error_response:  # If there's an error response from permission check
        return error_response  # Return the error response

    try:
        # Extracting parameters from the request
        query = request.GET.get('query', '')  # Get the 'query' parameter from GET request, default to empty string if not provided
        start_date = request.GET.get('start_date', '')  # Get the 'start_date' parameter from GET request, default to empty string if not provided
        end_date = request.GET.get('end_date', '')  # Get the 'end_date' parameter from GET request, default to empty string if not provided
        email = request.GET.get('email', '')  # Get the 'email' parameter from GET request, default to empty string if not provided

        # Filtering users based on user_type
        users = User.objects.filter(user_type='T')  # Filter users with user_type 'T' (presumably teachers)

        # Filtering data based on parameters
        data = filter(users, query, email, start_date, end_date)

        return Response(data)  # Return the filtered data as a response
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)  # If any exception occurs during the process, return an error response



@api_view(['GET'])
def manager_filter(request):
    # Check permissions
    error_response = check_permissions(request)  # Checking permissions for the request
    if error_response:  # If there's an error response from permission check
        return error_response  # Return the error response

    try:
        # Extracting parameters from the request
        query = request.GET.get('query', '')  # Get the 'query' parameter from GET request, default to empty string if not provided
        start_date = request.GET.get('start_date', '')  # Get the 'start_date' parameter from GET request, default to empty string if not provided
        end_date = request.GET.get('end_date', '')  # Get the 'end_date' parameter from GET request, default to empty string if not provided
        email = request.GET.get('email', '')  # Get the 'email' parameter from GET request, default to empty string if not provided

        # Filtering users based on user_type
        users = User.objects.filter(user_type='M')  # Filter users with user_type 'M' (presumably managers)

        # Filtering data based on parameters
        data = filter(users, query, email, start_date, end_date)

        return Response(data)  # Return the filtered data as a response
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)  # If any exception occurs during the process, return an error response



@api_view(['PUT'])
def User_Update(request, id):
    # Check permissions
    error_response = check_permissions(request)  # Checking permissions for the request
    if error_response:  # If there's an error response from permission check
        return error_response  # Return the error response
 
    try:
        # Attempt to get the user with the provided id
        user = User.objects.get(id=id)
    except User.DoesNotExist:
        # If user with provided id does not exist, return a 404 response
        return Response({'message': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)
    
    # Serialize the user data with the update request data
    serializer = UserUpdateSerializer(user, data=request.data)
    if serializer.is_valid():  # If serializer is valid
        try:
            serializer.save()  # Save the updated user data
            return Response(serializer.data, status=status.HTTP_200_OK)  # Return updated user data with success status
        except Exception as e:
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)  # If any exception occurs during saving, return a bad request response
  
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # If serializer is not valid, return errors with bad request status




@api_view(['PUT'])
def UpdateType(request, id):
    # Check permissions
    error_response = check_permissions(request)  # Checking permissions for the request
    if error_response:  # If there's an error response from permission check
        return error_response  # Return the error response
  
    # Extract type_value from request data
    type_value = request.data.get('type_value')

    # Retrieve the user with the provided id
    user = User.objects.get(id=id)   

    if type_value:  # If type_value is provided
        # Update the user's user_type and save
        user.user_type = type_value
        user.save()
        return Response({'message': 'type updated successfully'}, status=status.HTTP_200_OK)  # Return success message with 200 status
    else:
        return Response({'error': 'type not provided'}, status=status.HTTP_400_BAD_REQUEST)  # If type_value is not provided, return an error response with 400 status

 


@api_view(['PUT'])
def UpdatePhone(request):
    # Check if the user is authenticated
    if not request.user.is_authenticated:
        return Response({'error': 'User is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)  # Return unauthorized error if user is not authenticated
        
    # Extract phone number from request data
    phone = request.data.get('phone')

    # Get the current authenticated user
    user = request.user
    
    if phone:  # If phone number is provided
        # Update the user's phone number and save
        user.phone = phone   
        user.save()
        return Response({'message': 'Phone number added successfully'}, status=status.HTTP_200_OK)  # Return success message with 200 status
    else:
        return Response({'error': 'Phone number not provided'}, status=status.HTTP_400_BAD_REQUEST)  # If phone number is not provided, return an error response with 400 status


 

@api_view(['GET'])
def download_users(request):
    # Check permissions
    error_response = check_permissions(request)  # Checking permissions for the request
    if error_response:  # If there's an error response from permission check
        return error_response  # Return the error response
    
    try:
        # Get all users from the database
        users = User.objects.all()

        # Create a CSV file as a HTTP response
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="enrolled_users.csv"'  # Set filename for the downloaded CSV
        
        # Write column headers to CSV
        writer = csv.writer(response)
        writer.writerow(['ID', 'Date_joined', 'Last_login', 'Email', 'Phone', 'First Name', 'Last Name', 'User Type'])

        # Write user data to CSV rows
        for user in users:
            writer.writerow([user.id, user.date_joined, user.last_login, user.email, user.phone, user.first_name, user.last_name, user.user_type])
 
        return response  # Return the CSV file as the HTTP response
    except LiveCourse.DoesNotExist:
        return Response({'error': 'Users do not exist'}, status=status.HTTP_404_NOT_FOUND)  # If users do not exist, return a 404 response
