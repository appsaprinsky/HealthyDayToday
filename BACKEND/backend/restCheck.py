import json
import requests

#3637285642ffda9987d8f25507f79b5cded94442
if __name__ == '__main__':


####Register

    # URL = "http://127.0.0.1:8000/api/auth/register/"
    # params = {
    #     "username": "username11",
    #     "password": "password1",
    #     "email": "email@gmail.com"
    # }
    #
    #
    # resp = requests.post(URL, json=params)
    # print(resp.text)



####Login to get Token

    # URL = "http://127.0.0.1:8000/api/auth/login/"
    # params = {
    #     "username": "username1",
    #     "password": "password1",
    # }
    #
    # resp = requests.post(URL, json=params)
    # print(resp.text)



# ####View Hello World
#
#     URL = "http://127.0.0.1:8000/api/hello/"
#
#     headers = {"Accept": "application/json", "Authorization": "Token 9c2db70465a10b5c494703a99d2b9c162099b5ae"}
#
#
#     resp = requests.get(URL, headers=headers)
#     print(resp.text)

####View Profile

    # URL = "http://127.0.0.1:8000/api/profile/"
    #
    # headers = {"Accept": "application/json", "Authorization": "Token 9c2db70465a10b5c494703a99d2b9c162099b5ae"}
    #
    #
    # resp = requests.get(URL, headers=headers)
    # print(resp.text)

####Add Profile


    # URL = "http://127.0.0.1:8000/api/profile/"
    #
    # headers = {"Accept": "application/json", "Authorization": "Token 9c2db70465a10b5c494703a99d2b9c162099b5ae"}
    # params = {
    #     "user":"no",
    #     "fullname":"Micro M",
    #     "job":"IT",
    #     "description":"Yes",
    # }
    #
    # resp = requests.post(URL, json=params, headers=headers)
    # print(resp.text)







####View Calories

    # URL = "http://127.0.0.1:8000/api/calories/"
    #
    # headers = {"Accept": "application/json", "Authorization": "Token 9c2db70465a10b5c494703a99d2b9c162099b5ae"}
    #
    #
    # resp = requests.get(URL, headers=headers)
    # print(resp.text)

####Add Calories
    # URL = "http://127.0.0.1:8000/api/calories/"
    #
    # headers = {"Accept": "application/json", "Authorization": "Token 9c2db70465a10b5c494703a99d2b9c162099b5ae"}
    # params = {
    #     "user":"no",
    #     "title":"Micro M",
    #     "date":"2022-02-08",
    #     "calories":"1000",
    # }
    #
    # resp = requests.post(URL, json=params, headers=headers)
    # print(resp.text)

####delete Calories

    # URL = "http://127.0.0.1:8000/api/calories/1/delete"
    #
    # headers = {"Accept": "application/json", "Authorization": "Token 9c2db70465a10b5c494703a99d2b9c162099b5ae"}
    # resp = requests.delete(URL, headers=headers)
    # print(resp.text)


####View Predictions

    # URL = "http://127.0.0.1:8000/api/predictions/"
    #
    # headers = {"Accept": "application/json", "Authorization": "Token 9c2db70465a10b5c494703a99d2b9c162099b5ae"}
    #
    #
    # resp = requests.get(URL, headers=headers)
    # print(resp.text)

####Add Predictions
    # URL = "http://127.0.0.1:8000/api/predictions/"
    #
    # headers = {"Accept": "application/json", "Authorization": "Token 9c2db70465a10b5c494703a99d2b9c162099b5ae"}
    # params = {
    #     "user":"no",
    #     "prediction":"You have less than 30 % chances to lose at least 5 kg of your weight in a month!",
    #
    # }
    #
    # resp = requests.post(URL, json=params, headers=headers)
    # print(resp.text)


####View Model

    # URL = "http://127.0.0.1:8000/api/model/"
    #
    # headers = {"Accept": "application/json", "Authorization": "Token 9c2db70465a10b5c494703a99d2b9c162099b5ae"}
    #
    #
    # resp = requests.get(URL, headers=headers)
    # print(resp.text)

####Add Model
    # URL = "http://127.0.0.1:8000/api/model/"
    #
    # headers = {"Accept": "application/json", "Authorization": "Token 9c2db70465a10b5c494703a99d2b9c162099b5ae"}
    # params = {
    #     "q1":"no",
    #     "q2": "no",
    #     "q3": "no",
    #     "q4": "no",
    #     "q5": "no",
    # }
    #
    # resp = requests.post(URL, json=params, headers=headers)
    # print(resp.text)

####View Dashboard

    # URL = "http://127.0.0.1:8000/api/dashboard/"
    #
    # headers = {"Accept": "application/json", "Authorization": "Token 9c2db70465a10b5c494703a99d2b9c162099b5ae"}
    #
    #
    # resp = requests.get(URL, headers=headers)
    # print(resp.text)
    #

####Logout

    URL = "http://127.0.0.1:8000/api/auth/logout/"

    headers = {"Accept": "application/json", "Authorization": "Token 9c2db70465a10b5c494703a99d2b9c162099b5ae"}

    resp = requests.get(URL, headers=headers)
    print(resp.text)


