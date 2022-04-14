from rest_framework import serializers
from django.contrib.auth.models import User
from .models import TransitDump, PlannedTransit

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ("id", "password", "username", "email", "date_joined")


class TransitDumpSerializer(serializers.ModelSerializer):

    class Meta:
        model = TransitDump
        fields = '__all__'


class UpcomingTransitSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = PlannedTransit
        fields = ("id", "user", "transit", "identifier")
