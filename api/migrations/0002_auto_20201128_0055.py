# Generated by Django 2.2.13 on 2020-11-28 08:55

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Planned_transit',
            new_name='PlannedTransit',
        ),
        migrations.RenameModel(
            old_name='Transit_dump',
            new_name='TransitDump',
        ),
    ]
