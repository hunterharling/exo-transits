from django.contrib import admin
from .models import (
    TransitDump,
    PlannedTransit,
    UserProfile
)
# Register your models here.

admin.site.register(TransitDump)
admin.site.register(PlannedTransit)
admin.site.register(UserProfile)
