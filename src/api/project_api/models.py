from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.models import BaseUserManager
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.conf import settings
from django.db.models.base import Model
from datetime import datetime
from jsonfield import JSONField

class UserProfileManager(BaseUserManager):
    """manager for user profiles"""

    def create_user(self, name, email ,phone, password=None, avatar=None ):
        """create the new user profile"""
        if not phone:
            raise ValueError("User most have an phone adresse")

        email = self.normalize_email(email)
        user = self.model( name=name,  email = email, phone = phone,  avatar = avatar)

        user.set_password(password)
        user.save(using=self._db)

        return user


    def create_superuser(self, name, email, phone  ,password=None, avatar=None ):
        """create and save superuser with given detail"""
        user = self.create_user( name, email, phone, password, avatar)

        user.is_superuser = True
        user.is_staff = True

        user.save(using=self._db)
        return user



class UserProfile(AbstractBaseUser, PermissionsMixin, models.Model):

    """database for user in the systeme"""

    email = models.EmailField("email" , max_length=254, blank = True, null = True, unique=True)
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length = 255, unique=True)
    address = models.CharField(max_length = 255, blank = True)
    # avatar = models.CharField(max_length = 255, blank = True)
    avatar = models.FileField(upload_to='images/%Y/%m/%d', blank=True, null=True)
    # settings = models.CharField(max_length = 255, blank = True)
    settings = JSONField(null=True, blank=True)
    verified_at = models.DateTimeField("date verified", blank = True, null = True)
    created_at = models.DateTimeField("date created", blank = True , null = True)
    updated_at = models.DateTimeField("date uplated", blank = True, null = True)
    deleted_at = models.DateTimeField("date deleted", blank = True, null = True)
    confidence = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserProfileManager()

    USERNAME_FIELD = 'phone'

    REQUIRED_FIELDS = ['name']

    # def save(self, *args, **kwargs):
    #
    #     if self.email != "": # If it's not blank
    #         if not validate_email(self.email): # If it's not an email address
    #             raise ValidationError(u'%s is not an email address, dummy!' % self.email)
    #         if UserProfile.objects.filter(email = self.email): # If it already exists
    #             raise ValidationError(u'%s already exists in database, jerk' % self.email)
    #     super(UserProfile, self).save(*args, **kwargs)

    def get_full_name(self):
        """retrieve the full name of the user"""
        return self.name

    def get_short_name(self):
        """retrieve the short name of the user"""
        return self.name

    def __str__(self):
        """ str special methode of UserProfile """
        return self.phone



"""class place(models.Model):

     docstring forplace.

     address = models.CharField(max_length = 255, blank = True)
     city = models.CharField(max_length = 255, blank = True)
     country = models.CharField(max_length = 255, blank = True)
     quarter = models.CharField(max_length = 255, blank = True)
     longitude = models.CharField(max_length = 255, blank = True)
     latitude = models.CharField(max_length = 255, blank = True)
     region = models.CharField(max_length = 255, blank = True)
"""

class Category(models.Model):

    """docstring forCategory."""
    by_admin = models.ForeignKey(settings.AUTH_USER_MODEL, models.CASCADE)
    name = models.CharField(max_length = 20)
    description = models.CharField(max_length = 100)

    def __str__(self):
        return self.name

class Incident(models.Model):

    """docstring for Incident"""

    title = models.CharField(max_length=255)
<<<<<<< HEAD
    locations = models.JSONField(null=True, blank = True)
    #place = models.ForeignKey(place, models.SET_NULL, blank=True,null=True)
=======
    locations = JSONField(null=True, blank = True)
    # location = models.ForeignKey(place, models.SET_NULL, blank=True,null=True)
>>>>>>> 0fee100b1b1f03ab723a0d36eab62f8d7d702543
    start_date = models.DateTimeField("start date", blank = True, null = True)
    end_date = models.DateTimeField("end date", blank = True, null = True)
    declared_at = models.DateTimeField("declared at", default=datetime.now)
    category = models.ForeignKey(Category, models.SET_NULL, blank = True, null = True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, models.CASCADE)
    confirms = models.ManyToManyField(settings.AUTH_USER_MODEL,
        related_name= "user_confirms",
        through='Proposition',
        through_fields=('incident', 'person'),
        )
    textual_description = models.TextField(max_length = 100, blank = True, null = True)
    video = models.FileField(upload_to='videos/%Y/%m/%d', blank=True,null=True)
    audio = models.FileField(upload_to='audio/%Y/%m/%d', blank=True,null=True)
    image = models.FileField(upload_to='images/%Y/%m/%d', blank=True,null=True)
    confidence = models.IntegerField(default = 0)

    def __str__(self):
        return self.title




class Proposition(models.Model):

    """docstring for Proposition."""

    class Decision(models.TextChoices):
        """docstring for Decision ."""
        DEFAULT = ('DFT',"RAS")
        CONFIRM = ('CNF',"Confirm")
        INFIRM = ("INF", "Infirm")


    incident = models.ForeignKey(Incident, models.SET_NULL, null=True ,blank=True)
    person = models.ForeignKey  (settings.AUTH_USER_MODEL, on_delete=models.CASCADE , null=True , blank=True)
    decision = models.CharField(max_length = 3,
                                choices = Decision.choices ,
                                default = Decision.DEFAULT)
    created_at = models.DateTimeField("date created", blank = True , null = True)
    updated_at = models.DateTimeField("date uplated", blank = True, null = True)
    deleted_at = models.DateTimeField("date deleted", blank = True, null = True)

    def __str__(self):
        return self.incident.title

class notif(models.Model):
	"""docstring for Notifications."""

	message = models.TextField()
	sent_at = models.DateTimeField("sent date", blank = True , null = True)
	receive_at = models.DateTimeField("receive date", blank = True , null = True)
	to_user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,
								related_name= "to_user")
	from_user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,
								related_name= "from_user")
	def __str__(self):
		return str(self.message)
