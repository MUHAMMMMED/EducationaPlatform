from rest_framework.decorators import api_view
import json
from datetime import datetime
from django.http import JsonResponse  
from Quiz.models import Exam,ExamCouponCode,UserExam
from django.core.mail import send_mail  
from django.conf import settings

@api_view(['POST'])
def check_coupon_code_Quiz(request):
    if request.method == 'POST':
        # Parse the JSON data from the request body
        data = json.loads(request.body)
        
        # Extract the exam ID and coupon code from the parsed data
        exam_id = data.get('id')
        coupon_code = data.get('couponCode')
        
        try:
            # Retrieve the ExamCouponCode object matching the exam ID and coupon code
            coupon = ExamCouponCode.objects.get(exam_id=exam_id, Code=coupon_code)

            # Get today's date
            today = datetime.today().date()
            
            # Check if the coupon is valid (i.e., not expired and has remaining enrollments)
            if coupon.date >= today and coupon.Enroll > 0:
                # Retrieve the Exam object for the given exam ID
                exam = Exam.objects.get(id=exam_id)
                
                # Calculate the discounted price
                discounted_price = max(0, exam.price - (exam.price * coupon.discount / 100))
                
                # Decrease the number of available enrollments for the coupon
                coupon.Enroll -= 1
                coupon.save()
                
                # Return a JSON response indicating the coupon is valid and include the discounted price
                return JsonResponse({'valid': True, 'discountedPrice': discounted_price, 'discount': coupon.discount})
            else:
                # Return a JSON response indicating the coupon is invalid or expired
                return JsonResponse({'valid': False, 'error': 'Invalid or expired coupon code'})
        except ExamCouponCode.DoesNotExist:
            # Return a JSON response indicating the coupon code does not exist
            return JsonResponse({'valid': False, 'error': 'Invalid coupon code'})
    
    # Return a JSON response indicating the request method is not allowed
    return JsonResponse({'error': 'Invalid request method'}, status=405)
 @api_view(['POST'])
def Free_Checkout_Exam(request, id):
    try:
        # Retrieve the user object from the request
        user = request.user
        
        # Retrieve the Exam object for the given ID
        exam = Exam.objects.get(id=id)
        
        # Retrieve or create a UserExam object for the user and exam
        # Initialize tries with the value from the exam object
        user_exam, created = UserExam.objects.get_or_create(
            student=user, 
            exam=exam,
            defaults={'tries': exam.tries}
        )

        # If a new UserExam object was created, increment the enroll count
        if created:
            exam.Enroll += 1
            exam.save()
        
        # Save the UserExam object
        user_exam.save()
        
        # Send a confirmation email to the user
        send_mail(
            subject="Abo Rashad",
            message="Thank you for your purchase!",
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[user.email]
        )
        
        # Return a success response indicating the exam enrollment was successful
        return JsonResponse({'message': 'Exam enrollment successful.'}, status=201)
    
    except Exception as e:
        # Return an error response if any exception occurs
        return JsonResponse({'error': str(e)}, status=400)