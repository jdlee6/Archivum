from rest_framework import serializers
from feed.models import Brand, Lookbook, Picture


class PictureSerializer(serializers.ModelSerializer):
    lookbook_id = serializers.PrimaryKeyRelatedField(queryset=Lookbook.objects.all(), source='lookbook.id')

    class Meta:
        model = Picture
        fields = ('uuid', 'lookbook_id', 'src', 'width', 'height')


class LookbookSerializer(serializers.ModelSerializer):
    pictures = PictureSerializer(many=True, read_only=True)
    brand_id = serializers.PrimaryKeyRelatedField(queryset=Brand.objects.all(), source='brand.id')

    class Meta:
        model = Lookbook
        fields = ('id', 'brand_id', 'season', 'year', 'pictures')

    def create(self, validated_data):
        images_data = self.context.get('view').request.FILES
        for image_data in images_data.values():
            # NOTE change lookbook id when in use
            picture = Picture.objects.create(lookbook_id=7, src=image_data)
        return picture


class BrandSerializer(serializers.ModelSerializer):
    lookbooks = serializers.SerializerMethodField()

    class Meta:
        model = Brand
        fields = ('id', 'name', 'url_param', 'lookbooks')

    # orders lookbooks by their year with custom serializer method
    def get_lookbooks(self, instance):
        lookbook = instance.lookbooks.all().order_by('year')
        return LookbookSerializer(lookbook, many=True).data
