from rest_framework import serializers
from django.contrib.auth.models import User
from users.models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('__all__')


class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')


class UserUpdateSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)
    
    def validate_password(self, validated_data):
        if not validated_data.get('password1') or not validated_data.get('password2'):
            raise serializers.ValidationError("Please enter and confirm password")
        elif validated_data.get('password1') != validated_data.get('password2'):
            raise serializers.ValidationError("Those passwords do not match!")
        return validated_data

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password1', 'password2')