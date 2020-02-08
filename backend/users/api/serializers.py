from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.response import Response
from users.models import Profile
from archivum.settings import AWS_S3_CUSTOM_DOMAIN
import json


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('avatar', 'user', 'bio', 'location')


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
    likes = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'date_joined', 'profile', 'likes',)
    
    def get_likes(self, instance):
        likes = instance.likes.all()
        res = []
        for like in likes:
            brand = like.lookbook.brand.name
            season = like.lookbook.season
            uuid = like.uuid
            width = like.width
            height = like.height
            liked_photo_source = 'https://' + AWS_S3_CUSTOM_DOMAIN + '/' + str(like.src)
            res.append({
                'brand': brand,
                'season': season,
                'uuid': uuid,
                'width': width,
                'height': height,
                'src': liked_photo_source
                })
        return res


class UserUpdateSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='profile.username', required=False)
    email = serializers.CharField(source='profile.email', required=False)
    avatar = serializers.FileField(source='profile.avatar', required=False)
    bio = serializers.CharField(source='profile.bio', required=False)
    location = serializers.CharField(source='profile.location', required=False)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'bio', 'location', 'avatar',)

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', None)
        profile = instance.profile
        user = profile.user
        for field, value in profile_data.items():
            if field == 'avatar' or field == 'bio' or field == 'location':
                setattr(profile, field, value)
            else:
                setattr(user, field, value)
        profile.save()
        user.save()
        instance.save()
        return instance


class UserPasswordUpdateSerializer(serializers.ModelSerializer):
    password_1 = serializers.CharField(write_only=True)
    password_2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('password_1', 'password_2',)