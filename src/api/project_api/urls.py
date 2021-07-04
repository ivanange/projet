from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.schemas import get_schema_view
from django.views.generic import TemplateView

from project_api import views

urlpatterns = [

    path('user', views.UserProfileAPIView.as_view()),
    # path('login', views.UserLoginApiView.as_view()),
    # path('', include(router.urls))

    path('openapi/', get_schema_view(
        title="School Service",
        description="API developers hpoing to use our service"
    ), name='openapi-schema'),

    path('docs/', TemplateView.as_view(
        template_name='documentation.html',
        extra_context={'schema_url':'openapi-schema'}
    ), name='swagger-ui'),


]
