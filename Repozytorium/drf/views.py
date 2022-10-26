from inventory.models import Product
from rest_framework import viewsets, permissions, mixins
from drf.serializer import AllProducts, UserSerializer
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth.models import User

class AllProductsViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = AllProducts
    authentication_class = (TokenAuthentication,)
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = "slug"


class UserViewSet(viewsets.GenericViewSet,mixins.CreateModelMixin,):
    queryset = User.objects.all()
    serializer_class = UserSerializer