# Generated by Django 5.0.4 on 2024-08-11 09:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_otp'),
    ]

    operations = [
        migrations.AlterField(
            model_name='otp',
            name='otp',
            field=models.CharField(blank=True, max_length=5, null=True),
        ),
    ]
