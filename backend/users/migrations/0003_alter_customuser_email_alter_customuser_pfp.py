# Generated by Django 5.0.4 on 2024-08-01 08:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_customuser_created_at_customuser_verified_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='email',
            field=models.EmailField(max_length=254, unique=True),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='pfp',
            field=models.ImageField(blank=True, default='', null=True, upload_to='pfps'),
        ),
    ]
