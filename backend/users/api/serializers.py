from rest_framework import serializers
from django.contrib.auth.models import User
from users.models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('avatar', 'user', 'bio')


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
    profile = ProfileSerializer(many=False, read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'profile',)


class UserUpdateSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='profile.username', required=False)
    email = serializers.CharField(source='profile.email', required=False)
    avatar = serializers.FileField(source='profile.avatar', required=False)
    bio = serializers.CharField(source='profile.bio', required=False)
    password1 = serializers.CharField(write_only=True, required=False)
    password2 = serializers.CharField(write_only=True, required=False)

    def validate_password(self, validated_data):
        if validated_data.get('password1') != validated_data.get('password2'):
            raise serializers.ValidationError("Those passwords do not match!")
        elif not validated_data.get('password1') or not validated_data.get('password2'):
            return validated_data

    def update(self, instance, validated_data):
        self.validate_password(validated_data)
        profile_data = validated_data.pop('profile', None)
        password1 = validated_data.pop('password1', None)
        password2 = validated_data.pop('password2', None)
        profile = instance.profile
        user = profile.user
        
        for field, value in profile_data.items():
            if field == 'avatar' or field == 'bio':
                setattr(profile, field, value)
            else:
                setattr(user, field, value)

        if password1:
            user.set_password(password1)

        profile.save()
        user.save()
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password1', 'password2', 'avatar', 'bio')