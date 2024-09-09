
from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
    path('api/home/', include('Home.urls')),
    path('api/Query/', include('Query.urls')),
    path('api/dashboard/', include('Dashboard.urls')),
    path('api/Courses/', include('Courses.urls')),
    path('api/LiveCourses/', include('LiveCourses.urls')),
    path('api/Quiz/', include('Quiz.urls')),
    path('api/EmailMarketing/', include('EmailMarketing.urls')),
    path('api/meetings/', include('meetings.urls')),
    path('api/tips/', include('tips_and_tricks.urls')),
    path('api/payments/', include('payments.urls')),
    path('api/Event/', include('Event.urls')),
    path('api/Users/', include('accounts.urls')),
    path('api/admin/', admin.site.urls),

]
# if settings.DEBUG:
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
