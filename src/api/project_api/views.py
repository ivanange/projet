from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets, filters

from project_api import serializers
from project_api import models



class UserProfileAPIView(APIView):
	"""docstring forUserProfileApiView."""

	serializer_class = serializers.UserProfileSerializer

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


# Create your views here.
