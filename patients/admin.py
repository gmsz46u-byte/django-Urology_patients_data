from django.contrib import admin
from .models import PatientRegistration,PastMedHx
# Register your models here.

admin.site.register(PastMedHx)

@admin.register(PatientRegistration)
class PatientRegistrationModelAdmin(admin.ModelAdmin):
    list_display = ['name','operation','age','created_at','created_by','deleted_at','deleted_by']


    # fields = # field to display within obj page to create/update
    # list_display = ['name','price','active','category']
    # list_display_links = ['name','price']
    # list_editable = ['price','active'] ## shouldnot be a link to be editable
    # search_fields = ['name'] # search by 'name'
    # list_filter = ['category']    # side filter by 'category'
    # fields = ['name','price','category'] # fields to view within obj


    def save_model(self, request, obj, form, change):
        if not obj.pk:
            obj.created_by = request.user
        return super().save_model(request, obj, form, change)

    def delete_model(self, request, obj):
        if obj.pk :
            print(obj.deleted_by)
            obj.deleted_by = request.user
            obj.save()
        return super().delete_model(request, obj)


    def delete_queryset(self, request, queryset):
            # Standard queryset.delete() skips the model's delete method.
            # You must loop or use .update() to ensure user tracking.
            for obj in queryset:
                obj.delete(user=request.user)