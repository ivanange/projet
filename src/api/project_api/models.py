from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.models import BaseUserManager
from django.conf import settings


class UserProfileManager(BaseUserManager):
    """manager for user profiles"""

    def create_user(self, email, name, phone, password=None):
        """create the new user profile"""
        if not phone:
            raise ValueError("User most have an email adresse")

        # email = self.normalize_email(email)
        user = self.model(email=email, name=name, phone = phone)

        user.set_password(password)
        user.save(using=self._db)

        return user


    def create_superuser(self, email, name,  phone, password):
        """create and save superuser with given detail"""
        user = self.create_user(email, name, phone, password)

        user.is_superuser = True
        user.is_staff = True

        user.save(using=self._db)
        return user



class UserProfile(AbstractBaseUser, PermissionsMixin, object):

    """database for user in the systeme"""

    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length = 255, unique=True)
    address = models.CharField(max_length = 255, blank = True)
    avatar = models.CharField(max_length = 255, blank = True)
    # settings = models.CharField(max_length = 255, blank = True)
    settings = models.JSONField(null=True)
    verified_at = models.DateTimeField("date verified", blank = True, null = True)
    created_at = models.DateTimeField("date created", blank = True , null = True)
    updated_at = models.DateTimeField("date uplated", blank = True, null = True)
    deleted_at = models.DateTimeField("date deleted", blank = True, null = True)
    confidence = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserProfileManager()

    USERNAME_FIELD = 'phone'

    REQUIRED_FIELDS = ['name', 'email']

    def get_full_name(self):
        """retrieve the full name of the user"""
        return self.name

    def get_short_name(self):
        """retrieve the short name of the user"""
        return self.name

    def __str__(self):
        """ str special methode of UserProfile """
        return self.email



# class place(models.Model):
#
#     """docstring forplace."""
#
#     address = models.CharField(max_length = 255, blank = True)
#     city = models.CharField(max_length = 255, blank = True)
#     country = models.CharField(max_length = 255, blank = True)
#     quarter = models.CharField(max_length = 255, blank = True)
#     longitude = models.CharField(max_length = 255, blank = True)
#     latitude = models.CharField(max_length = 255, blank = True)
#     region = models.CharField(max_length = 255, blank = True)


class Category(models.Model):

    """docstring forCategory."""
    by_admin = models.ForeignKey(settings.AUTH_USER_MODEL, models.CASCADE)
    name = models.CharField(max_length = 20)
    description = models.CharField(max_length = 100)



class Incident(models.Model):

    """docstring for Incident"""

    title = models.CharField(max_length=255)
    location = models.JSONField(null=True)
    # location = models.ForeignKey(place, models.SET_NULL, blank=True,null=True)
    date = models.DateTimeField("creation date", blank = True, null = True)
    category = models.ForeignKey(Category, models.SET_NULL, blank = True, null = True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, models.CASCADE)
    confirms = models.ManyToManyField(settings.AUTH_USER_MODEL,
        related_name= "user_confirms",
        through='ConfirmOrInfirm',
        through_fields=('incident', 'person'),
        )
    textual_description = models.CharField(max_length = 100, blank = True, null = True)
    # video = models.FileField(upload_to='videos/%Y/%m/%d', blank=True,null=True)
    video = models.JSONField(null=True)
    audio = models.JSONField(null=True)
    image = models.JSONField(null=True)
    confidence = models.IntegerField(default = 0)

    def __str__(self):
        return self.title


class ConfirmOrInfirm(models.Model):

    """docstring for ConfirmOrInfirm."""

    class Decision(models.TextChoices):
        """docstring for Decision ."""
        DEFAULT = ('DFT',"RAS")
        CONFIRM = ('CNF',"Confirm")
        INFIRM = ("INF", "Infirm")


    incident = models.ForeignKey(Incident, on_delete=models.CASCADE)
    person = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    decision = models.CharField(max_length = 3,
                                choices = Decision.choices ,
                                default = Decision.DEFAULT)
    created_at = models.DateTimeField("date created", blank = True , null = True)
    updated_at = models.DateTimeField("date uplated", blank = True, null = True)
    deleted_at = models.DateTimeField("date deleted", blank = True, null = True)

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
