# Generated by Django 2.1.2 on 2019-06-29 20:09

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('review', '0003_auto_20190629_1821'),
    ]

    operations = [
        migrations.AlterField(
            model_name='review',
            name='price',
            field=models.FloatField(default=0.0, validators=[django.core.validators.MinValueValidator(0)]),
        ),
    ]
