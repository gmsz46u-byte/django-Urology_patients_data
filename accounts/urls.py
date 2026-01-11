from django.urls import path
from . import views

urlpatterns = [
    path("register",views.register,name="register_page"),
    path('login/',views.login_view,name='login_page'), ## @login_required >> redirect to (login/) not (login only)
    path('logout',views.logout_view,name='logout_view'),
]