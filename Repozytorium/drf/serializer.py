#from msilib.schema import Media
from unicodedata import category
from rest_framework import serializers
from inventory.models import Product, Category, Media, Comment, Profile, Order
from django.contrib.auth.models import User
from rest_framework.authtoken.views import Token

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username','password']

        extra_kwargs = {'password':{
            'write_only':True,
            'required':True
        }}
    def create(self, validated_data):
        user=User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user
    
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
    #image = serializers.StringRelatedField(many=True)
    image = MediaSerializer(read_only=True, many=True)   
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
            "thumbnail",
            "image",
        )
        
class CommentSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    class Meta:
        model = Comment
        fields = ["id","product","body","created_on","owner"]



class OrderSerializer(serializers.ModelSerializer):
    #profile = ProfileSerializer(read_only=True, many=True)  
    #owner = ProfileSerializer() 
    class Meta:
        model = Order
        fields = ["id","notes"]
        
class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')
    userid = serializers.ReadOnlyField(source='user.id')
   # order = serializers.ReadOnlyField(source='order.product.name')
    order = OrderSerializer(read_only=True, many=True)  
    class Meta:
        model = Profile
        fields = ( 
            "id",
            "username",
            "userid",
            "order"
            
        )