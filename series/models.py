from django.db import models

# Create your models here.
class Serie(models.Model):
    titulo = models.CharField(max_length=100)
    plataforma = models.CharField(max_length=100)
    ano = models.IntegerField()
    avaliacao = models.FloatField()
    
    def __str__(self):
        return self.titulo