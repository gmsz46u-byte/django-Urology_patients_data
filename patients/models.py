from django.db import models
from django_softdelete.models import SoftDeleteModel
from django.conf import settings
from django.core.validators import MinValueValidator,MaxValueValidator

# Create your models here.
class PastMedHx(SoftDeleteModel):
    pmh = models.CharField(max_length=50,default='none')

    def __str__(self):
        return self.pmh

class PatientRegistration(SoftDeleteModel):
    operation = models.CharField(max_length=50,choices=[('TURP','TURP'), ('TURP&Crushing','TURP&Crushing'), ('TVP','TVP'), ('Cystolithotripsy','Cystolithotripsy'), ('Cystolithotomy','Cystolithotomy'), ('Ureterolithotomy','Ureterolithotomy'), ('URS','URS'), ('DJ removal','DJ removal'), ('JJ fix','JJ fix'), ('D cysto(TURBT)','D cysto(TURBT)'), ('D cysto & proceed','D cysto & proceed'), ('Pyeloplasty','Pyeloplasty'), ('Nephrectomy(partial)','Nephrectomy(partial)'), ('Nephrectomy(total)','Nephrectomy(total)')])
    name = models.CharField(max_length=100,unique=True)
    age = models.IntegerField(validators=[MinValueValidator(1),MaxValueValidator(100)])
    gender = models.CharField(max_length=10,choices=[('Male','Male'),('Female','Female'),('Child','child')])
    complaint = models.TextField()
    pmh = models.ManyToManyField(PastMedHx)
    psh = models.TextField()
    labs = models.TextField()
    rads = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,null=True,blank=True,related_name='registrations_created')
    deleted_by = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,null=True,blank=True,related_name='registrations_deleted')


    def __str__(self):
        return self.name
    
    def delete(self, user=None, *args, **kwargs):
        # 1. Capture the user before the record is "deleted"
        if user:
            self.deleted_by = user
            self.save(update_fields=['deleted_by'])
        
        # 2. Call the library's actual delete method
        # This sets is_deleted=True and deleted_at=now
        super(PatientRegistration, self).delete(*args, **kwargs)


