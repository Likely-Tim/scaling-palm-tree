from django.urls import path
from. import views

urlpatterns = [
    path("states/", views.states.index, name="states"),
    path("register/<str:domain>/", views.register.index, name="register")
]