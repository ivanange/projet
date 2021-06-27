# remettre à zero la base de donné
# find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
# find . -path "*/migrations/*.pyc"  -delete
# rm db.sqlite3
# python manage.py makemigrations
# python manage.py migrate

# python manage.py flush



# from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
# BASE_DIR = Path(__file__).resolve(strict=True).parent.parent.parent
#
# print(BASE_DIR)
