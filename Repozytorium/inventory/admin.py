from django.contrib import admin

# Register your models here.


from .models import Category, Product, Media

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'description']
    list_editable = ['description']

@admin.register(Product)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'price', 'description']
    list_editable = ['price', 'description']

@admin.register(Media)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['image', 'product']
    