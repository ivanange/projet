from rest_framework import serializers

from project_api import models


class UserProfileDetailSerializer(serializers.Serializer):
    """Serializer the user profile object"""


class UserProfileSerializer(serializers.ModelSerializer):
    """Serializer the user profile object"""

    class Meta:

        model = models.UserProfile
        fields = '__all__'
        extra_kwargs = {
            'password': {
                'write_only': True,
                'style': {
                    'input_type': 'password'
                }
            }
        }

    def create(self, validated_data):
        """create the return new user"""

        user = models.UserProfile.objects.create_user(
            email=validated_data['email'] if 'email' in validated_data else None,
            name=validated_data['name'],
            password=validated_data['password'],
            phone=validated_data['phone'],
            avatar=validated_data['avatar'] if 'avatar' in validated_data else None,
        )

        return user


class IncidentSerializer(serializers.ModelSerializer):
    """Serializes Incident"""

    class Meta:
        model = models.Incident
        fields = '__all__'
        extra_kwargs = {
            'user': {
                'read_only': True
            }
        }


class PropositionSerializer(serializers.ModelSerializer):
    """Serializes Incident"""

    class Meta:
        model = models.Proposition
        fields = '__all__'
        extra_kwargs = {
            'person': {
                'read_only': True
            },

        }


class NotifSerializer(serializers.ModelSerializer):
    """Serializes Incident"""

    class Meta:
        model = models.notif
        fields = '__all__'
        extra_kwargs = {
            'from_user': {
                'read_only': True
            },

        }


class CategorySerializer(serializers.ModelSerializer):
    """Serializes Incident"""

    class Meta:
        model = models.Category
        fields = '__all__'
        extra_kwargs = {
            'by_admin': {
                'read_only': True
            },

        }
