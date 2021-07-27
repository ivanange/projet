from django.contrib.auth.models import Group
from django.db.models import query
from django.db.models.aggregates import Count
from django.http.response import HttpResponseBadRequest
from django.shortcuts import render
from django.views.generic.base import View
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets, filters
from rest_framework import generics
from rest_framework.parsers import FileUploadParser, JSONParser
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import action
from rest_framework.permissions import (
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly,
    DjangoModelPermissions,
)
from rest_framework.settings import api_settings
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.pagination import PageNumberPagination
import django_filters.rest_framework
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer

from project_api import serializers
from project_api import models
from project_api import permissions
from datetime import date, datetime
from datetime import timedelta
from django.conf import settings
import json

# from project_api.serializers import FileSerializer


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 1000


class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        token, created = Token.objects.get_or_create(user=user)
        return Response({"token": token.key, "user_id": user.pk, "phone": user.phone})


class Logout(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def delete(self, request, format=None):
        # simply delete the token to force a login
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)


class UserProfileViewSet(viewsets.ModelViewSet):
    """Handle creating and updating user profile"""

    parser_class = (FileUploadParser,)
    serializer_class = serializers.UserProfileSerializer
    queryset = models.UserProfile.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.UpdateOwnProfile,)
    # filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    # search_fields = ('name', 'email',)
    filterset_fields = ("name",)


class ChangePasswordView(generics.UpdateAPIView):
    """
    An endpoint for changing password.
    """

    serializer_class = serializers.ChangePasswordSerializer
    model = models.UserProfile
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response(
                    {"old_password": ["Wrong password."]},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                "status": "success",
                "code": status.HTTP_200_OK,
                "message": "Password updated successfully",
                "data": [],
            }

            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class IncidentViewSet(viewsets.ModelViewSet):

    parser_class = (FileUploadParser,)
    authentication_classes = (TokenAuthentication,)
    serializer_class = serializers.IncidentSerializer
    queryset = models.Incident.objects.all()
    # commenter la ligne suivante si jamais in veut enlever la pagination et vvç
    pagination_class = StandardResultsSetPagination
    permission_classes = (
        permissions.UpdateOWnStatus,
        IsAuthenticatedOrReadOnly,
    )

    filterset_fields = ("category__name", "title")

    def create(self, request, *args, **kwargs):
        requestData = request.data.copy()

        for key in ["audios", "images", "videos"]:
            data = []
            for file in request.FILES.getlist(key):
                url = key + "/" + file.name
                with open(settings.MEDIA_ROOT + "/" + url, "wb+") as destination:
                    for chunk in file.chunks():
                        destination.write(chunk)
                data.append(request.build_absolute_uri(settings.MEDIA_URL + url))
            requestData[key] = json.dumps(data)

        requestData["user"] = request.user.id
        serializer = self.get_serializer(data=requestData)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )
        # return super().create(request, *args, **kwargs)

    # =================test================
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

    def create(self, request, *args, **kwargs):

        print(request.data)
        id_incident = request.data["incident"]
        print(request.user.name)
        decision = request.data["decision"]
        incident = models.Incident.objects.get(id=id_incident)
        print(incident.title)
        if decision == "CNF":
            incident.confidence = incident.confidence + request.user.confidence
            incident.save()
        if decision == "INF":
            incident.confidence = incident.confidence - request.user.confidence
            if incident.confidence < 0:
                incident.confidence = 0
            incident.save()
        return super().create(request, *args, **kwargs)

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
    permission_classes = (DjangoModelPermissions,)
    filterset_fields = ("name",)

    def perform_create(self, serializer):
        """Sets the user profile to the logged in user"""

        serializer.save(by_admin=self.request.user)


class UserProfileDetail(APIView):
    """docstring for UserProfileDetail."""

    serializer_class = serializers.UserProfileDetailSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    # filter_backends = (filters.SearchFilter,)
    # search_fields = ('name', 'email',)

    def get_user(self, id):
        try:
            return models.UserProfile.objects.get(id=id)
        except models.UserProfile.DoesNotExist:
            return HttpResponseBadRequest(status=status.HTTP_404_NOT_FOUND)

    def get(
        self,
        request,
    ):
        user = vars(self.get_user(request.user.id))
        user.pop("_state")
        user.pop("password")

        # print("user: ", user)
        # total
        user["total_declarer"] = models.Incident.objects.filter(user=user["id"]).count()
        user["total_confirmer"] = models.Proposition.objects.filter(
            person=user["id"], decision="CNF"
        ).count()
        user["total_infirmer"] = models.Proposition.objects.filter(
            person=user["id"], decision="INF"
        ).count()

        now = datetime.now()
        last_month = now - timedelta(days=30)
        last = last_month - timedelta(days=30)

        # declarer
        data = {}
        data["valeur"] = models.Incident.objects.filter(
            user=user["id"], declared_at__gt=last_month
        ).count()
        last_data = models.Incident.objects.filter(
            user=user["id"], declared_at__gt=last, declared_at__lt=last_month
        ).count()

        data["tendance"] = (
            ((data["valeur"] - last_data) / data["valeur"]) * 100
            if data["valeur"] > 0
            else 0
        )
        user["declarer"] = data

        # infirmer
        data = {}
        data["valeur"] = models.Proposition.objects.filter(
            person=user["id"], decision="INF", created_at__gt=last_month
        ).count()
        last_data = models.Proposition.objects.filter(
            person=user["id"],
            decision="INF",
            created_at__gt=last,
            created_at__lt=last_month,
        ).count()

        data["tendance"] = (
            ((data["valeur"] - last_data) / data["valeur"]) * 100
            if data["valeur"] > 0
            else 0
        )
        user["infirmer"] = data

        # confirmer
        data = {}
        data["valeur"] = models.Proposition.objects.filter(
            person=user["id"], decision="CNF", created_at__gt=last_month
        ).count()
        last_data = models.Proposition.objects.filter(
            person=user["id"],
            decision="CNF",
            created_at__gt=last,
            created_at__lt=last_month,
        ).count()

        data["tendance"] = (
            ((data["valeur"] - last_data) / data["valeur"]) * 100
            if data["valeur"] > 0
            else 0
        )
        user["confirmer"] = data
        # user["total_declarer_dernier_30d"] = models.Incident.objects.filter(user = user, declared_at__gt = last_month).count()
        # notificationnotif
        data = {}
        notifs_data = []
        notif_user = models.notif.objects.filter(to_user__id=user["id"])
        for notif in notif_user:
            data["message"] = notif.message
            data["sent_at"] = notif.sent_at
            data["receive_at"] = notif.receive_at
            data["from_user"] = notif.from_user.id
            notifs_data.append(data)

        user["notiication"] = notifs_data
        # incident declarées
        incident_data = []
        incident_user = models.Incident.objects.filter(user__id=user["id"])
        serializer = self.serializer_class_2(incident_user, many=True)

        user["incident"] = serializer.data
        return Response(user)


class AnaliticsViews(APIView):
    def get(
        self,
        request,
    ):
        result = []
        dic = {}

        query = list(models.Category.objects.values("id", "name").all())
        if query:
            for i in query:
                dic["name"] = i["name"]
                number = list(
                    models.Incident.objects.values("category")
                    .annotate(number=Count("category"))
                    .filter(category=i["id"])
                )
                dic["number"] = 0 if not number else number[0]["number"]
                result.append(dic.copy())

        data = serializers.AnaliticsSerializer(result, many=True)
        return Response(data.data)

    def post(self, request):

        data = request.data
        dic = {}
        result = []
        number = 0
        if (
            "category" in data.keys()
            and "interval" in data.keys()
            and "zone" in data.keys()
        ):
            # all
            dic["category"] = list(
                models.Category.objects.values("name").filter(pk=data["category"])
            )[0]["name"]
            dic["date_debut"] = datetime.strptime(
                data["interval"]["date_debut"], "%d/%m/%y %H:%M:%S"
            )
            dic["date_fin"] = datetime.strptime(
                data["interval"]["date_fin"], "%d/%m/%y %H:%M:%S"
            )
            for i in data["zone"].keys():
                dic[i] = data["zone"][i]
                lieu = i
            res_q = list(
                models.Incident.objects.values("locations")
                .filter(
                    start_date__gte=datetime.strptime(
                        data["interval"]["date_debut"], "%d/%m/%y %H:%M:%S"
                    )
                )
                .filter(
                    start_date__lte=datetime.strptime(
                        data["interval"]["date_fin"], "%d/%m/%y %H:%M:%S"
                    )
                )
                .filter(category=data["category"])
            )
            for i in res_q:
                i["locations"] = json.loads(
                    i["locations"] if i["locations"] != None else "{}"
                )
                if i["locations"][lieu] == data["zone"][lieu]:
                    number = number + 1
            dic["number"] = number
            return Response(dic)

        if (
            "category" not in data.keys()
            and "interval" not in data.keys()
            and "zone" in data.keys()
        ):
            # zone only
            for i in data["zone"].keys():
                dic[i] = data["zone"][i]
                lieu = i

            res_q = list(
                models.Incident.objects.values("locations", "category").annotate(
                    number=Count("category")
                )
            )
            for i in res_q:
                i["locations"] = json.loads(
                    i["locations"] if i["locations"] != None else "{}"
                )
                if i["locations"][lieu] == data["zone"][lieu]:
                    dic["category"] = list(
                        models.Category.objects.values("name").filter(pk=i["category"])
                    )[0]["name"]
                    print("ddd --------->", type(dic["category"]))
                    dic["number"] = i["number"]
                    result.append(dic.copy())

            print("ddd --------->", dic)

            quer = serializers.FilterSerializer(result, many=True, partial=True)
            return Response(quer.data)

        if (
            "category" not in data.keys()
            and "interval" in data.keys()
            and "zone" in data.keys()
        ):
            # zone and interval
            dic["date_debut"] = datetime.strptime(
                data["interval"]["date_debut"], "%d/%m/%y %H:%M:%S"
            )
            dic["date_fin"] = datetime.strptime(
                data["interval"]["date_fin"], "%d/%m/%y %H:%M:%S"
            )
            for i in data["zone"].keys():
                dic[i] = data["zone"][i]
                lieu = i
            res_q = list(
                models.Incident.objects.values("locations", "category")
                .filter(
                    start_date__gte=datetime.strptime(
                        data["interval"]["date_debut"], "%d/%m/%y %H:%M:%S"
                    )
                )
                .filter(
                    start_date__lte=datetime.strptime(
                        data["interval"]["date_fin"], "%d/%m/%y %H:%M:%S"
                    )
                )
                .annotate(number=Count("category"))
            )
            for i in res_q:
                i["locations"] = json.loads(
                    i["locations"] if i["locations"] != None else "{}"
                )
                if i["locations"][lieu] == data["zone"][lieu]:
                    dic["category"] = list(
                        models.Category.objects.values("name").filter(pk=i["category"])
                    )[0]["name"]
                    print("ddd --------->", type(dic["category"]))
                    dic["number"] = i["number"]
                    result.append(dic.copy())
            quer = serializers.FilterSerializer(result, many=True, partial=True)
            return Response(quer.data)

        if (
            "category" not in data.keys()
            and "interval" in data.keys()
            and "zone" not in data.keys()
        ):
            # interval only
            dic["date_debut"] = datetime.strptime(
                data["interval"]["date_debut"], "%d/%m/%y %H:%M:%S"
            )
            dic["date_fin"] = datetime.strptime(
                data["interval"]["date_fin"], "%d/%m/%y %H:%M:%S"
            )
            res_q = list(
                models.Incident.objects.values("category")
                .filter(
                    start_date__gte=datetime.strptime(
                        data["interval"]["date_debut"], "%d/%m/%y %H:%M:%S"
                    )
                )
                .filter(
                    start_date__lte=datetime.strptime(
                        data["interval"]["date_fin"], "%d/%m/%y %H:%M:%S"
                    )
                )
                .annotate(number=Count("category"))
            )
            for i in res_q:
                dic["category"] = list(
                    models.Category.objects.values("name").filter(pk=i["category"])
                )[0]["name"]
                # print("ddd --------->",type(dic["category"]))
                dic["number"] = i["number"]
                result.append(dic.copy())
            quer = serializers.FilterSerializer(result, many=True, partial=True)
            return Response(quer.data)

        if (
            "category" in data.keys()
            and "interval" not in data.keys()
            and "zone" in data.keys()
        ):
            # category and zone
            dic["category"] = list(
                models.Category.objects.values("name").filter(pk=data["category"])
            )[0]["name"]
            for i in data["zone"].keys():
                dic[i] = data["zone"][i]
                lieu = i
            res_q = list(
                models.Incident.objects.values("locations").filter(
                    category=data["category"]
                )
            )
            for i in res_q:
                i["locations"] = json.loads(
                    i["locations"] if i["locations"] != None else "{}"
                )
                print("teste------------->", i)
                if i["locations"][lieu] == data["zone"][lieu]:
                    number = number + 1
            dic["number"] = number
            return Response(dic)

        if (
            "category" in data.keys()
            and "interval" in data.keys()
            and "zone" not in data.keys()
        ):
            # category and interval
            dic["category"] = list(
                models.Category.objects.values("name").filter(pk=data["category"])
            )[0]["name"]
            dic["date_debut"] = datetime.strptime(
                data["interval"]["date_debut"], "%d/%m/%y %H:%M:%S"
            )
            dic["date_fin"] = datetime.strptime(
                data["interval"]["date_fin"], "%d/%m/%y %H:%M:%S"
            )
            dic["number"] = (
                models.Incident.objects.filter(
                    start_date__gte=datetime.strptime(
                        data["interval"]["date_debut"], "%d/%m/%y %H:%M:%S"
                    )
                )
                .filter(
                    start_date__lte=datetime.strptime(
                        data["interval"]["date_fin"], "%d/%m/%y %H:%M:%S"
                    )
                )
                .filter(category=data["category"])
                .count()
            )
            return Response(dic)

        if (
            "category" in data.keys()
            and "interval" not in data.keys()
            and "zone" not in data.keys()
            and "group" not in data.keys()
        ):
            # category only
            print(
                list(
                    models.Category.objects.values("name").filter(pk=data["category"])
                )[0]["name"]
            )
            dic["category"] = list(
                models.Category.objects.values("name").filter(pk=data["category"])
            )[0]["name"]
            dic["number"] = models.Incident.objects.filter(
                category=data["category"]
            ).count()
            return Response(dic)

        if "group" in data.keys() and "category" not in data.keys():
            dico = {}
            query = list(
                models.Incident.objects.values("category", "locations")
                .annotate(number=Count("category"))
                .all()
            )
            for i in query:
                i["locations"] = json.loads(
                    i["locations"] if i["locations"] != None else "{}"
                )
                # print("locate:", type(i["locations"]))
                if data["group"] in i["locations"].keys():
                    dico[i["locations"][data["group"]]] = []
                # dic["number"] = i["number"]
            print("-----------", query)
            for i in query:
                i["locations"] = json.loads(
                    i["locations"] if i["locations"] != None else "{}"
                )
                number = 0
                if data["group"] in i["locations"].keys():

                    dic["category"] = list(
                        models.Category.objects.values("name").filter(pk=i["category"])
                    )[0]["name"]
                    for j in query:
                        j["locations"] = json.loads(
                            j["locations"] if j["locations"] != None else "{}"
                        )
                        if data["group"] in j["locations"].keys():
                            if (
                                j["locations"][data["group"]]
                                == i["locations"][data["group"]]
                                and i["category"] == j["category"]
                            ):
                                number = number + 1
                        else:
                            continue

                    dic["number"] = number
                    dico[i["locations"][data["group"]]].append(dic.copy())
                else:
                    continue

            # quer =serializers.FilterSerializer(result,many =True,partial=True)
            return Response(dico)

        if "group" in data.keys() and "category" in data.keys():
            dico = {}
            query = list(
                models.Incident.objects.values("category", "locations").filter(
                    category=data["category"]
                )
            )
            for i in query:

                i["locations"] = json.loads(
                    i["locations"] if i["locations"] != None else "{}"
                )
                number = 0
                if data["group"] in i["locations"].keys():

                    dic["category"] = list(
                        models.Category.objects.values("name").filter(pk=i["category"])
                    )[0]["name"]
                    for j in query:
                        j["locations"] = json.loads(
                            j["locations"] if j["locations"] != None else "{}"
                        )
                        if data["group"] in j["locations"].keys():
                            if (
                                j["locations"][data["group"]]
                                == i["locations"][data["group"]]
                                and i["category"] == j["category"]
                            ):
                                number = number + 1
                        else:
                            continue

                    dic["number"] = number
                    dico[i["locations"][data["group"]]].append(dic.copy())
                else:
                    continue
            return Response(dico)

    def report_by_region(self, request):
        if request.method == "POST":
            data = request.data

            dic = {}
            result = []
            # dic["category"] = list(models.Category.objects.values("name").filter(pk=data['category']))[0]["name"]
            # dic["ville"] = models.Incident.objects.filter(location__region = data)
            if "data_debut" in data.keys() and "data_fin" in data.keys():
                dic["date_debut"] = data.date_debut
                dic["date_fin"] = data.date_fin
                query = list(
                    models.Incident.objects.values("category")
                    .annotate(number=Count("category"))
                    .filter(start_date__lte=data.date_debut)
                    .filter(start_date__gte=data.date_fin)
                    .filter(location__region=data["region"])
                )
            else:
                query = list(
                    models.Incident.objects.values("category")
                    .annotate(number=Count("category"))
                    .filter(category=data["category"])
                    .filter(location__region=data["region"])
                )
            for i in query:
                dic["category"] = list(
                    models.Category.objects.values("name").filter(pk=i[0]["category"])
                )[0]["name"]
                dic["number"] = i[1]["number"]
            result.append(dic.copy())

        return Response(serializers.FilterSerializer(result, many=True))


class FilterAnalyse(APIView):
    def get(
        self,
        request,
    ):
        result = []
        dic = {}

        query = list(models.Category.objects.values("id", "name").all())
        if query:
            for i in query:
                dic["name"] = i["name"]
                number = list(
                    models.Incident.objects.values("category")
                    .annotate(number=Count("category"))
                    .filter(category=i["id"])
                )
                dic["number"] = 0 if not number else number[0]["number"]
                result.append(dic.copy())

        data = serializers.AnaliticsSerializer(result, many=True)
        return Response(data.data)

    def post(self, request):

        data = request.data
        dic = {}
        result = []
        start = datetime.strptime(data["interval"]["date_debut"], "%d/%m/%y %H:%M:%S")
        final_end = datetime.strptime(data["interval"]["date_fin"], "%d/%m/%y %H:%M:%S")
        dic["category"] = data["category"]
        if data["period"] == "week":
            max = 7
            while start < final_end:

                dic["date_debut"] = start
                end = dic["date_fin"] = start + timedelta(days=max)
                dic["number"] = (
                    models.Incident.objects.values("category")
                    .filter(start_date__gte=start)
                    .filter(start_date__lte=end)
                    .filter(category=data["category"])
                    .count()
                )
                result.append(dic.copy())
                start = end

            query = serializers.TendanceSerializer(result, many=True)
            return Response(query.data)


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
