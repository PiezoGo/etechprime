import os
from pathlib import Path
from django.conf import settings
from rest_framework import viewsets, views, status
from rest_framework.response import Response
from .models import Category, Project, YouTubeVideo, Inquiry
from .serializers import CategorySerializer, ProjectSerializer, YouTubeVideoSerializer, InquirySerializer

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class YouTubeVideoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = YouTubeVideo.objects.filter(is_active=True)
    serializer_class = YouTubeVideoSerializer

class InquiryViewSet(viewsets.ModelViewSet):
    queryset = Inquiry.objects.all()
    serializer_class = InquirySerializer
    http_method_names = ['post']

class GalleryScanView(views.APIView):
    """
    Scans the images/ folder at the root of the project and returns all image URLs natively.
    """
    def get(self, request):
        images_dir = settings.BASE_DIR.parent / 'images'
        
        valid_extensions = {'.jpg', '.jpeg', '.png', '.gif', '.webp'}
        image_list = []
        
        if images_dir.exists() and images_dir.is_dir():
            try:
                for file_name in os.listdir(images_dir):
                    ext = Path(file_name).suffix.lower()
                    if ext in valid_extensions:
                        # Construct URL path (STATIC_URL is 'static/')
                        # URLs would be /static/images/file_name depending on static files setup
                        # Since STATICFILES_DIRS maps 'images' to /static/,
                        # the URL should be /static/file_name. Wait, no.
                        # Django's staticfiles maps the *contents* of directories in
                        # STATICFILES_DIRS to /static/. 
                        # So if file is `images/photo.jpg`, the URL is `/static/photo.jpg`.
                        
                        image_list.append({
                            'id': file_name,
                            'url': f"{settings.STATIC_URL}{file_name}",
                            'name': file_name.replace(ext, '').replace('-', ' ').title(),
                            'alt': f"Photography by ETECH Studioz - {file_name}"
                        })
                        
                # Sort images alphabetically assuming some naming convention
                image_list.sort(key=lambda x: x['name'])
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                
        return Response(image_list)
