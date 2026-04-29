from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('portfolio.urls')),


    # Serve React frontend for all other routes (SPA fallback)
    re_path(r'^(?!api/|admin/).*$', TemplateView.as_view(template_name='index.html')),
]