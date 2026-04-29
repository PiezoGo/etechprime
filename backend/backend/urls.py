from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('portfolio.urls')),

    # Serve React app for everything except API, admin, and assets
    re_path(r'^(?!api/|admin/|assets/|static/|images/).*$', 
            TemplateView.as_view(template_name='index.html')),
]