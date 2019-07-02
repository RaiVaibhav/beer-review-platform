from django.urls import path
from review import views

urlpatterns = [
    path('reviews/', views.ReviewListAPIView.as_view()),
    path('reviews/<int:pk>/', views.ReviewDetail.as_view()),
    path('bears/', views.BearListAPIView.as_view()),
]