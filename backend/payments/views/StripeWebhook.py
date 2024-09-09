from rest_framework.decorators import api_view
import json
import stripe
from django.core.mail import send_mail  
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse 
from django.utils.encoding import smart_str
from django.core.exceptions import ValidationError
from decimal import Decimal  
from accounts.models import User
from Courses.models import Course,UserCourse
from Quiz.models import Exam , UserExam 
from LiveCourses.models import LiveCourse,UserLiveCourse 

DOMAIN =settings.DOMAIN
# Set the Stripe API key
stripe.api_key = settings.STRIPE_SECRET_KEY

 

@api_view(['GET'])
def authenticated(request):
    # Check permissions
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'User not authenticated'}, status= 401 )
    return JsonResponse({'message': 'User is authenticated'}, status=200 )

@api_view(['POST'])
def create_checkout_session(request):
    if request.method == 'POST':
        try:
            # Parse the request body as JSON
            data = json.loads(request.body)
            # Extract the list of items from the data
            items = data.get('items')
            
            # Check if the items list is present
            if not items:
                return JsonResponse({'error': 'Items list is missing'}, status=400)
            
            # Assuming a single item in the list for simplicity
            item = items[0]
            if not item:
                return JsonResponse({'error': 'Item not found'}, status=404)

            # Domain URL for redirection after payment
            YOUR_DOMAIN = DOMAIN  

            # Create a Stripe checkout session
            checkout_session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                line_items=[{
                    'price_data': {
                        'currency': 'usd',
                        'product_data': {
                            'name': item['name'],
                            'images': [item['img']],
                        },
                        'unit_amount': item['price'],  # Price in cents
                    },
                    'quantity': 1,  # Quantity of the item
                }],
                mode='payment',
                success_url=f'{YOUR_DOMAIN}/success',
                cancel_url=f'{YOUR_DOMAIN}/success',
                metadata={
                    "course_id": item['id'],  # Metadata for the course ID
                    "user_id": request.user.id,  # Metadata for the user ID
                    "discount": item['discount'],  # Metadata for the discount
                    "url_Type": item['url_Type'],  # Metadata for the URL type
                }
            )

            # Return the URL for the checkout session
            return JsonResponse({'url': checkout_session.url})
        
        except json.JSONDecodeError as e:
            # Handle errors related to invalid JSON
            return JsonResponse({'error': f'Invalid JSON: {str(e)}'}, status=400)
        except Exception as e:
            # Handle other exceptions
            return JsonResponse({'error': str(e)}, status=403)
    
    # Handle cases where the request method is not POST
    return JsonResponse({'error': 'Invalid request method'}, status=400)

@api_view(['POST'])
@csrf_exempt  # Exempt this view from CSRF verification
def stripe_webhook(request):
    # Retrieve and encode the request body
    payload = smart_str(request.body)

    # Retrieve the Stripe signature header from the request
    sig_header = request.META["HTTP_STRIPE_SIGNATURE"]

    try:
        # Construct the Stripe event using the payload and signature header
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )
    
    except ValueError:
        # Handle errors related to invalid payload
        return JsonResponse({'error': "Invalid payload"}, status=400)
    except stripe.error.SignatureVerificationError:
        # Handle errors related to invalid signature
        return JsonResponse({"error": "Invalid signature"}, status=400)
    
    # Handle the different event types
    if event["type"] == "checkout.session.completed":
        # Extract the session object from the event data
        session = event["data"]["object"]

        # Safely access metadata from the session
        url_Type = session["metadata"].get("url_Type")

        # Handle the session based on the URL type
        if url_Type == 'Course':
            handle_checkout_session_Course(session)

        elif url_Type == 'LiveCourse':
            handle_checkout_session_LiveCourse(session)

        elif url_Type == 'Quiz':
            handle_checkout_session_Quiz(session)
    
    # Return a success response
    return JsonResponse({"status": "success"})
 

def handle_checkout_session_Course(session):
    try:
 
        # Extract metadata from the session object
        course_id = session["metadata"]["course_id"]
        user_id = session["metadata"]["user_id"]
        discount = session["metadata"].get("discount", "0")   
        customer_email = session["customer_details"]["email"]

        # Convert the discount to Decimal
        try:
            discount = Decimal(discount)
            if discount < 0:
                raise ValueError("Discount cannot be negative.")
        except (ValueError, TypeError) as e:
            raise ValidationError(f"Invalid discount value: {discount}. Error: {e}")

        # Retrieve the user object
        user = User.objects.get(id=user_id)
        # Retrieve the course object
        course = Course.objects.get(id=course_id)
        # Retrieve or create a UserCourse object
        user_course, created = UserCourse.objects.get_or_create(
            student=user, 
            course_id=course_id,
            defaults={ 'status':'E'} 
        )
 
       # Handle associated exam if it exists
        if hasattr(course, 'exam'):
            exam = course.exam
            user_exam, created = UserExam.objects.get_or_create(
                student=user,
                exam=exam,
                defaults={'tries': exam.tries}
            )
            if not created:
                user_exam.tries = exam.tries  # Update tries if needed
            user_exam.save()
 
        # Ensure the course price is valid
        if course.price is None:
            raise ValidationError(f"The course price is not set for course ID {course_id}")

        # Convert course price to Decimal if it is a float
        course_price = Decimal(course.price)

        # Calculate the price after discount
        if discount > 0:
            discounted_price = max(Decimal('0'), course_price - (course_price * discount / Decimal('100')))
            user_course.Paid = discounted_price
            user_course.save()
        else:
            discounted_price = course_price
            user_course.Paid = discounted_price
            user_course.save()

        # If the object already exists, update the status and paid amount
        if not created:
            user_course.status = 'E'
            user_course.Paid = discounted_price
            user_course.save()

            course.Enroll += 1
            course.save()
 
        # Try sending a confirmation email, skip if an error occurs
        try:
             # Send a confirmation email to the user

            send_mail(
                subject="Abo Rashad",  # Subject of the email
                message=f"Thank you for your purchase!",  # Body of the email
                from_email=settings.EMAIL_HOST_USER,  # Sender's email address
                recipient_list=[customer_email],  # Recipient's email address
            )
        except Exception as email_error:
            # Log the error or handle it in any way needed, but don't stop the process
            print(f"Email sending failed: {email_error}")

 

        # Optionally, return the user_course object or perform additional actions
        return user_course

    except User.DoesNotExist:
        # Handle case where user does not exist
        # print("User does not exist")
        pass
        return None
    except Course.DoesNotExist:
        # Handle case where course does not exist
        # print("Course does not exist")
        pass
        return None
    except ValidationError as e:
        # Handle validation errors
        # print(f"Validation error: {e}")
        pass
        return None
    except Exception as e:
        # Handle other exceptions
        # print(f"An error occurred: {e}")
        pass

        return None

 

def handle_checkout_session_LiveCourse(session):

    try:
 
        # Extract metadata from the session object
        course_id = session["metadata"]["course_id"]
        user_id = session["metadata"]["user_id"]
        discount = session["metadata"].get("discount", "0")   
        customer_email = session["customer_details"]["email"]

        # Convert the discount to Decimal
        try:
            discount = Decimal(discount)
            if discount < 0:
                raise ValueError("Discount cannot be negative.")
        except (ValueError, TypeError) as e:
            raise ValidationError(f"Invalid discount value: {discount}. Error: {e}")

 
        # Retrieve the user object
        user = User.objects.get(id=user_id)
        # Retrieve the course object
        course = LiveCourse.objects.get(id=course_id)
        # Retrieve or create a UserCourse object
        user_course, created = UserLiveCourse.objects.get_or_create(
            student=user, 
            course_id=course_id,
            defaults={ 'status':'W'} 
        )
 
        # Ensure the course price is valid
        if course.price is None:
            raise ValidationError(f"The course price is not set for course ID {course_id}")

        # Convert course price to Decimal if it is a float
        course_price = Decimal(course.price)

        # Calculate the price after discount
        if discount > 0:
            discounted_price = max(Decimal('0'), course_price - (course_price * discount / Decimal('100')))
            user_course.Paid = discounted_price
            user_course.save()
        else:
            discounted_price = course_price
            user_course.Paid = discounted_price
            user_course.save()

        # If the object already exists, update the status and paid amount
        if not created:
            user_course.status = 'E'
            user_course.Paid = discounted_price
            user_course.save()

            course.Enroll += 1
            course.save()



        # Try sending a confirmation email, skip if an error occurs
        try:
             # Send a confirmation email to the user

            send_mail(
                subject="Abo Rashad",  # Subject of the email
                message=f"Thank you for your purchase!",  # Body of the email
                from_email=settings.EMAIL_HOST_USER,  # Sender's email address
                recipient_list=[customer_email],  # Recipient's email address
            )
        except Exception as email_error:
            # Log the error or handle it in any way needed, but don't stop the process
            print(f"Email sending failed: {email_error}")

 

        # Optionally, return the user_course object or perform additional actions
        return user_course

    except User.DoesNotExist:
        # Handle case where user does not exist
        # print("User does not exist")
        pass
        return None
    except Course.DoesNotExist:
        # Handle case where course does not exist
        # print("Course does not exist")
        pass
        return None
    except ValidationError as e:
        # Handle validation errors
        # print(f"Validation error: {e}")
        pass
        return None
    except Exception as e:
        # Handle other exceptions
        # print(f"An error occurred: {e}")
        pass

        return None

 
 
def handle_checkout_session_Quiz(session):

    try:
 
        # Extract metadata from the session object
        exam_id = session["metadata"]["course_id"]
        user_id = session["metadata"]["user_id"]
        discount = session["metadata"].get("discount", "0")   
        customer_email = session["customer_details"]["email"]

        # Convert the discount to Decimal
        try:
            discount = Decimal(discount)
            if discount < 0:
                raise ValueError("Discount cannot be negative.")
        except (ValueError, TypeError) as e:
            raise ValidationError(f"Invalid discount value: {discount}. Error: {e}")
  

        # Retrieve the user object
        user = User.objects.get(id=user_id)
        # Retrieve the exam object
        exam = Exam.objects.get(id=exam_id)
        # Retrieve or create a UserExam object
        user_exam, created = UserExam.objects.get_or_create(
            student=user, 
            exam=exam,
            tries=exam.tries 
        )
 
        # Ensure the exam price is valid
        if exam.price is None:
            raise ValidationError(f"The exam price is not set for exam ID {exam.id}")

        # Convert exam price to Decimal if it is a float
        exam_price = Decimal(exam.price)

        # Calculate the price after discount
        if discount > 0:
            discounted_price = max(Decimal('0'), exam_price - (exam_price * discount / Decimal('100')))
            user_exam.Paid = discounted_price
            user_exam.save()
        else:
            discounted_price = exam_price
            user_exam.Paid = discounted_price
            user_exam.save()

        # If the object already exists, update the status and paid amount
        if not created:
      
            user_exam.Paid = discounted_price
            user_exam.save()
 
            exam.Enroll += 1
            exam.save()
              # Send email to customer
  

        # Try sending a confirmation email, skip if an error occurs
        try:
             # Send a confirmation email to the user

            send_mail(
                subject="Abo Rashad",  # Subject of the email
                message=f"Thank you for your purchase!",  # Body of the email
                from_email=settings.EMAIL_HOST_USER,  # Sender's email address
                recipient_list=[customer_email],  # Recipient's email address
            )
        except Exception as email_error:
            # Log the error or handle it in any way needed, but don't stop the process
            print(f"Email sending failed: {email_error}")

 
        # Optionally, return the UserExam object or perform additional actions
        return user_exam

    except User.DoesNotExist:
        # Handle case where user does not exist
        # print("User does not exist")
        pass
        return None
    except Course.DoesNotExist:
        # Handle case where course does not exist
        # print("Course does not exist")
        pass
        return None
    except ValidationError as e:
        # Handle validation errors
        # print(f"Validation error: {e}")
        pass
        return None
    except Exception as e:
        # Handle other exceptions
        # print(f"An error occurred: {e}")
        pass

        return None

 
 