# Generated by Django 5.0.4 on 2024-08-03 16:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_alter_customuser_pfp'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='pfp',
            field=models.ImageField(blank=True, default='/images/pfps/default.png', null=True, upload_to='pfps'),
        ),
    ]
