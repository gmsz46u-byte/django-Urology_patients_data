from django.urls import path
from . import views

urlpatterns = [
    path('',views.homepage,name='homepage'),
    path('adding_page/',views.adding_page,name='adding_page'),
    path('view_page/',views.view_page,name='view_page'),
    path('view_check',views.view_check,name='view_check'),
    path('view_one',views.view_one,name='view_one'),
    path('switch_pages',views.switch_pages,name='switch_pages'),
    path('editing_page/',views.editing_page,name='editing_page'),
    path('save_update',views.save_update,name='save_update'),
    path('submit_delete',views.submit_delete,name="submit_delete"),
]