from django.urls import path
from .views import register, medication_list, submit_refill_request, refill_stats
from . import views

urlpatterns = [
    path('register/', register, name='register'),
    path('medications/', medication_list, name='medication-list'),
    path('refill-request/', submit_refill_request, name='refill-request'),
    path('refill-stats/', refill_stats, name='refill-stats'),
]
