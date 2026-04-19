from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.name
        
    class Meta:
        verbose_name_plural = "Categories"

class Project(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='projects')
    description = models.TextField()
    cover_image_url = models.CharField(max_length=500, blank=True, help_text="Path to image in images/ folder, e.g., /static/images/hero.jpg")
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title

class YouTubeVideo(models.Model):
    title = models.CharField(max_length=200)
    video_id = models.CharField(max_length=50, help_text="YouTube Video ID (e.g., dQw4w9WgXcQ)")
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['order', '-id']
        
    def __str__(self):
        return self.title

class Inquiry(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Inquiry from {self.name}"
        
    class Meta:
        verbose_name_plural = "Inquiries"
