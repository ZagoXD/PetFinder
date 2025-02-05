import os
from django.db import models
import qrcode
from io import BytesIO
from django.core.files.base import ContentFile
from django.conf import settings
import uuid

class Animal(models.Model):
    owner = models.CharField(max_length=100, null=True, blank=True)
    name = models.CharField(max_length=100)
    species = models.CharField(max_length=50, choices=[("Cachorro", "Cachorro"), ("Gato", "Gato"), ("Outro", "Outro")])
    phone = models.CharField(max_length=15)
    photo = models.ImageField(upload_to="animal_photos/")
    qr_code = models.ImageField(upload_to="qrcodes/", blank=True, null=True)
    access_token = models.UUIDField(default=uuid.uuid4, unique=True)

    def save(self, *args, **kwargs):
        is_new = self.pk is None  
        super().save(*args, **kwargs) 

        if is_new or not self.qr_code:  
            qr_url = f"http://localhost:3000/animals/{self.id}?token={self.access_token}"
            qr = qrcode.make(qr_url)
            buffer = BytesIO()
            qr.save(buffer, format="PNG")
            self.qr_code.save(f"qr_{self.id}.png", ContentFile(buffer.getvalue()), save=False)

            super().save(update_fields=["qr_code"])

    def delete(self, *args, **kwargs):
        if self.photo:
            photo_path = os.path.join(settings.MEDIA_ROOT, str(self.photo))
            if os.path.exists(photo_path):
                os.remove(photo_path)

        if self.qr_code:
            qr_path = os.path.join(settings.MEDIA_ROOT, str(self.qr_code))
            if os.path.exists(qr_path):
                os.remove(qr_path)

        super().delete(*args, **kwargs)

    def __str__(self):
        return f"{self.name} - {self.owner}"
