# Generated by Django 3.1 on 2021-07-20 10:49

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('project_api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='incident',
            name='declared_at',
            field=models.DateTimeField(default=datetime.datetime.now, verbose_name='end date'),
        ),
        migrations.AlterField(
            model_name='incident',
            name='textual_description',
            field=models.TextField(blank=True, max_length=100, null=True),
        ),
    ]
