from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth.hashers import make_password

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


    def create(self, validated_data):
        validated_data.pop('password2', None)
        # validated_data['password'] = make_password(password)
        instance = self.Meta.model.objects.create_user(**validated_data)
        # instance.is_active = True
        # instance.save()
        return instance
        return CustomUser.objects.create_user(**validated_data)

  
class UserLoginSerializer(serializers.ModelSerializer) :
    class Meta:
        model = CustomUser
        fields = ['username','password']