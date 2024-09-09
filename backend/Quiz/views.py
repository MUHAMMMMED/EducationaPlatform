 
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from accounts.models import User
from accounts.serializers import UserSerializerwithId
from django.core.exceptions import ObjectDoesNotExist
from .serializers import *
from .models import *
from uuid import UUID
from django.http import HttpResponse
import csv
 
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
def available_exams(request):
    # Retrieve all exams that are marked as active
    exams = Exam.objects.filter(active=True)
    
    # Serialize the queryset of active exams
    serializer = ExamSerializer(exams, many=True)
    
    # Return the serialized data with a 200 OK status
    return Response(serializer.data, status=status.HTTP_200_OK)
 
 




@api_view(['GET'])
def exam_pay(request, exam_id):
    try:
        # Fetch the Exam object using the provided course ID
        exam =  Exam.objects.get(id=exam_id)
        # Serialize Exam data
        exam_serializer = ExamToCourseDetailSerializer(exam)
        exam_data = exam_serializer.data

        # Set is_enrolled to False by default
        is_enrolled = False
        # Check if the user is authenticated
        if request.user.is_authenticated:
            # Fetch the user's course enrollment
            user_exam = UserExam.objects.filter(student=request.user,exam_id=exam_id).last()
            # Check if user courses exist for the given exam_id
            if user_exam and user_exam.tries > 0:
              is_enrolled = True
            else:
              pass

        # Return JSON response with both course data and enrollment status
        return Response({
            'exam_data': exam_data,
            'is_enrolled': is_enrolled
        })
        
    except Exam.DoesNotExist:
        return Response({'error': 'exam_data not found'}, status=404)
 
 









@api_view(['GET'])
def Exam_Filter(request):
    # Retrieve the 'query' parameter from the GET request
    query = request.GET.get('query', '')
    
    # Filter exams based on the 'query' parameter
    if query == '':
        # If no query is provided, return all active exams
        exam = Exam.objects.filter(active=True)
    else:
        # If a query is provided, filter active exams where the title contains the query string
        exam = Exam.objects.filter(active=True, title__icontains=query)
    
    # Serialize the filtered exams
    course_serializer = ExamSerializer(exam, many=True)
    
    # Return the serialized data with a 200 OK status
    return Response(course_serializer.data, status=status.HTTP_200_OK)
 
@api_view(['GET'])
def exam_detail(request, exam_id):
      # Check if the user is authenticated
    if request.user.is_authenticated:
            user = request.user
            user_exam = UserExam.objects.filter(student=user, exam_id=exam_id).first()
            # Check if user courses exist for the given exam_id
            if user_exam and user_exam.tries > 0:
              is_enrolled = True
            else:
              is_enrolled = False
    else:
            is_enrolled = 'login'
    try:
            # Fetch the course object using the provided course_uuid
            exam = Exam.objects.get(pk=exam_id)
            active =exam.active

            if active:  # Check if the course is active
              exam = Exam.objects.get(pk=exam_id)
              serializer = ExamSerializer(exam)
              # Order by score in descending order and time_taking in ascending order
              Rank = ExamSubmission.objects.filter(exam__id=exam_id).order_by('-score', 'time_taking')
              rank_serializer = ExamSubmissionSerializer(Rank, many=True)
              # Fetch questions related to the course with the provided course_uuid
              Frequently = FrequentlyAsked.objects.filter(exam__id=exam_id )
              # Fetch review images related to the course with the provided course_uuid
              review_images = Review.objects.filter(exam__id=exam_id)
              review = review_images.all().order_by('?')
              # Serialize the course, rates, review images, and questions
              images_serializer = ReviewSerializer(review, many=True)
              Frequently_Asked = FrequentlyAskedSerializer(Frequently, many=True)
              # Include Rank in the response data
              response_data = serializer.data
              response_data['is_enrolled'] = is_enrolled
              response_data['rank'] = rank_serializer.data
              response_data['FrequentlyAsked'] = Frequently_Asked.data
              response_data['review_images'] = images_serializer.data
              exam.views+= 1
              exam.save()
              return Response(response_data,status=status.HTTP_200_OK)
 
    except Exam.DoesNotExist:
            return Response({'message': 'The Quiz is not available'}, status=status.HTTP_404_NOT_FOUND)
 

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def exam_quiz(request, exam_id):
    # Check if the user is authenticated
    if request.user.is_authenticated:
        user = request.user.id  # Get the authenticated user's ID
        
        try:
            # Retrieve the UserExam instance for the authenticated user
            userexam = UserExam.objects.filter(student=user).first()
            
            # Check if the user has remaining tries
            if userexam and userexam.tries > 0:
                triesuser = userexam.tries - 1  # Decrement the tries count
                
                try:
                    # Retrieve the Exam instance by its ID
                    exam = Exam.objects.get(id=exam_id)
                except Exam.DoesNotExist:
                    # Return an error if the exam does not exist
                    return Response({"message": "Exam does not exist"}, status=status.HTTP_400_BAD_REQUEST)
                
                # Serialize the exam data
                serializer_exam = ExamSerializer(exam)
                # Retrieve and shuffle the questions for the exam
                questions = exam.questions.all().order_by('?')
                serialized_questions = []

                # Serialize each question and add an index
                for index, question in enumerate(questions, start=1):
                    serialized_question = QuestionSerializer(question).data
                    serialized_question['index'] = index
                    serialized_questions.append(serialized_question)

                # Prepare the response data
                response_data = {
                    'exam': serializer_exam.data,
                    'questions': serialized_questions,
                    'triesuser': int(triesuser)
                }
                
                return Response(response_data, status=status.HTTP_200_OK)
            else:
                # Return a message if there are no tries left
                return Response({'message': 'No more tries left'}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            # Return an error if the user does not exist
            return Response({'message': 'Invalid user'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        # Return an error if the user is not authenticated
        return Response({'message': 'User is not authenticated'}, status=status.HTTP_400_BAD_REQUEST)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_exam(request):
    # Check if the user is authenticated
    if request.user.is_authenticated:
        user = request.user
        # Retrieve the exam ID from the request data
        exam_id = request.data.get('exam')
        
        # Return an error if the exam ID is not provided
        if not exam_id:
            return Response({'error': 'Exam ID is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Try to retrieve the Exam object by its ID
        try:
            exam = Exam.objects.get(id=exam_id)
        except Exam.DoesNotExist:
            # Return an error if the exam does not exist
            return Response({'error': 'Invalid Exam ID'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Prepare data for the serializer
        data = request.data
        data['user'] = user.id  # Add the user's ID to the data
        
        # Fetch the UserExam instance for the authenticated user
        user_exam = UserExam.objects.filter(student=user).first()
        if user_exam:
            tries_remaining = user_exam.tries
            # Check if the user has remaining tries
            if tries_remaining > 0:
                user_exam.tries -= 1  # Decrement the tries
                user_exam.save()  # Save the updated UserExam instance
        
        # Initialize the serializer with the provided data
        serializer = ExamSubmission_Serializer(data=data)
        # Check if the serializer data is valid
        if serializer.is_valid():
            serializer.save()  # Save the serialized data
            # Return the created exam submission data
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            # Return validation errors if the data is invalid
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        # Return an error if the user is not authenticated
        return Response({'error': 'User is not authenticated'}, status=status.HTTP_400_BAD_REQUEST)
 
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def examSubmissionList(request, exam_id ):
        # Access authenticated user from request
      if request.user.is_authenticated:
        user = request.user
        try:
            # Retrieve the ExamSubmission object for the given exam_id and user
            exam_submission = ExamSubmission.objects.filter(exam__id=exam_id, user__id=user.id).last()
            if exam_submission:
                # Serialize the ExamSubmission object
                serializer = ExamSubmissionSerializerList(exam_submission)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Exam submission not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
      else:
        return Response({'error': 'User is not authenticated'}, status=status.HTTP_400_BAD_REQUEST)

 
@api_view(['DELETE'])
def examSubmissionDelete(request, id):
    # Attempt to retrieve the ExamSubmission object by ID
    try:
        Subm = ExamSubmission.objects.get(id=id)  # Fetch the specific exam submission
    except ExamSubmission.DoesNotExist:
        # Return a 404 Not Found response if the exam submission does not exist
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    # Delete the exam submission if it exists
    Subm.delete()
    # Return a 204 No Content response indicating successful deletion
    return Response(status=status.HTTP_204_NO_CONTENT)
 
 
@api_view(['GET', 'POST'])
def exams_list(request):
    # Check permissions
    error_response = check_permissions(request)  # Call function to check permissions
    if error_response:  # If there's an error response from permission check
        return error_response  # Return the error response

    if request.method == 'GET':
        # Handle retrieving the list of all exams
        exams = Exam.objects.all()  # Retrieve all exam objects
        
        # Serialize the list of exams
        serializer = Exam_Serializer(exams, many=True)
        return Response(serializer.data)  # Return the serialized data with a 200 status

    elif request.method == 'POST':
        # Handle creating a new exam
        serializer = Exam_Serializer(data=request.data)  # Initialize the serializer with the request data
        
        if serializer.is_valid():  # Check if the request data is valid
            serializer.save()  # Save the new exam
            return Response(serializer.data, status=status.HTTP_201_CREATED)  # Return the serialized data with a 201 Created status
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Return validation errors with a 400 Bad Request status
 

# Define the view for handling exam operations
@api_view(['GET', 'PUT', 'DELETE'])
def exam_operations(request, exam_id):
    # Check permissions
    error_response = check_permissions(request)  # Call function to check permissions
    if error_response:  # If there's an error response from permission check
        return error_response  # Return the error response

    try:
        # Retrieve the Exam object by ID
        exam = Exam.objects.get(id=exam_id)
    except Exam.DoesNotExist:
        # Return a 404 Not Found error if the exam does not exist
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        # Handle retrieving exam details
        user = User.objects.filter(user_type='T')  # Retrieve all users with type 'T' (e.g., teachers)
        categories = Category.objects.all()  # Retrieve all categories
        question = exam.questions.all()  # Retrieve all questions associated with the exam
        question_count = question.count()  # Count the number of questions
        review = Review.objects.filter(exam__id=exam_id)  # Retrieve all reviews for the exam
        review_count = review.count()  # Count the number of reviews
        freq = FrequentlyAsked.objects.filter(exam__id=exam_id)  # Retrieve all frequently asked questions for the exam
        freq_count = freq.count()  # Count the number of frequently asked questions
        submission = ExamSubmission.objects.filter(exam__id=exam_id)  # Retrieve all submissions for the exam
        submission_count = submission.count()  # Count the number of submissions

        # Serialize data
        serializer = Exam_Serializer(exam)  # Serialize the exam object
        instructors_serializer = UserSerializerwithId(user, many=True)  # Serialize the list of instructors
        category_serializer = CategorySerializer(categories, many=True)  # Serialize the list of categories
        review_serializer = ReviewSerializer(review, many=True)  # Serialize the list of reviews
        freq_serializer = FrequentlyAskedSerializer(freq, many=True)  # Serialize the list of frequently asked questions
        question_serializer = QuestionSerializer(question, many=True)  # Serialize the list of questions
        submission_serializer = ExamSubmissionSerializer(submission, many=True)  # Serialize the list of submissions

        # Compile all serialized data into a single response
        data = serializer.data
        data['instructors'] = instructors_serializer.data
        data['categories'] = category_serializer.data
        data['review'] = review_serializer.data
        data['freq'] = freq_serializer.data
        data['question'] = question_serializer.data
        data['submission'] = submission_serializer.data
        data['question_count'] = question_count
        data['freq_count'] = freq_count
        data['submission_count'] = submission_count
        data['review_count'] = review_count

        return Response(data, status=status.HTTP_200_OK)  # Return the compiled data with a 200 status

    elif request.method == 'PUT':
        # Handle updating exam details
        serializer = Exam_Serializer(exam, data=request.data)  # Initialize the serializer with the exam object and updated data
        if serializer.is_valid():  # Check if the updated data is valid
            serializer.save()  # Save the updated exam
            return Response(serializer.data)  # Return the updated exam data with a 200 status

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Return validation errors with a 400 status

    elif request.method == 'DELETE':
        # Handle deleting the exam
        exam.delete()  # Delete the exam
        return Response(status=status.HTTP_204_NO_CONTENT)  # Return a 204 No Content status indicating successful deletion
    

# Define the view for handling Frequently Asked Questions (FAQ) operations
@api_view(['POST', 'PUT', 'DELETE'])
def faq_list(request, id=None):
    # Check permissions
    error_response = check_permissions(request)  # Call function to check permissions
    if error_response:  # If there's an error response from permission check
        return error_response  # Return the error response

    if request.method == 'POST':
        # Handle creating a new FAQ
        serializer = FrequentlyAskedSerializer(data=request.data)  # Initialize the serializer with request data
        if serializer.is_valid():  # Check if the data is valid
            serializer.save()  # Save the new FAQ
            return Response(serializer.data, status=status.HTTP_201_CREATED)  # Return the created FAQ with a 201 status
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Return validation errors with a 400 status

    elif request.method == 'PUT':
        if id:
            try:
                # Retrieve the FAQ by ID
                faq = FrequentlyAsked.objects.get(id=id)
                # Initialize the serializer with the existing FAQ and the updated data
                serializer = FrequentlyAskedSerializer(faq, data=request.data)
                if serializer.is_valid():  # Check if the updated data is valid
                    serializer.save()  # Save the updated FAQ
                    return Response(serializer.data)  # Return the updated FAQ with a 200 status
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Return validation errors with a 400 status
            except FrequentlyAsked.DoesNotExist:
                # Return a 404 Not Found error if the FAQ does not exist
                return Response({"error": "FrequentlyAsked not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Return a 400 Bad Request error if no ID is provided
            return Response({"error": "No FrequentlyAsked ID provided"}, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        if id:
            try:
                # Retrieve the FAQ by ID and delete it
                faq = FrequentlyAsked.objects.get(id=id)
                faq.delete()  # Delete the FAQ
                return Response(status=status.HTTP_204_NO_CONTENT)  # Return a 204 No Content status indicating successful deletion
            except FrequentlyAsked.DoesNotExist:
                # Return a 404 Not Found error if the FAQ does not exist
                return Response({"error": "FrequentlyAsked not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Return a 400 Bad Request error if no ID is provided
            return Response({"error": "No FrequentlyAsked ID provided"}, status=status.HTTP_400_BAD_REQUEST)

 

# Define the view for handling review operations
@api_view(['POST', 'DELETE'])
def review_list(request, id=None):
    # Check permissions
    error_response = check_permissions(request)  # Call function to check permissions
    if error_response:  # If there's an error response from permission check
        return error_response  # Return the error response

    if request.method == 'POST':
        # Handle creating a new review
        serializer = ReviewSerializer(data=request.data)  # Initialize the serializer with request data
        if serializer.is_valid():  # Check if the data is valid
            serializer.save()  # Save the new review
            return Response(serializer.data, status=status.HTTP_201_CREATED)  # Return the created review with a 201 status
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Return validation errors with a 400 status

    elif request.method == 'DELETE':
        if id:
            try:
                # Retrieve the review by ID and delete it
                review = Review.objects.get(id=id)
                review.delete()  # Delete the review
                return Response(status=status.HTTP_204_NO_CONTENT)  # Return a 204 No Content status indicating successful deletion
            except Review.DoesNotExist:
                # Return a 404 Not Found error if the review does not exist
                return Response({"error": "Review not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Return a 400 Bad Request error if no ID is provided
            return Response({"error": "No Review ID provided"}, status=status.HTTP_400_BAD_REQUEST)
 
 

@api_view(['DELETE'])
def delete_questions_from_exam(request, exam_id, question_id):
    # Check permissions
    error_response = check_permissions(request)
    if error_response:
        return error_response
    # Get the exam instance
    exam = Exam.objects.get(id=exam_id)
    # Ensure question_id is a list
    if not isinstance(question_id, list):
        question_id = [question_id]
    # Iterate over the question IDs and delete them from the exam
    for q_id in question_id:
        try:
            # Convert question_id to UUID if it's not already
            if not isinstance(q_id, UUID):
                q_id = UUID(q_id)
            question = Question.objects.get(id=q_id)
            exam.questions.remove(question)
        except Exception as e:
            pass
    return Response(status=status.HTTP_204_NO_CONTENT)

 



# Define the view for filtering users based on the provided exam ID and query parameters
@api_view(['GET'])
def user_Filter(request, id):

    # Check permissions
    error_response = check_permissions(request)  # Call function to check permissions
    if error_response:  # If there's an error response from permission check
        return error_response  # Return the error response

    try:
        # Retrieve query parameters from the request
        query = request.GET.get('query', '')  # Search query for filtering users
        start_date = request.GET.get('start_date', '')  # Start date for filtering by date range
        end_date = request.GET.get('end_date', '')  # End date for filtering by date range
        
        # Retrieve the Exam instance by ID
        exam = Exam.objects.get(id=id)
        
        # Get all UserExam instances associated with the specified exam
        users = UserExam.objects.filter(exam__id=exam.id)
        
        # Filter users based on the search query if provided
        if query:
            users = users.filter(student__first_name__icontains=query)
        
        # Filter users based on the date range if both start and end dates are provided
        if start_date and end_date:
            users = users.filter(date__range=[start_date, end_date])
        
        # Serialize the filtered users
        user_serializer = UserExam_SerializerList(users, many=True)
        
        # Count the number of filtered users
        user_count = users.count()

        # Create a dictionary to hold the serialized data and user count
        data = {
            'users': user_serializer.data,  # Serialized user data
            'user_count': user_count  # Total count of users
        }
        
        # Return the response with the data and a 200 OK status
        return Response(data)
    
    except UserExam.DoesNotExist:
        # Return a 404 Not Found error if UserExam does not exist
        return Response({'error': 'UserExam not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        # Return a 500 Internal Server Error if any other exception occurs
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

 
@api_view(['PUT'])
def UpdateTries(request, id):
    # Check permissions
    error_response = check_permissions(request)
    if error_response:
        return error_response
 
    # Get status from request
    tries_value = request.data.get('count')
    # Check if the UserLiveCourse instance exists
    user= UserExam.objects.get(id=id)
    # Update status if provided
    if tries_value:
        user.tries = tries_value
        user.save()
        return Response({'message': 'tries updated successfully'}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'tries not provided'}, status=status.HTTP_400_BAD_REQUEST)

 

@api_view(['GET'])
def download_users_data(request, id):
     # Check permissions
    error_response = check_permissions(request)
    if error_response:
        return error_response
    try:
        # Get the live course
        exam = Exam.objects.get(id=id)
        # Get the users enrolled in the live course
        users = UserExam.objects.filter(exam__id=exam.id)
        # Create a CSV file
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="enrolled_students.csv"'
        # Write data to CSV
        writer = csv.writer(response)
        writer.writerow([ 'Date_joined','Last_login' ,'Email','ID','created', 'exam', 'Date', 'First Name', 'Last Name', 'Paid', 'tries'])
        for user in users:
            writer.writerow([user.student.date_joined,user.student.last_login,user.student.email,user.id,user.created ,user.exam, user.date,  user.student.first_name, user.student.last_name, user.Paid, user.tries])

        return response
    except Exam.DoesNotExist:
        return Response({'error': 'Exam does not exist'}, status=status.HTTP_404_NOT_FOUND)
 
@api_view(['GET'])
def  exam_coupon_codes(request, id):
     # Check permissions
    error_response = check_permissions(request)
    if error_response:
        return error_response
    try:
        # Get all coupon codes related to the specified course ID
        coupon_codes = ExamCouponCode.objects.filter(exam_id=id)
        serializer = ExamCouponCodeSerializer(coupon_codes, many=True)
        return Response(serializer.data)
    except ExamCouponCode.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Define the view for creating a new coupon code for an exam
@api_view(['POST'])
def exam_coupon_codes_create(request, id):
    # Check permissions
    error_response = check_permissions(request)  # Call function to check permissions
    if error_response:  # If there's an error response from permission check
        return error_response  # Return the error response

    try:
        # Retrieve the Exam associated with the provided ID
        exam = Exam.objects.get(id=id)
        
        # Parse the request data to extract coupon code details
        data = request.data
        request.data['exam'] = exam.id  # Add the exam ID to the request data
        
        # Initialize the serializer with the request data
        serializer = ExamCouponCodeSerializer(data=data)
        
        if serializer.is_valid():  # Check if the serializer data is valid
            # Save the coupon code with the associated exam
            serializer.save()
            # Return a 201 Created status with the serialized data
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            # Return a 400 Bad Request status with validation errors
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exam.DoesNotExist:
        # Return a 404 Not Found error if the exam does not exist
        return Response({'error': 'Exam does not exist'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        # Return a 500 Internal Server Error if any other exception occurs
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
 
 
# Define the view for deleting a coupon code for an exam
@api_view(['DELETE'])
def exam_coupon_codes_delete(request, id):
    # Check permissions
    error_response = check_permissions(request)  # Call function to check permissions
    if error_response:  # If there's an error response from permission check
        return error_response  # Return the error response

    try:
        # Attempt to retrieve the coupon code by ID
        coupon_code = ExamCouponCode.objects.get(id=id)
        # Delete the coupon code
        coupon_code.delete()
        # Return a 204 No Content status indicating successful deletion
        return Response(status=status.HTTP_204_NO_CONTENT)
    except ExamCouponCode.DoesNotExist:
        # Return a 404 Not Found error if the coupon code does not exist
        return Response({'error': 'Coupon code does not exist'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        # Return a 500 Internal Server Error if any other exception occurs
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
 

 
# Define the view for filtering questions based on user ID and query parameters
@api_view(['GET'])
def question_Filter(request, id):
    # Check permissions
    error_response = check_permissions(request)  # Call function to check permissions
    if error_response:  # If there's an error response from permission check
        return error_response  # Return the error response

    try:
        # Retrieve the user by ID
        user = User.objects.get(id=id)
        # Get questions created by the user and order them by creation date in descending order
        questions = Question.objects.filter(creator=user).order_by('-created')

        # Get the category ID from the query parameters
        categoryId = request.GET.get('categoryId')

        # Filter questions based on the category ID if provided
        if categoryId:
            questions = questions.filter(category__id=categoryId)

        # Get the search query from the query parameters
        query = request.GET.get('search', '')

        # Filter questions based on the search query if provided
        if query == '':
            filtered_questions = questions
        else:
            filtered_questions = questions.filter(question_content__icontains=query)

        # Prepare the response data
        data = []
        for question in filtered_questions:
            question_data = {
                'creator': question.creator.id,  # ID of the creator
                'id': question.id,  # ID of the question
                'category': {
                    'id': question.category.id if question.category else None,  # Category ID
                    'title': question.category.title if question.category else None  # Category title
                },
                'question_content': question.question_content,  # Content of the question
                'question_video_youtube': question.question_video_youtube,  # YouTube video URL (if any)
                'option_A': question.option_A,  # Option A
                'option_B': question.option_B,  # Option B
                'option_C': question.option_C,  # Option C
                'option_D': question.option_D,  # Option D
                'correct_option': question.correct_option,  # Correct option
                'exams': []  # List to hold exams associated with the question
            }

            # Add question image URL if it exists
            if question.question_image:
                question_data['question_image'] = question.question_image.url
            else:
                question_data['question_image'] = None

            # Retrieve exams associated with the question
            exams = Exam.objects.filter(questions=question)
            for exam in exams:
                question_data['exams'].append({
                    'exam_id': exam.id,  # ID of the exam
                    'exam_title': exam.title,  # Title of the exam
                })
            data.append(question_data)

        # Serialize all exams and question categories
        exams = Exam.objects.all()
        question_cat = Question_category.objects.all()

        category_serializer = Question_categorySerializer(question_cat, many=True)
        exam_serializer = Exam_Serializer(exams, many=True)
        data_with_exams = {
            'questions': data,  # List of filtered questions with their details
            'exams': exam_serializer.data,  # List of all exams
            'category': category_serializer.data  # List of all question categories
        }

        # Return the response with a 200 OK status
        return Response(data_with_exams, status=status.HTTP_200_OK)

    except ObjectDoesNotExist:
        # Return a 404 Not Found error if the user does not exist
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        # Return a 500 Internal Server Error if any other exception occurs
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Define the view for adding a question to an exam
@api_view(['POST'])
def add_question_to_exam(request):
    # Check permissions
    error_response = check_permissions(request)  # Call function to check permissions
    if error_response:  # If there's an error response from permission check
        return error_response  # Return the error response

    try:
        # Extract data from the request
        exam_id = request.data.get('exam_id')  # Retrieve the exam ID from the request data
        question_id = request.data.get('question_id')  # Retrieve the question ID from the request data
  
        # Get the exam object by exam_id
        try:
            exam = Exam.objects.get(id=exam_id)
        except ObjectDoesNotExist:
            return Response({'error': 'Exam not found'}, status=status.HTTP_404_NOT_FOUND)  # Return 404 Not Found if the exam does not exist

        # Get the question object by question_id
        try:
            question = Question.objects.get(id=question_id)
        except ObjectDoesNotExist:
            return Response({'error': 'Question not found'}, status=status.HTTP_404_NOT_FOUND)  # Return 404 Not Found if the question does not exist

        # Associate the question with the exam
        exam.questions.add(question)  # Add the question to the exam's questions

        # Return a 201 Created status indicating successful addition
        return Response(status=status.HTTP_201_CREATED)
    
    except Exception as e:
        # Handle any other exceptions that occur
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)  # Return a 500 Internal Server Error with the exception message
 

# Define the view for deleting questions from an exam
@api_view(['DELETE'])
def delete_questions_from_exam(request, exam_id, question_id):
    # Check permissions
    error_response = check_permissions(request)  # Call function to check permissions
    if error_response:  # If there's an error response from permission check
        return error_response  # Return the error response

    # Get the exam instance by exam_id
    try:
        exam = Exam.objects.get(id=exam_id)
    except Exam.DoesNotExist:
        return Response({"error": "Exam not found"}, status=status.HTTP_404_NOT_FOUND)  # Return 404 Not Found if the exam does not exist

    # Ensure question_id is a list
    if not isinstance(question_id, list):
        question_id = [question_id]

    # Iterate over the question IDs and delete them from the exam
    for q_id in question_id:
        try:
            # Convert question_id to UUID if it's not already
            if not isinstance(q_id, UUID):
                q_id = UUID(q_id)
            # Get the question instance by id
            question = Question.objects.get(id=q_id)
            # Remove the question from the exam's questions
            exam.questions.remove(question)
        except (Question.DoesNotExist, ValueError) as e:
            # Handle cases where the question does not exist or invalid UUID conversion
            pass

    # Return a 204 No Content status indicating successful deletion
    return Response(status=status.HTTP_204_NO_CONTENT)


 
# Define the view for listing and creating questions
@api_view(['GET', 'POST'])
def question_list(request):
    # Check permissions
    error_response = check_permissions(request)  # Call function to check permissions
    if error_response:  # If there's an error response from permission check
        return error_response  # Return the error response

    if request.method == 'GET':  # Handle GET requests to list all questions
        questions = Question.objects.all()  # Retrieve all questions
        serializer = QuestionSerializer(questions, many=True)  # Serialize the list of questions
        return Response(serializer.data)  # Return the serialized data for all questions

    elif request.method == 'POST':  # Handle POST requests to create a new question
        serializer = QuestionSerializer(data=request.data)  # Initialize the serializer with the request data
        if serializer.is_valid():  # Validate the data
            serializer.save()  # Save the new question
            return Response(serializer.data, status=status.HTTP_201_CREATED)  # Return the serialized data with a 201 Created status
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Return validation errors with a 400 Bad Request status
 

# Define the view for updating or deleting a question by id
@api_view(['PUT', 'DELETE'])
def question_Update(request, id):
    # Check permissions
    error_response = check_permissions(request)  # Call function to check permissions
    if error_response:  # If there's an error response from permission check
        return error_response  # Return the error response

    # Attempt to retrieve the question by its id
    try:
        question = Question.objects.get(id=id)
    except Question.DoesNotExist:  # If the question is not found
        return Response({"error": "Question not found"}, status=status.HTTP_404_NOT_FOUND)  # Return a 404 Not Found error

    if request.method == 'PUT':  # Handle PUT requests for updating the question
        # Initialize the serializer with the question instance and the new data
        serializer = QuestionSerializer(question, data=request.data)
        if serializer.is_valid():  # Validate the data
            serializer.save()  # Save the updated question
            return Response(serializer.data)  # Return the serialized data for the updated question
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Return validation errors with a 400 Bad Request status

    elif request.method == 'DELETE':  # Handle DELETE requests for deleting the question
        question.delete()  # Delete the question
        return Response(status=status.HTTP_204_NO_CONTENT)  # Return a 204 No Content status indicating successful deletion
 

# Define the view for filtering categories based on a query parameter
@api_view(['GET'])
def Categories_filter(request):
    # Check permissions
    error_response = check_permissions(request)  # Call function to check permissions
    if error_response:  # If there's an error response from permission check
        return error_response  # Return the error response

    # Retrieve the 'query' parameter from the request's GET parameters
    query = request.GET.get('query', '')

    # Retrieve all categories
    Cat = Question_category.objects.all()

    # If a query parameter is provided, filter the categories based on the 'title' field
    if query:
        Cat = Cat.filter(title__icontains=query)
  
    # Serialize the filtered categories
    serializer = Question_categorySerializer(Cat, many=True)
    
    # Return the serialized data with a 200 OK status
    return Response(serializer.data, status=status.HTTP_200_OK)
  

# Define the view for handling Category requests
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def Categories(request, id=None):
    # Check permissions
    error_response = check_permissions(request)  # Call function to check permissions
    if error_response:  # If there's an error response from permission check
        return error_response  # Return the error response

    if request.method == 'GET':  # Handle GET requests
        if id:  # If an id is provided
            # Retrieve a single category by id
            Cat = Question_category.objects.get(id=id)
            Cat_serializer = Question_categorySerializer(Cat)   
            return Response(Cat_serializer.data)  # Return the serialized data for the category
        else:
            # Retrieve all categories
            events = Category.objects.all()
            serializer = Question_categorySerializer(events, many=True)
            return Response(serializer.data)  # Return the serialized data for all categories

    elif request.method == 'POST':  # Handle POST requests
        # Create a new category
        serializer = Question_categorySerializer(data=request.data)
        if serializer.is_valid():  # Validate the data
            serializer.save()  # Save the new category
            return Response(serializer.data, status=status.HTTP_201_CREATED)  # Return the serialized data with a 201 Created status
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Return validation errors with a 400 Bad Request status

    elif request.method == 'PUT':  # Handle PUT requests
        # Update an existing category
        Cat = Question_category.objects.get(id=id)
        serializer = Question_categorySerializer(Cat, data=request.data)
        if serializer.is_valid():  # Validate the data
            serializer.save()  # Save the updated category
            return Response(serializer.data)  # Return the serialized data for the updated category
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Return validation errors with a 400 Bad Request status

    elif request.method == 'DELETE':  # Handle DELETE requests
        # Delete an existing category
        Cat = Question_category.objects.get(id=id)
        Cat.delete()  # Delete the category
        return Response(status=status.HTTP_204_NO_CONTENT)  # Return a 204 No Content status indicating successful deletion