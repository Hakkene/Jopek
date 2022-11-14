from django.contrib import admin

# Register your models here.


from .models import Category, Product, Media, Comment, Profile, Order

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name']
    

@admin.register(Product)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'price',  'slug']
    
    
    
@admin.register(Media)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'product']
    
@admin.register(Comment)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'product']
   
@admin.register(Profile)
class CategoryAdmin(admin.ModelAdmin):
   list_display = ['id','user']

@admin.register(Order)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['id','product']