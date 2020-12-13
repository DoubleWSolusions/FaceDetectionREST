from django.urls import path
from . import views
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
    path('detection/', views.DetectionView.as_view(), name='detection'),
    path('detection2/', views.DetectionView2.as_view(), name='detection2'),
    path('detection3/', views.DetectionView3.as_view(), name='detection3'),
    path('image/', views.ImageView.as_view(), name='image')
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_URL)
