from rest_framework.decorators import api_view
import json
from django.core.mail import send_mail  
from django.conf import settings
from django.http import JsonResponse 
from datetime import datetime
from Courses.models import CouponCode, Course,UserCourse
 
 

@api_view(['POST'])
def check_coupon_code_Courses(request):
    if request.method == 'POST':
        # Load JSON data from the request body
        data = json.loads(request.body)
        
        # Extract course ID and coupon code from the request data
        course_id = data.get('id')
        coupon_code = data.get('couponCode')
        
        try:
            # Attempt to retrieve the CouponCode object using the course ID and coupon code
            coupon = CouponCode.objects.get(course_id=course_id, Code=coupon_code)

            # Get today's date for coupon validity check
            today = datetime.today().date()

            # Check if the coupon is valid (not expired) and has available enrollments
            if coupon.date >= today and coupon.Enroll > 0:
                # Retrieve the Course object to calculate the discounted price
                course = Course.objects.get(id=course_id)
                discounted_price = max(0, course.price - (course.price * coupon.discount / 100))
                
                # Decrement the coupon enrollment count and save the updated coupon
                coupon.Enroll -= 1
                coupon.save()
                
                # Return JSON response with valid status, discounted price, and discount percentage
                return JsonResponse({'valid': True, 'discountedPrice': discounted_price, 'discount': coupon.discount})
            else:
                # Return JSON response indicating the coupon code is invalid or expired
                return JsonResponse({'valid': False, 'error': 'Invalid or expired coupon code'})
        except CouponCode.DoesNotExist:
            # Return JSON response indicating the coupon code does not exist
            return JsonResponse({'valid': False, 'error': 'Invalid coupon code'})
    
    # Return JSON response for unsupported request methods
    return JsonResponse({'error': 'Invalid request method'}, status=405)
  
 
@api_view(['POST'])
def Free_Checkout_Course(request, id):
    try:
        # Retrieve the user object from the request
        user = request.user
        
        # Retrieve the course object based on the provided ID
        course = Course.objects.get(id=id)
        
        # Retrieve or create a UserCourse object for the user and course
        user_course, created = UserCourse.objects.get_or_create(
            student=user, 
            course=course,  
            defaults={'status': 'E'}  # Default status is 'Enrolled'
        )
        
        # If a new UserCourse object was created, increment the course enrollment count
        if created:
            course.Enroll += 1
            course.save()
        
        # Save the UserCourse object (this line is not necessary as 'get_or_create' already saves the object)
        user_course.save()
        
        # Send a confirmation email to the user
        send_mail(
            subject="Abo Rashad",  # Subject of the email
            message=f"Thank you for your purchase!",  # Body of the email
            from_email=settings.EMAIL_HOST_USER,  # Sender's email address
            recipient_list=[user.email],  # Recipient's email address
        )
        
        # Return a success response indicating the course enrollment was successful
        return JsonResponse({'message': 'Course enrollment successful.'}, status=201)
    
    except Exception as e:
        # Return an error response if an exception occurs
        return JsonResponse({'error': str(e)}, status=400)