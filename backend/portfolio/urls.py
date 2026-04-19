from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, ProjectViewSet, YouTubeVideoViewSet, InquiryViewSet, GalleryScanView

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'projects', ProjectViewSet)
router.register(r'videos', YouTubeVideoViewSet)
router.register(r'inquiries', InquiryViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('gallery/', GalleryScanView.as_view(), name='gallery-scan'),
]
