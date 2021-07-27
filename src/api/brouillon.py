# remettre à zero la base de donné
# find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
# find . -path "*/migrations/*.pyc"  -delete
# rm db.sqlite3
# python manage.py makemigrations
# python manage.py migrate

# python manage.py flush

# https://codesource.io/django-rest-api-documentation-with-swagger-ui/



# from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
# BASE_DIR = Path(__file__).resolve(strict=True).parent.parent.parent
#
# print(BASE_DIR)


# https://www.freecodecamp.org/news/learn-mongodb-a4ce205e7739/

# https://stackoverflow.com/questions/58742948/rest-framework-swagger-autoschema-object-has-no-attribute-get-link


*Permissions pour notif
*Permissions pour proposition
*Permissions pour incident
*Gestion des proposition (mise à jour confiance etc ...)
*Migration initiale
*REVIEW
*websocket pour Notifications
* category required in Incident
* post Proposition
*



UserProfile.objects.filter(id=1) # queryset of object
user = UserProfile.objects.get(id=1) # just one object
Incident.objects.filter(user = user).count() # le nombre d'incidents declaré par un user
Proposition.objects.filter(person=user, decision="CNF").count()
