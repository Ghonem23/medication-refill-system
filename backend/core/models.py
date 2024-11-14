from django.db import models
from django.contrib.auth.models import User

class Medication(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    quantity_in_stock = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class RefillRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    medication = models.ForeignKey(Medication, on_delete=models.CASCADE)
    status = models.CharField(max_length=50, default='pending')  # 'pending', 'approved', 'rejected'
    requested_at = models.DateTimeField(auto_now_add=True)
    fulfilled_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.username} - {self.medication.name}"