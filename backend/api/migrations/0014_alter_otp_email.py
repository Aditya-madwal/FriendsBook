# Generated by Django 5.0.4 on 2024-08-11 09:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_alter_otp_otp'),
    ]

    operations = [
        migrations.AlterField(
            model_name='otp',
            name='email',
            field=models.EmailField(max_length=254, unique=True),
        ),
    ]
