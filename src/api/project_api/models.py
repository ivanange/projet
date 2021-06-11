from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.models import BaseUserManager
from django.conf import settings


class UserProfileManager(BaseUserManager):
    """manager for user profiles"""

    def create_user(self, email, name, password=None):
        """create the new user profile"""
        if not email:
            raise ValueError("User most have an email adresse")

        # email = self.normalize_email(email)
        user = self.model(email=email, name=name)

        user.set_password(password)
        user.save(using=self._db)

        return user


    def create_superuser(self, email, name, password):
        """create and save superuser with given detail"""
        user = self.create_user(email, name, password)

        user.is_superuser = True
        user.is_staff = True

        user.save(using=self._db)
        return user



class UserProfile(AbstractBaseUser, PermissionsMixin):
    """database for user in the systeme"""
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length = 255, blank = True)
    address = models.CharField(max_length = 255, blank = True)
    avatar = models.CharField(max_length = 255, blank = True)
    settings = models.CharField(max_length = 255, blank = True)
    verified_at = models.DateTimeField("date verified", blank = True, null = True)
    created_at = models.DateTimeField("date created", blank = True , null = True)
    updated_at = models.DateTimeField("date uplated", blank = True, null = True)
    deleted_at = models.DateTimeField("date deleted", blank = True, null = True)
    confidence = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserProfileManager()

    USERNAME_FIELD = 'email'

    REQUIRED_FIELDS = ['name']

    def get_full_name(self):
        """retrieve the full name of the user"""
        return self.name

    def get_short_name(self):
        """retrieve the short name of the user"""
        return self.name

    def __str__(self):
        """ str speciel methode of UserProfile """
        return self.email