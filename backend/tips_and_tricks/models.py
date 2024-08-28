
from django.db import models

from accounts.models import User
from Query.models import Category


class Tip(models.Model):
    active = models.BooleanField(default = False)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True, blank=True, related_name='category_tip')
    title = models.CharField(max_length=100)
    Image = models.FileField(upload_to = "files/images/Tip/Image/%Y/%m/%d/",blank=True, null=True)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='author_tip')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
