from cgi import print_exception
from sre_constants import CATEGORY_UNI_DIGIT
from tokenize import Name
from unicodedata import name
from unittest.util import _MAX_LENGTH
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User

   





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

    image = models.ImageField(upload_to='images/')
    product = models.ForeignKey(Product, related_name='image', on_delete=models.CASCADE)
    

class Comment(models.Model):
    product = models.ForeignKey(Product,on_delete=models.CASCADE)
    body = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey('auth.User', related_name='comments', on_delete=models.CASCADE)
    
    class Meta:
        ordering = ['created_on']

    def __str__(self):
        return 'Comment {} by {}'.format(self.body, self.owner)


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    

    @receiver(post_save, sender=User)
    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            Profile.objects.create(user=instance)

    @receiver(post_save, sender=User)
    def save_user_profile(sender, instance, **kwargs):
        instance.profile.save()

    def __str__(self):
     return self.user.username

class Order(models.Model):
    product = models.ForeignKey(Product, related_name='order', on_delete=models.PROTECT)   
    owner = models.ForeignKey(Profile, related_name='order', on_delete=models.PROTECT)
    order_date = models.DateField()
    notes = models.TextField()
    price =models.IntegerField()
    city = models.CharField(max_length=50)
    street = models.CharField(max_length=50)
    zipcode = models.CharField(max_length=6)
    
        
    
