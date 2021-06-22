from django.urls import path, include
from rest_framework.routers import DefaultRouter

from project_api import views

urlpatterns = [

    path('user', views.UserProfileAPIView.as_view()),
    # path('login', views.UserLoginApiView.as_view()),
    # path('', include(router.urls))

]
