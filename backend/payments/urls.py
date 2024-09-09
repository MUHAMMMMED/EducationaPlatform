from django.urls import path
from .views.Courses import*
from .views.LiveCourse import*
from .views.Quiz import*
from .views.StripeWebhook import*


 

 
urlpatterns = [
    path('authenticated/', authenticated ),

    path('Check-CouponCode-Courses/', check_coupon_code_Courses ),
    path('Check-CouponCode-LiveCourse/', check_coupon_code_LiveCourse ),
    path('Check-CouponCode-Quiz/', check_coupon_code_Quiz ),
 
    path('Free_Checkout_Course/<int:id>/', Free_Checkout_Course ),
    path('Free_Checkout_LiveCourse/<int:id>/', Free_Checkout_LiveCourse ),
    path('Free_Checkout_Exam/<uuid:id>/', Free_Checkout_Exam ),

    path('create-checkout-session/', create_checkout_session),
    path('stripe_webhooks', stripe_webhook, name='stripe-webhook'),

]
# https://docs.stripe.com/stripe-cli

# brew install stripe/stripe-cli/stripe
# stripe listen --forward-to localhost:8000/payments/stripe_webhooks
# stripe listen --events=payment_intent.succeeded

 