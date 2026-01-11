from django import forms
from .models import PatientRegistration


class PatientRegistrationForm(forms.ModelForm):
    class Meta:
        model = PatientRegistration
        fields = ['operation','name','age','gender','complaint','pmh','psh','labs','rads']