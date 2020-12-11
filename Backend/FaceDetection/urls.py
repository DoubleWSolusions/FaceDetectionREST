from django.urls import path
from . import views


urlpatterns = [
    path('detection/', views.DetectionView.as_view(), name='detection'),
    path('image/', views.ImageView.as_view(), name='image')
]
