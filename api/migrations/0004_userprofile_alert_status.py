# Generated by Django 3.0.7 on 2021-09-20 10:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_userprofile_temp_token'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='alert_status',
            field=models.BooleanField(default=False),
        ),
    ]
