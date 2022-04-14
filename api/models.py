from django.db import models 
from django.contrib.auth.models import User

# Create your models here.
class TransitDump(models.Model):
    date = models.DateField(auto_now=True)
    lat = models.TextField(default='')
    lng = models.TextField(default='')
    dump = models.TextField(verbose_name="JSON", blank=True)
    
    def __str__(self):
        return self.lng


class PlannedTransit(models.Model):
    user = models.ForeignKey(
        User,
        related_name="pt_user",
        on_delete=models.CASCADE
    )
    date = models.DateField(auto_now=True)
    transit = models.TextField(default='')
    identifier = models.TextField(default='')
    active = models.BooleanField(default=True)


class UserProfile(models.Model):
    user = models.OneToOneField(
        User,
        related_name="user_profile",
        on_delete=models.CASCADE
    )
    lat = models.FloatField(default=32.72)
    lng = models.FloatField(default=-117.16)
    temp_token = models.TextField(default="")
    alert_status = models.BooleanField(default=False)
