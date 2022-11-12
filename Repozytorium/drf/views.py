from inventory.models import Product, Comment
from rest_framework import viewsets, permissions, mixins
from drf.serializer import AllProducts, UserSerializer, CommentSerializer
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth.models import User

class AllProductsViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = AllProducts
    authentication_class = (TokenAuthentication,)
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = "slug"

#viewsets.GenericViewSet,mixins.CreateModelMixin
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = "username"

class AllCommentsViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    authentication_class = (TokenAuthentication,)
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = "product"
