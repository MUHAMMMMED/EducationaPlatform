from celery import shared_task
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from datetime import datetime
from django.conf import settings
 
@shared_task
def send_message_task(email, name, Language, subject, message, Link, button_action):
    # Format the current date
    current_date = datetime.now().strftime('%B %d, %Y')  # Format the date as needed
    # Render the email body using a template
    email_body = render_to_string('Promotion.html', {
        'name': name,
        'subject': subject,
        'Language': Language,
        'message': message,
        'Link': Link,
        'button_action': button_action,
        'current_date': current_date,   
        'current_year': datetime.now().year
    })

    from_email = settings.EMAIL_HOST_USER  # Get the email host user from settings

    try:
        # Create and send the email
        d_email = EmailMessage(subject=subject, body=email_body, from_email=from_email, to=[email])
        d_email.content_subtype = 'html'
        d_email.send()
        # print(f"Email sent to {email}")  # Uncomment for debugging
    except Exception as e:
        # print(f"Failed to send email to {email}: {e}")  # Uncomment for debugging
        pass
