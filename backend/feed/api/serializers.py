from rest_framework import serializers
from feed.models import Brand, Lookbook, Picture

class PictureSerializer(serializers.ModelSerializer):
    lookbook_id = serializers.PrimaryKeyRelatedField(queryset=Lookbook.objects.all(), source='lookbook.id')

    class Meta:
        model = Picture
        fields = ('lookbook_id', 'url')

class LookbookSerializer(serializers.ModelSerializer):
    pictures = PictureSerializer(many=True, read_only=True)
    brand_id = serializers.PrimaryKeyRelatedField(queryset=Brand.objects.all(), source='brand.id')
    
    class Meta:
        model = Lookbook
        fields = ('id', 'brand_id', 'season', 'year', 'pictures')

class BrandSerializer(serializers.ModelSerializer):
    lookbooks = LookbookSerializer(many=True, read_only=True)

    class Meta:
        model = Brand
        fields = ('id', 'name', 'lookbooks')