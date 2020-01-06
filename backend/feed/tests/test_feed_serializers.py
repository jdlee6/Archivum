from django.test import TestCase
from django.core import serializers
from feed.models import Brand, Lookbook
from feed.api.serializers import BrandSerializer
import json

class TestSerializers(TestCase):
    def setUp(self):
        self.Serializer = BrandSerializer
        self.brand = Brand.objects.create(name='bape')
        self.lb1 = Lookbook.objects.create(brand=self.brand, year='2019-01-01', season='fw19')
        self.lb2 = Lookbook.objects.create(brand=self.brand, year='2018-01-01', season='fw18')
        self.data = {
            'id': 1,
            'name': self.brand.name,
            'url_param': self.brand.url_param,
            'lookbooks': [
                self.lb1,
                self.lb2
            ]
        }


    def test_brand_serializer(self):
        qs1, qs2 = [], []
        serializer = self.Serializer(data=self.data).get_lookbooks(self.brand)
        lookbooks = self.brand.lookbooks.all().order_by('year')

        for i in range(2):
            season = json.dumps(serializer[i]['season']).replace('"', '')
            qs1.append(season)
            qs2.append(lookbooks[i].season)

        self.assertEqual(qs1, qs2)