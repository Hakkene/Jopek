from cgi import print_exception
from sre_constants import CATEGORY_UNI_DIGIT
from tokenize import Name
from unicodedata import name
from unittest.util import _MAX_LENGTH
from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()

    class Meta:
        verbose_name_plural = 'Categories'

    def __str__(self):
     return self.name

class Product(models.Model):
    name = models.CharField(max_length=100)    
    price = models.IntegerField()
    brand = models.CharField(max_length=50)
    description =models.TextField()
    stock = models.IntegerField()
    is_active = models.BooleanField(default=True) 
   # category = models.ForeignKey(Category, on_delete=models.PROTECT)
    category = models.ManyToManyField(Category)
    slug = models.SlugField(max_length=20)
    thumbnail =models.ImageField(upload_to='images/', default=123)
    
    def __str__(self):
     return self.name

class Media(models.Model):

    product_inventory = models.ForeignKey(
        Product,
        on_delete=models.PROTECT,
        related_name="media_product",
    )

    image = models.ImageField(upload_to='images/')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
"""
    def __str__(self):
     return self.product
"""
