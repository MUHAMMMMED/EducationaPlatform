 
from django.urls import path
from .views import*

urlpatterns = [
    path('api/tips_filter/', tips_filter ),
    path('api/tips_filter_dash/', tips_filter_dash  ),
    path('api/tip/', Tips_api),
    path('api/tip/<int:id>/', Tips_api),
    
]
