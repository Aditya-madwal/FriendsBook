# Generated by Django 5.0.4 on 2024-08-02 21:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_like_uid'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='friendrequest',
            name='accepted_on',
        ),
        migrations.RemoveField(
            model_name='like',
            name='uid',
        ),
    ]
