from rest_framework import serializers
from .models import CustomUser

class UserRegistrationSerializer(serializers.ModelSerializer):
    # We are writing this becoz we need confirm password field in our Registratin Request
    password2 = serializers.CharField(style={'input_type':'password'}, write_only=True)
    class Meta:
        model = CustomUser
        fields=['email', 'username', 'password', 'password2', 'pfp','first_name','last_name']
        extra_kwargs={
        'password':{'write_only':True}
        }

    # Validating Password and Confirm Password while Registration
    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        if password != password2:
            raise serializers.ValidationError("Password and Confirm Password doesn't match")
        if len(password) < 8 :
            raise serializers.ValidationError("Password is too short")
        
        return attrs

    def create(self, validate_data):
        return CustomUser.objects.create_user(**validate_data)
  
class UserLoginSerializer(serializers.ModelSerializer) :
    class Meta:
        model = CustomUser
        fields = ['username','password']