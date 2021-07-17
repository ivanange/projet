from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets, filters
from rest_framework.parsers import FileUploadParser
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly, DjangoModelPermissions
from rest_framework.settings import api_settings
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
import django_filters.rest_framework

from project_api import serializers
from project_api import models
from project_api import permissions






class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email
        })


class UserProfileViewSet(viewsets.ModelViewSet):
    """Handle creating and updating user profile"""

    parser_class = (FileUploadParser,)
    serializer_class = serializers.UserProfileSerializer
    queryset = models.UserProfile.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.UpdateOwnProfile,)
    # filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    # search_fields = ('name', 'email',)
    filterset_fields = ('name',)

class IncidentViewSet(viewsets.ModelViewSet):

    parser_class = (FileUploadParser,)
    authentication_classes = (TokenAuthentication,)
    serializer_class = serializers.IncidentSerializer
    queryset = models.Incident.objects.all()
    permission_classes = (
        permissions.UpdateOWnStatus,
        IsAuthenticatedOrReadOnly,

    )
    filterset_fields = ('category',)

    def perform_create(self, serializer):
        """Sets the user profile to the logged in user"""

        serializer.save(user = self.request.user)


class PropositionViewSet(viewsets.ModelViewSet):

    authentication_classes = (TokenAuthentication,)
    serializer_class = serializers.PropositionSerializer
    queryset = models.Proposition.objects.all()
    permission_classes = (
        permissions.UpdateOWnConfirmStatus,
        IsAuthenticatedOrReadOnly,

    )

    def perform_create(self, serializer):
        """Sets the user profile to the logged in user"""

        serializer.save(person = self.request.user)

class NotifViewSet(viewsets.ModelViewSet):

    authentication_classes = (TokenAuthentication,)
    serializer_class = serializers.NotifSerializer
    queryset = models.notif.objects.all()
    permission_classes = (
        permissions.UpdateOnlyAdmin,
        IsAuthenticatedOrReadOnly,

    )

    def perform_create(self, serializer):
        """Sets the user profile to the logged in user"""

        serializer.save(from_user = self.request.user)


class CategoryViewSet(viewsets.ModelViewSet):

    authentication_classes = (TokenAuthentication,)
    serializer_class = serializers.CategorySerializer
    queryset = models.Category.objects.all()
    permission_classes = (DjangoModelPermissions,

    )

    def perform_create(self, serializer):
        """Sets the user profile to the logged in user"""

        serializer.save(by_admin = self.request.user)


# ===================================================================
#   			OLD VERSION WITH APIView						    #
# ===================================================================
class UserProfileAPIView(APIView):
	"""docstring forUserProfileApiView."""

	serializer_class = serializers.UserProfileSerializer
	authentication_classes = (TokenAuthentication,)
	permission_classes = (permissions.UpdateOwnProfile,)

	# filter_backends = (filters.SearchFilter,)
	# search_fields = ('name', 'email',)

	def get(self, request):

		users = models.UserProfile.objects.all()
		serializer = self.serializer_class(users, many = True)
		return Response(serializer.data)

	def post(self, request):

		serializer = self.serializer_class(data = request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status = status.HTTP_201_CREATED)
		return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)


class UserProfileDetail(APIView):
	"""docstring for UserProfileDetail."""

	serializer_class = serializers.UserProfileSerializer
	authentication_classes = (TokenAuthentication,)
	permission_classes = (permissions.UpdateOwnProfile,)
	filter_backends = (filters.SearchFilter,)
	search_fields = ('name', 'email',)

	def get_user(self, id):
		try:
			return models.UserProfile.objects.get(id=id)
		except models.UserProfile.DoesNotExist:
			return HttpResponse(status = status.HTTP_404_NOT_FOUND)

	def get(self, request, id):

		user = self.get_user(id)
		serializer = self.serializer_class(user)
		return Response(serializer.data)

	def put(self, request, id):

		user = self.get_user(id)
		serializer = self.serializer_class(data = request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)


class UserLoginApiView(ObtainAuthToken):

    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES
