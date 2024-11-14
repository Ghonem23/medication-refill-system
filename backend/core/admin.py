from django.contrib import admin
from .models import Medication, RefillRequest

admin.site.register(Medication)
admin.site.register(RefillRequest)