from django.conf import settings
from os import walk
from django.shortcuts import render, redirect
from django.http import response, HttpResponse, JsonResponse
from django.middleware.csrf import get_token

def get_sw_cache():
    for folder in settings.STATICFILES_DIRS:
        for (dirpath, dirnames, filenames) in walk(folder):
            for f in filenames:
                if "precache" in f:
                    return (f)

def fix_cache(request):
    get_sw_cache()
    return HttpResponse('')

# def get_icon(request):
