from django.urls import path
from . import views
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
    path('detection/', views.DetectionView.as_view(), name='detection'),
    path('image/', views.ImageView.as_view(), name='image')
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_URL)
