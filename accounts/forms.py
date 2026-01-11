from django import forms
from .models import Post

class CreatePost(forms.ModelForm):
    class Meta:
        model = Post
        # fileds = '__all__' # to get all inputs
        fields = ['title','content','user']
