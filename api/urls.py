from django.urls import path
from . import views

urlpatterns = [
    path('scrape_transits/', views.scrape_data, name="scrape"),
    path('cache_transits/', views.scrape_data1, name="scrape1"),
    path('updatesw/', views.updatesw, name="updatesw"),
    path('star_data/', views.star_data, name="star_data"),
    path('dispatch_transit_alerts/', views.dispatch_transit_alerts, name="dispatch_transit_alerts"),
    path('contact/', views.contact, name="contact"),

    path('get_upcoming_transits/', views.PTransitList.as_view(), name="upcoming"),
    path('create_upcoming_transit/', views.PTransitCreate.as_view(), name="create_upcoming"),
    path('update_upcoming_transit/', views.PTransitUpdate.as_view(), name="update_upcoming"),
    path('delete_upcoming_transit/', views.delete_transit_planner, name="delete_upcoming"),

    path('update_userprofile/', views.update_userprofile, name="update_userprofile"),
    path('auth/', views.user_data, name="user_data"),
    path('csrf/', views.get_csrf, name="auth_data"),
    path('reset_password/', views.password_reset, name="password_reset"),
    path('change_password/', views.password_change, name="password_change"),
]
