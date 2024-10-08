# Generated by Django 5.0.4 on 2024-07-28 18:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AddField(
            model_name='customuser',
            name='verified',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='pfp',
            field=models.ImageField(blank=True, default='', null=True, upload_to='images/pfps'),
        ),
    ]
