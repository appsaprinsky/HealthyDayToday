from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Profile, Calories, Prediction


class CreateUserSerializer(serializers.ModelSerializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True,
                                     style={'input_type': 'password'})
    email = serializers.EmailField()

    class Meta:
        model = get_user_model()
        fields = ('username', 'password', 'email')
        write_only_fields = ('password')
        read_only_fields = ('is_staff', 'is_superuser', 'is_active',)

    def create(self, validated_data):
        user = super(CreateUserSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user



    

class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.CharField(max_length=200)
    fullname = serializers.CharField()
    job = serializers.CharField()
    description = serializers.CharField()


    class Meta:
        model = Profile
        fields = ('__all__')



class CaloriesSerializer(serializers.ModelSerializer):
    user = serializers.CharField(max_length=200)
    title = serializers.CharField()
    date = serializers.DateField()
    calories = serializers.IntegerField()


    class Meta:
        model = Calories
        fields = ('id', 'user', 'title', 'date', 'calories')


class PredictionSerializer(serializers.ModelSerializer):
    user = serializers.CharField(max_length=200)
    prediction = serializers.CharField()
    class Meta:
        model = Prediction
        fields = ('id', 'user', 'prediction')









