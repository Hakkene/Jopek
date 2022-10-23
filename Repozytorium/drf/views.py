from inventory.models import Product
from rest_framework import viewsets, permissions
from drf.serializer import AllProducts

class AllProductsViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = AllProducts
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = "slug"

