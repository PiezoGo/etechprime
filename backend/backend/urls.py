from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('portfolio.urls')),

    # Serve static assets properly - WhiteNoise should handle these
    # React SPA fallback - ONLY for normal pages, NOT for assets
    re_path(r'^(?!api/|admin/|assets/|static/|images/|favicon).*', 
            TemplateView.as_view(template_name='index.html')),
]