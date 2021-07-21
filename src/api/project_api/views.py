from django.db.models.aggregates import Count
from django.db.models.query import QuerySet
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets, filters
from rest_framework.parsers import FileUploadParser , JSONParser
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly, DjangoModelPermissions
from rest_framework.settings import api_settings
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
import django_filters.rest_framework

from project_api import serializers
from project_api import models
from project_api import permissions
from datetime import datetime
from datetime import timedelta


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
            'phone': user.phone
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

        serializer.save(user=self.request.user)



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

        serializer.save(person=self.request.user)


class NotifViewSet(viewsets.ModelViewSet):

    authentication_classes = (TokenAuthentication,)
    serializer_class = serializers.NotifSerializer
    # queryset = models.notif.objects.filter(receive_at=request.user)
    permission_classes = (
        permissions.UpdateOnlyAdmin,
        IsAuthenticatedOrReadOnly,
serializers.DateField()
    )

    def get_queryset(self):
        """
        Filter objects so a user only sees his own stuff.
        If user is admin, let him see all.
        """
        if self.request.user.is_staff:
            return models.notif.objects.all()
        else:
            user = self.request.user
            return models.notif.objects.filter(to_user=user)

    def perform_create(self, serializer):
        """Sets the user profile to the logged in user"""

        serializer.save(from_user=self.request.user)


class CategoryViewSet(viewsets.ModelViewSet):

    authentication_classes = (TokenAuthentication,)
    serializer_class = serializers.CategorySerializer
    queryset = models.Category.objects.all()
    permission_classes = (DjangoModelPermissions,

                          )

    def perform_create(self, serializer):
        """Sets the user profile to the logged in user"""

        serializer.save(by_admin=self.request.user)


class UserProfileDetail(APIView):
    """docstring for UserProfileDetail."""

    serializer_class = serializers.UserProfileDetailSerializer
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (DjangoModelPermissions,)
    # filter_backends = (filters.SearchFilter,)
    # search_fields = ('name', 'email',)

    def get_user(self, id):
        try:
            return models.UserProfile.objects.get(id=id)
        except models.UserProfile.DoesNotExist:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, id):
        dict = {}
        user = self.get_user(id)
        dict["phone"] = user.phone
        dict["name"] = user.name
        dict["email"] = user.email
        dict["total_declarer"] = models.Incident.objects.filter(
            user=user).count()
        dict["total_confirmer"] = models.Proposition.objects.filter(
            person=user, decision="CNF").count()
        dict["total_infirmer"] = models.Proposition.objects.filter(
            person=user, decision="INF").count()
        now = datetime.now()
        last_month = now - timedelta(days=30)
        data = {}
        data["valeur"] = models.Incident.objects.filter(
            user=user, declared_at__gt=last_month).count()
        last = last_month - timedelta(days=30)
        last_data = models.Incident.objects.filter(
            user=user, declared_at__gt=last, declared_at__lt=last_month).count()
        data["tendance"] = ((data["valeur"] - last_data)/data["valeur"])*100
        dict["declarer"] = data
        # dict["total_declarer_dernier_30d"] = models.Incident.objects.filter(user = user, declared_at__gt = last_month).count()
        return Response(dict)







class  AnaliticsViews(viewsets.ModelViewSet):

    def general_report(self):
        queryset =  models.Category.objects.values('name').annotate(dcount =Count('name')).order_by()
        return Response(queryset)

    def specific_report(self,request):
        

        if request.method == 'POST':
            data = JSONParser().parse(request)
            ser =  serializers.AnaliticsSerializer(data)
            queryset = models.Category.objects.filter(name=ser.category,start_date__lte = ser.date_debut, end_date__gte = ser.date_fin).order_by('name')
            return reponse(queryset)




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
        serializer = self.serializer_class(users, many=True)
        return Response(serializer.data)

    def post(self, request):

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class UserProfileDetail(APIView):
# 	"""docstring for UserProfileDetail."""
#
# 	serializer_class = serializers.UserProfileSerializer
# 	authentication_classes = (TokenAuthentication,)
# 	permission_classes = (permissions.UpdateOwnProfile,)
# 	filter_backends = (filters.SearchFilter,)
# 	search_fields = ('name', 'email',)
#
# 	def get_user(self, id):
# 		try:
# 			return models.UserProfile.objects.get(id=id)
# 		except models.UserProfile.DoesNotExist:
# 			return HttpResponse(status = status.HTTP_404_NOT_FOUND)
#
# 	def get(self, request, id):
#
# 		user = self.get_user(id)
# 		serializer = self.serializer_class(user)
# 		return Response(serializer.data)
#
# 	def put(self, request, id):
#
# 		user = self.get_user(id)
# 		serializer = self.serializer_class(data = request.data)
# 		if serializer.is_valid():
# 			serializer.save()
# 			return Response(serializer.data)
# 		return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
#

class UserLoginApiView(ObtainAuthToken):

    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES
