from rest_framework import serializers

class RefillRequestSerializer(serializers.Serializer):
    medication_id = serializers.IntegerField() 