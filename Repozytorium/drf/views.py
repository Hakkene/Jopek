from inventory.models import Product, Comment, Profile, Order
from rest_framework import viewsets, permissions, mixins
from drf.serializer import AllProducts, UserSerializer, CommentSerializer, ProfileSerializer, OrderSerializer
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth.models import User



class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner of the snippet.
        return obj.owner == request.user
       

class AllProductsViewSet(viewsets.ModelViewSet):
   
    serializer_class = AllProducts
    authentication_class = (TokenAuthentication,)
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = "slug"
    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `product` query parameter in the URL.
        """
        queryset = Product.objects.all()
        category1 = self.request.query_params.get('category1') 
        category2 = self.request.query_params.get('category2') 
        if category1 is not None: ##do zwracania produktów z kategorią 
            queryset = queryset.filter(category__name=category1)

        if category2 is not None:##do zwracania produktów z dwoma kategoriami
            queryset = queryset.filter(category__name=category1).filter(category__name=category2)

      

        return queryset

    

#viewsets.GenericViewSet,mixins.CreateModelMixin
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = "username"

class ProfileViewSet(viewsets.ModelViewSet):
    
    serializer_class = ProfileSerializer   
    lookup_field = "user__username"

    def get_queryset(self): 
      return Profile.objects.filter(user=self.request.user) #zwróć obiekty gdzie user w modelu zgadza sie z userem z requesta (wymaga tokenu)
        
      
   
class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    

class CommentsViewSet(viewsets.ModelViewSet):
    
    serializer_class = CommentSerializer
    authentication_class = (TokenAuthentication,)
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,IsOwnerOrReadOnly]
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
