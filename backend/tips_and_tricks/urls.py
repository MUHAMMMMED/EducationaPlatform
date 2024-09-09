 
from django.urls import path
from .views import*

urlpatterns = [
    path('tips_filter/', tips_filter ),
    path('tips_filter_dash/', tips_filter_dash  ),
    path('tip/', Tips_api),
    path('tip/<int:id>/', Tips_api),
     
    
]
