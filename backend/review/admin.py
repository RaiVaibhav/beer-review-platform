from django.contrib import admin

from review.models import Review, Bear, Flavor
# Register your models here.

admin.site.register(Review)
admin.site.register(Bear)
admin.site.register(Flavor)