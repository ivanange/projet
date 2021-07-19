from django.contrib import admin
from project_api import models


admin.site.register(models.UserProfile)

admin.site.register(models.Incident)

admin.site.register(models.Category)

admin.site.register(models.Proposition)

admin.site.register(models.notif)
