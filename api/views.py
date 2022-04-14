# API imports
from .serializers import (
    UserSerializer,
    TransitDumpSerializer,
    UpcomingTransitSerializer
)
from .models import (
    TransitDump,
    PlannedTransit,
    UserProfile
)

# Django imports
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.middleware.csrf import get_token
from django.http import response, HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone
from django.utils.timezone import activate
from django.utils.html import strip_tags
import pytz

# Rest imports
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    DestroyAPIView,
    UpdateAPIView,
    RetrieveUpdateDestroyAPIView
)
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny

# Scraping imports
from bs4 import BeautifulSoup
import subprocess
import random
import string
import json
from datetime import (
    datetime,
    timedelta,
    date
)
import csv
import requests

# Utils
from .utils import (
    transit_date,
    process_csv,
    process_db_transit,
    SITE_URL,
    SITE_LOGO
)

# Random key generator
letters = string.ascii_letters

# scraping header
HEADER = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36"
}


''' API views '''

@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def user_data(request):
    user = request.user

    # Get or create user profile
    try:
        userprofile = UserProfile.objects.get(user=user)
    except UserProfile.DoesNotExist:
        userprofile = UserProfile.objects.create(user=user)

    return Response({
        'username': user.username,
        'email': user.email,
        'lat': userprofile.lat,
        'lng': userprofile.lng,
        'alertStatus': userprofile.alert_status
    })


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def update_userprofile(request):
    user = request.user
    user_profile = UserProfile.objects.get(user=user)

    lat = request.data["lat"]
    lng = request.data["lng"]
    alert_status = request.data["alertStatus"]

    user.email = request.data["email"]
    user_profile.lat = lat
    user_profile.lng = lng
    user_profile.alert_status = alert_status

    user.save()
    user_profile.save()

    return Response({
        "message": "success",
        "user": {
            "username": user.username,
            "email": user.email,
            "lat": user_profile.lat,
            "lng": user_profile.lng,
            'alertStatus': user_profile.alert_status
        }
    })


def jwt_response_payload_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': UserSerializer(user, context={'request': request}).data
    }


def get_csrf(request):
    return HttpResponse(get_token(request))


''' Upcoming transit objects '''


class PTransitList(ListAPIView):
    queryset = PlannedTransit.objects.filter(active=True)
    serializer_class = UpcomingTransitSerializer
    permission_classes = (IsAuthenticated, )


class PTransitCreate(CreateAPIView):
    queryset = PlannedTransit.objects.all()
    serializer_class = UpcomingTransitSerializer
    permission_classes = (AllowAny, )

    def perform_create(self, serializer):
        existing_transits = PlannedTransit.objects.filter(
            transit=self.request.data['transit']
        )
        l = len(existing_transits)

        if l == 0:
            serializer.save(user=self.request.user)


class PTransitUpdate(UpdateAPIView):
    queryset = PlannedTransit.objects.all()
    serializer_class = UpcomingTransitSerializer
    permission_classes = (IsAuthenticated, )


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def delete_transit_planner(request):
    objs = PlannedTransit.objects.filter(
        identifier=request.data['identifier']
    )
    if len(objs) > 0:
        objs[0].active = False
        objs[0].save()
        return Response({"message": "success"})

    return Response({"message": "fail"})


@api_view(['POST'])
def star_data(request):
    name = request.data["name"]
    url = f"http://simbad.u-strasbg.fr/simbad/sim-id?mescat.distance=on&mescat.velocities=on&Ident={name}&Name={name}&submit=display+selected+measurements#lab_meas"

    page = requests.get(url)
    soup = BeautifulSoup(page.content, "html.parser")
    data = {
        "name": name
    }

    # gets distance in parsec (3.26156 ly)
    try:
        distance = str(soup.select("pre")[0]) \
            .split("|")[6] \
                .split(" ")[2]
    except IndexError:
        distance = "N/A"

    # grab radial velocity
    try:
        r_velocity = str(soup.select("tt")[13].getText()) \
            .split(")")[1] \
                .split("/")[0] \
                    .split("[")[0]
    except IndexError:
        r_velocity = "N/A"

    # grab spectral type
    try:
        if "spectral type" in str(page.content):
            spec = str(soup.select("tt")[16].getText()) \
                .split("""\n""")[1]
        else:
            spec = "N/A"
    except IndexError:
        spec = "N/A"

    # for empty errors
    if not spec:
        spec = "N/A"
    if not distance:
        distance = "N/A"

    # grab chidren objects
    try:
        children = str(soup.find(id="children").attrs["value"])
    except AttributeError:
        children = "N/A"

    data["distance"] = distance
    data["r_vel"] = r_velocity
    data["spec"] = spec
    data["children"] = children

    return Response({"star": data})


''' Scraper '''

@api_view(['POST'])
@permission_classes((AllowAny,))
def scrape_data(request):
    DAYS = '1'

    try:
        LAT = request.data["lat"]
        LNG = request.data["lng"]
    except KeyError:
        LAT = '33.36'
        LNG = '116.87'

    testurl = f"https://astro.swarthmore.edu/transits/print_transits.cgi?single_object=0&ra=&dec=&epoch=&period=&duration=&depth=&target=&observatory_string=Specified_Lat_Long&use_utc=1&observatory_latitude={LAT}&observatory_longitude={LNG}&timezone=UTC&start_date=today&days_to_print={DAYS}&days_in_past=0&minimum_start_elevation=30&and_vs_or=or&minimum_end_elevation=30&minimum_ha=-12&maximum_ha=12&baseline_hrs=1&show_unc=1&minimum_depth=0&maximum_V_mag=&target_string=&print_html=2&twilight=-12&max_airmass=2.4%3Fformat%3Djson"

    # get any data dumps from the past day for a given location
    day2 = datetime.today()

    transits_2 = TransitDump.objects \
        .filter(date=day2, lat=LAT, lng=LNG)

    t_dump = ''
    if len(transits_2) > 0:
        t_dump = transits_2
    print(t_dump)

    # if there is one in db, process and return
    if len(t_dump) > 0:
        return JsonResponse(
            process_db_transit(t_dump[0].dump, request.user.is_authenticated)
        )

    # otherwise, grab new data dump from site
    else:
        print("WEB DUMP")
        print(transits_2)
        print(TransitDump.objects.filter(date=day2, lat=LAT, lng=LNG))

        # grab csv from webpage
        dump = requests.get(testurl, headers=HEADER).content

        # process
        newdata = process_csv(dump)

        # create object in db for next request
        TransitDump.objects.create(
            date=day2,
            lat=LAT,
            lng=LNG,
            dump=json.dumps(newdata)
        )

        return Response({"Transits": newdata})


@api_view(['GET'])
@permission_classes((AllowAny,))
def scrape_data1(request):
    transits = TransitDump.objects.latest('date')

    return JsonResponse(
        process_db_transit(transits.dump, request.user.is_authenticated)
    )


@api_view(['GET'])
@permission_classes((AllowAny,))
def updatesw(request):
    return Response({"hasUpdate": "19287419462"})


def alert_user(user_id, transit_name, transit_id):
    print("SENDING ALERT")
    user = User.objects.get(pk=user_id)

    send_mail(
        f"Upcoming transit: {transit_name}",
        f"{transit_name} will transit tonight.",
        settings.EMAIL_HOST_USER,
        [user.email, ],
        fail_silently=False
    )

    try:
        transit = PlannedTransit.objects.get(pk=transit_id)
        transit.active = False
        transit.save()
    except PlannedTransit.doesNotExist:
        print("Transit obj doesnt exist")


# For use with node dispatcher
def dispatch_transit_alerts(request):
    NOW = datetime.now()

    for transit in PlannedTransit.objects.filter(active=True):
        transit_obj = eval(transit.transit)
        print(transit_obj)

        if transit_date(transit_obj["start time"]) - timedelta(minutes=180) < NOW:
            alert_user(
                transit.user.pk,
                transit_obj["Name"],
                transit.pk
            )
    print("ALERT QUEUE EMPTY")
    return HttpResponse("done")


@api_view(['POST'])
@permission_classes((AllowAny,))
def password_reset(request):
    user = User.objects.get(email=request.data['email'])
    print(user)

    temporary_token = ''.join(random.choice(letters) for i in range(15))
    try:
        u = UserProfile.objects.get(user=user)
    except UserProfile.DoesNotExist:
        u = UserProfile.objects.create(user=user)
    u.temp_token = temporary_token
    u.save()

    msg = f"""<p>You're receiving this email because you requested a password reset for your user account at Exotransits</p><br/>
        <p>Please use the following link to reset your password:</p>
        <a href="{SITE_URL}/change-password">{SITE_URL}/change-password?id={temporary_token}</a><br/>
        <p>If you did not request a password reset, please ignore this email</p><br/>
        <p>Thanks for using Exotransits!</p>
        """

    send_mail(
        subject="Reset your password - Exotransits",
        message=strip_tags(msg),
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=[user.email, ],
        fail_silently=False,
        html_message=msg
    )
    return Response({"msg": "success"})

 
@api_view(['POST'])
@permission_classes((AllowAny,))
def password_change(request):
    user_profile = UserProfile.objects.get(temp_token=request.data["key"])
    user_profile.temp_token = ""
    user_profile.save()
    user = user_profile.user

    user.set_password(request.data["pw"])
    user.save()
    
    return Response({"msg": "success", "username": user.username})


@api_view(['POST'])
def contact(request):
    print(settings.EMAIL_HOST_USER)
    sent = send_mail(
        f"Message from {request.data['name']} ({request.data['email']})",
        request.data['msg'],
        settings.EMAIL_HOST_USER,
        [settings.EMAIL_HOST_USER,],
        fail_silently=False
    )
    return Response({"response": (sent==1)})
