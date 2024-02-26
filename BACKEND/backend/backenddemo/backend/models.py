from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, default=None, null=True, on_delete=models.CASCADE)
    fullname = models.TextField(max_length=500, blank=True)
    job = models.TextField(max_length=500, blank=True)
    description = models.TextField(max_length=500, blank=True)
    def __str__(self):
        return str(self.user)



class Calories(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.TextField()
    date = models.DateField()
    calories = models.IntegerField()
    def __str__(self):
        return str(self.user)


class Prediction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    prediction = models.TextField()
    def __str__(self):
        return str(self.user)