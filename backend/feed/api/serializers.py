from rest_framework import serializers
from feed.models import Brand, Lookbooks

class LookbooksSerializer(serializers.ModelSerializer):
    brand_id = serializers.PrimaryKeyRelatedField(queryset=Brand.objects.all(), source='brand.id')
    
    class Meta:
        model = Lookbooks
        fields = ('id', 'brand_id', 'season', 'year')

class BrandSerializer(serializers.ModelSerializer):
    lookbooks = LookbooksSerializer(many=True, read_only=True)

    class Meta:
        model = Brand
        fields = ('id', 'name', 'lookbooks')
