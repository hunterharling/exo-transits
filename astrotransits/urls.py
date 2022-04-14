from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from requests.api import get
from rest_framework_jwt.views import obtain_jwt_token
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.urls import include, path, re_path
from rest_auth.views import PasswordResetConfirmView
from os import walk
from . import views
from django.views.static import serve

# get the name (since it is dynamically named by webpack)


def get_sw_cache(s):
    for folder in settings.STATICFILES_DIRS:
        for (dirpath, dirnames, filenames) in walk(folder):
            for f in filenames:
                if s in f:
                    return (f)
    return "/nothing"


# content types
js = 'application/javascript'
json = 'application/json'
png = "media/png"

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),

    # Rest auth
    path('rest-auth/', include('rest_auth.urls')),
    re_path(r'^change-password/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$', PasswordResetConfirmView.as_view(),
            name='password_reset_confirm'),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),

    # API
    path('api/', include('api.urls')),

    # Assets
    path('service-worker.js', TemplateView.as_view(template_name="service-worker.js",
                                                   content_type=js), name='service-worker.js'),

    path('jquery.js', TemplateView.as_view(template_name="jquery.js",
                                           content_type=js), name='jquery.js'),

    path('manifest.json', TemplateView.as_view(template_name="manifest.json",
                                               content_type=json), name='manifest.json'),

    path('asset-manifest.json', TemplateView.as_view(template_name="asset-manifest.json",
                                                     content_type=json), name='asset-manifest.json'),

    path(get_sw_cache("precache"),
         TemplateView.as_view(template_name=get_sw_cache("precache"),
                              content_type=js), name=get_sw_cache("precache")),
    
    re_path(r'^(?!.*static).*$', TemplateView.as_view(template_name='index.html')),
]
