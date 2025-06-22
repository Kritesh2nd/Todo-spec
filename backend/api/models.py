from django.db import models

# Create your models here.


class Task(models.Model):
    position = models.IntegerField(default=0)
    title = models.CharField(max_length=100)
    icon = models.CharField(max_length=30)
    description = models.TextField()
    completed = models.BooleanField(default=False)
    completion_date_time = models.DateTimeField()

    def __str__(self):
        print(self)
        return self.title
