from inventory.models import Product, Comment, Profile, Order, OrderProduct, Category,RentProduct
from rest_framework import viewsets, permissions, mixins
from drf.serializer import AllProducts, UserSerializer, CommentSerializer,RentProductSerializer ,ProfileSerializer, OrderSerializer, OrderProductSerializer, CategorySerializer
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth.models import User



class ReadOnly(permissions.BasePermission):
  
    def has_object_permission(self, request, view, obj):
           return request.method in permissions.SAFE_METHODS
       

class AllProductsViewSet(viewsets.ModelViewSet):
   
    serializer_class = AllProducts
    authentication_class = (TokenAuthentication,)
    permission_classes = [ReadOnly]
    lookup_field = "slug"
    http_method_names = ['get', 'head']
    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `product` query parameter in the URL.
        """
        queryset = Product.objects.all()
        category = self.request.query_params.get('category') 
        rent = self.request.query_params.get('active')
        name = self.request.query_params.get('name')       
        if category is not None: 
            queryset = queryset.filter(category__name=category) 
        if name is not None: ##do zwracania produktów z kategorią 
            queryset = queryset.filter(name__icontains=name) 
        if rent is not None: 
            queryset = queryset.filter(displayrent=True).filter(renteduntill=None)           
        return queryset



class RentReadyProducts(viewsets.ModelViewSet):
    serializer_class = AllProducts
    http_method_names = ['get','head']
    def get_queryset(self):
       
        queryset = Product.objects.all()
        queryset = queryset.filter(displayrent=True).filter(renteduntill=None)
        return queryset
    


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
   ## http_method_names = ['post', 'head']

class ProfileViewSet(viewsets.ModelViewSet):
    queryset=Profile.objects.all()
    serializer_class = ProfileSerializer   
    lookup_field = "user__username"

   
    def get_queryset(self): 
     return Profile.objects.filter(user=self.request.user) #zwróć obiekty gdzie user w modelu zgadza sie z userem z requesta (wymaga tokenu)
        
      
   
class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    authentication_class = (TokenAuthentication,)
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def perform_create(self, serializer):
        
        
        serializer.save(owner=Profile.objects.get(user=self.request.user))
        
class OrderProductViewSet(viewsets.ModelViewSet):
    queryset = OrderProduct.objects.all()
    serializer_class = OrderProductSerializer

  
    
class CategoryViewSet(viewsets.ModelViewSet):
    queryset=Category.objects.all()
    serializer_class = CategorySerializer

class CommentsViewSet(viewsets.ModelViewSet):
    
    serializer_class = CommentSerializer
    authentication_class = (TokenAuthentication,)
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = "id"

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
    
    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `product` query parameter in the URL.
        """
        queryset = Comment.objects.all()
        product = self.request.query_params.get('product') 
        owner = self.request.query_params.get('owner') 
        if product is not None: ##do zwracania komentarzy napisanych pod danym produktem
            queryset = queryset.filter(product=product)
        if owner is not None: ##do zwracania komentarzy napisanych tylko przez danego
            queryset = queryset.filter(owner__username=owner)
        return queryset


class RentProductViewSet(viewsets.ModelViewSet):
    queryset = RentProduct.objects.all()
    serializer_class = RentProductSerializer
    authentication_class = (TokenAuthentication,)
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def perform_create(self, serializer):
        
        
        serializer.save(owner=Profile.objects.get(user=self.request.user))