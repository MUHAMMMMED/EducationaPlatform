from rest_framework.decorators import api_view
import json
from django.conf import settings
from django.http import JsonResponse 
from datetime import datetime
from LiveCourses.models import LiveCourse, LiveCourseCouponCode,UserLiveCourse
from django.core.mail import send_mail  

@api_view(['POST'])
def check_coupon_code_LiveCourse(request):
    if request.method == 'POST':
        # Parse the request body to extract data
        data = json.loads(request.body)
        course_id = data.get('id')  # Retrieve the course ID
        coupon_code = data.get('couponCode')  # Retrieve the coupon code

        try:
            # Check if the coupon code exists for the given course
            coupon = LiveCourseCouponCode.objects.get(course_id=course_id, Code=coupon_code)

            today = datetime.today().date()  # Get the current date

            # Check if the coupon is valid (not expired) and has remaining enrollments
            if coupon.date >= today and coupon.Enroll > 0:
                # Retrieve the course to apply the discount
                course = LiveCourse.objects.get(id=course_id)
                # Calculate the discounted price
                discounted_price = max(0, course.price - (course.price * coupon.discount / 100))
                # Decrement the coupon's enrollment count
                coupon.Enroll -= 1
                coupon.save()  # Save the updated coupon

                # Return a response with the validity status and discounted price
                return JsonResponse({
                    'valid': True,
                    'discountedPrice': discounted_price,
                    'discount': coupon.discount
                })
            else:
                # Return a response indicating the coupon is invalid or expired
                return JsonResponse({'valid': False, 'error': 'Invalid or expired coupon code'})
        
        except LiveCourseCouponCode.DoesNotExist:
            # Return a response indicating the coupon code does not exist
            return JsonResponse({'valid': False, 'error': 'Invalid coupon code'})
    
    # Return a response indicating that the request method is invalid
    return JsonResponse({'error': 'Invalid request method'}, status=405)

@api_view(['POST'])
def Free_Checkout_LiveCourse(request, id):
    try:
        # Retrieve the user object from the request
        user = request.user

        # Retrieve the LiveCourse object based on the provided course ID
        course = LiveCourse.objects.get(id=id)

        # Retrieve or create a UserLiveCourse object for the user and course
        # Set the default status to 'W' (waiting) if a new UserLiveCourse object is created
        user_course, created = UserLiveCourse.objects.get_or_create(
            student=user, 
            course=course, 
            defaults={'status': 'W'}
        )
   
        if created:
            # If a new UserLiveCourse object was created, increment the course's enrollment count
            course.Enroll += 1
            course.save()
        
        # Save the UserLiveCourse object
        user_course.save()

        # Send a thank-you email to the user
        send_mail(
            subject="Abo Rashad",
            message="Thank you for your purchase!",
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[user.email]
        )
    
        # Return a success response indicating the course enrollment was successful
        return JsonResponse({'message': 'Course enrollment successful.'}, status=201)
    
    except Exception as e:
        # Return an error response with the exception message if something goes wrong
        return JsonResponse({'error': str(e)}, status=400)