from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.views import APIView
from backend.serializers import CreateUserSerializer, ProfileSerializer, CaloriesSerializer, PredictionSerializer
from rest_framework.permissions import IsAuthenticated
from .models import Profile, Calories, Prediction
import random
from datetime import datetime, timedelta
from django.db.models import Sum


class CreateUserAPIView(CreateAPIView):
    serializer_class = CreateUserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        # We create a token than will be used for future auth
        token = Token.objects.create(user=serializer.instance)
        token_data = {"token": token.key}
        return Response(
            {**serializer.data, **token_data},
            status=status.HTTP_201_CREATED,
            headers=headers
        )


class LogoutUserAPIView(APIView):
    queryset = get_user_model().objects.all()

    def get(self, request, format=None):
        # simply delete the token to force a login
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)



class HelloView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        content = {'message': 'Hello, World!'}
        return Response(content)


class ProfileView(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self, request):
        # request.data["user"] = int(request.user.pk)
        # Profile.objects.filter(user=request.data["user"]).delete()

        serializer = ProfileSerializer(data=request.data)

        if serializer.is_valid():
            Profile.objects.filter(user=request.user).delete()
            serializer.save(user=request.user)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        snippets = Profile.objects.filter(user=int(request.user.pk))
        serializer = ProfileSerializer(snippets, many=True)
        return Response(serializer.data)





class CaloriesView(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self, request):
        # request.data["user"] = int(request.user.pk)
        # Profile.objects.filter(user=request.data["user"]).delete()

        serializer = CaloriesSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=request.user)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        snippets = Calories.objects.filter(user=int(request.user.pk))
        serializer = CaloriesSerializer(snippets, many=True)
        return Response(serializer.data)


    def delete(self, request, pk, format=None):
        snippet = Calories.objects.get(pk=pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



class PredictionView(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self, request):
        # request.data["user"] = int(request.user.pk)
        # Profile.objects.filter(user=request.data["user"]).delete()

        serializer = PredictionSerializer(data=request.data)

        if serializer.is_valid():
            Prediction.objects.filter(user=request.user).delete()
            serializer.save(user=request.user)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        snippets = Prediction.objects.filter(user=int(request.user.pk))
        serializer = PredictionSerializer(snippets, many=True)
        return Response(serializer.data)


class ModelView(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self, request):
        # request.data["user"] = int(request.user.pk)
        # Profile.objects.filter(user=request.data["user"]).delete()



        a1 = 'You have less than 30 % chances to lose at least 5 kg of your weight in a month!'
        a2 = 'You have between 30 to 60% chances to lose at least 5 kg of your weight in a month!'
        a3 = 'You have between 60 to 80% chances to lose at least 5 kg of your weight in a month!'
        a4 = 'You have more than 80% chances to lose at least 5 kg of your weight in a month!'
        prediction = random.choice([a1, a2, a3, a4])

        serializer_final = {"prediction": prediction}

        return Response(serializer_final)


    def get(self, request):
        a1 = 'You have less than 30 % chances to lose at least 5 kg of your weight in a month!'
        a2 = 'You have between 30 to 60% chances to lose at least 5 kg of your weight in a month!'
        a3 = 'You have between 60 to 80% chances to lose at least 5 kg of your weight in a month!'
        a4 = 'You have more than 80% chances to lose at least 5 kg of your weight in a month!'
        prediction = random.choice([a1, a2, a3, a4])

        serializer = {"prediction": prediction}
        return Response(serializer)




class DashboardView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        today_date = datetime.today()
        day1ago = today_date - timedelta(days=1)
        day2ago = today_date - timedelta(days=2)
        day3ago = today_date - timedelta(days=3)
        day4ago = today_date - timedelta(days=4)
        day5ago = today_date - timedelta(days=5)
        day6ago = today_date - timedelta(days=6)

        print(day1ago)
        print(day6ago)

        thismonth = today_date.month
        thisyear = today_date.year


        relative_daysss = today_date.replace(day=1)

        previousmonth = (relative_daysss - timedelta(days=1)).month
        previousyear = (relative_daysss - timedelta(days=1)).year


        list_of_7_days = [today_date, day1ago, day2ago, day3ago, day4ago, day5ago, day6ago]
        list_of_7_calories = []
        for ddd in list_of_7_days:
            obj = Calories.objects.filter(user=request.user).filter(date__gte=str(ddd.strftime('%Y-%m-%d')), date__lte=str(ddd.strftime('%Y-%m-%d'))).aggregate(Sum('calories'))['calories__sum']
            if not isinstance(obj, (int, float, complex)):
                obj = 0
            list_of_7_calories.append(obj)


        list_of_2_month = [thismonth, previousmonth]
        list_of_2_month_tuple = [(thismonth, thisyear), (previousmonth, previousyear)]
        list_of_2_calories = []

        for mmm, ddd in list_of_2_month_tuple:
            obj = Calories.objects.filter(user=request.user).filter(date__month__gte=str(mmm), date__year__gte=str(ddd), date__month__lte=str(mmm), date__year__lte=str(ddd)).aggregate(Sum('calories'))['calories__sum']
            if not isinstance(obj, (int, float, complex)):
                obj = 0
            list_of_2_calories.append(obj)


        total_unhealthy = Calories.objects.filter(user=request.user).filter(title='Unhealthy').aggregate(Sum('calories'))['calories__sum']
        total_healthy = Calories.objects.filter(user=request.user).filter(title='Healthy').aggregate(Sum('calories'))['calories__sum']
        total_moderate = Calories.objects.filter(user=request.user).filter(title='Moderate').aggregate(Sum('calories'))['calories__sum']

        list_of_7_days_converted = []
        for i in list_of_7_days:
            list_of_7_days_converted.append(str(i.strftime('%Y-%m-%d')))



        serializer = {"7days": list_of_7_days_converted, "7calories": list_of_7_calories,"2month": list_of_2_month, "2calories": list_of_2_calories,"total_unhealthy":total_unhealthy, "total_healthy":total_healthy, "total_moderate":total_moderate}
        return Response(serializer)


