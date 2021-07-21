from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.schemas import get_schema_view
from rest_framework_swagger.views import get_swagger_view
from django.views.generic import TemplateView
from django.conf.urls import url

# from rest_framework.authtoken import views as V

from project_api import views

# schema_view = get_swagger_view(title='API')

router = DefaultRouter()
router.register('profile', views.UserProfileViewSet)
router.register('incident', views.IncidentViewSet)
router.register('proposition', views.PropositionViewSet)
router.register('notification', views.NotifViewSet, basename='notification')
router.register('category', views.CategoryViewSet)


urlpatterns = [

    # path('user', views.UserProfileAPIView.as_view()),
    path('user/detail/<int:id>', views.UserProfileDetail.as_view()),
    path('', include(router.urls)),
    # path('login', views.UserLoginApiView.as_view()),
    path('api-token-auth/', views.CustomAuthToken.as_view()),
    # path('api-token-auth/' , V.obtain_auth_token),

    # path('docs/', schema_view),

    path('openapi/', get_schema_view(
        title="School Service",
        description="API developers hpoing to use our service"
    ), name='openapi-schema'),
    #
    path('docs/', TemplateView.as_view(
        template_name='documentation.html',
        extra_context={'schema_url': 'openapi-schema'}
    ), name='swagger-ui'),




]
