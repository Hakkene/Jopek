#from msilib.schema import Media
from unicodedata import category
from rest_framework import serializers
from inventory.models import Product, Category, Media

class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = ["image"]

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["name"]

class AllProducts(serializers.ModelSerializer):
    category = CategorySerializer(many=True)
    image = MediaSerializer(source="media_product", many=True)
    class Meta:
        model = Product
        fields = ( 
            "id",
            "name",
            "slug",
            "price",
            "brand",
            "description",
            "stock",
            "is_active",
            "category",
            "image"
            
        )
        

