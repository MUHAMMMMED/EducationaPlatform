
from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
    path('admin/', admin.site.urls),
    path('home/', include('Home.urls')),
    path('Query/', include('Query.urls')),

    path('dashboard/', include('Dashboard.urls')),
    path('Courses/', include('Courses.urls')),
    path('LiveCourses/', include('LiveCourses.urls')),
    path('Quiz/', include('Quiz.urls')),
    path('EmailMarketing/', include('EmailMarketing.urls')),
    path('meetings/', include('meetings.urls')),
    path('tips/', include('tips_and_tricks.urls')),
    path('payments/', include('payments.urls')),
    path('Event/', include('Event.urls')),
    path('api/Users/', include('accounts.urls')),
 

 
]
# if settings.DEBUG:
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
