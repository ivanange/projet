# Generated by Django 3.1 on 2021-07-25 13:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('project_api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='description',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
