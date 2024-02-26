import json
import requests

#3637285642ffda9987d8f25507f79b5cded94442
if __name__ == '__main__':


####Register

    # URL = "https://healthydaytoday1.pythonanywhere.com/api/auth/register/"
    # params = {
    #     "username": "username1",
    #     "password": "passwor1",
    #     "email": "email@gmail.com"
    # }
    
    
    # resp = requests.post(URL, json=params)
    # print(resp.text)



####Login to get Token

    # URL = "https://healthydaytoday1.pythonanywhere.com/api/auth/login/"
    # params = {
    #     "username": "username1",
    #     "password": "password1",
    # }
    
    # resp = requests.post(URL, json=params)
    # print(resp.text)



# ####View Hello World
#
    # URL = "https://healthydaytoday1.pythonanywhere.com/api/hello/"

    # headers = {"Accept": "application/json", "Authorization": "Token 605c19ed8edbd76c184ee00d2c7101bbc344491d"}


    # resp = requests.get(URL, headers=headers)
    # print(resp.text)

####View Profile

    # URL = "https://healthydaytoday1.pythonanywhere.com/api/profile/"
    #
    # headers = {"Accept": "application/json", "Authorization": "Token a139b0586b747e6c8efc8b00f5be5ce64c129fcc"}
    #
    #
    # resp = requests.get(URL, headers=headers)
    # print(resp.text)

####Add Profile


    # URL = "https://healthydaytoday1.pythonanywhere.com/api/profile/"
    #
    # headers = {"Accept": "application/json", "Authorization": "Token a139b0586b747e6c8efc8b00f5be5ce64c129fcc"}
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

    # URL = "https://healthydaytoday1.pythonanywhere.com/api/calories/"
    
    # headers = {"Accept": "application/json", "Authorization": "Token 899d1dc2f11cd3a3c8937fb9951c06cf8c2ebc5b"}
    
    
    # resp = requests.get(URL, headers=headers)
    # print(resp.text)

####Add Calories
    # URL = "https://healthydaytoday1.pythonanywhere.com/api/calories/"
    
    # headers = {"Accept": "application/json", "Authorization": "Token 899d1dc2f11cd3a3c8937fb9951c06cf8c2ebc5b"}
    # params = {
    #     "user":"no",
    #     "title":"Micro M",
    #     "date":"2022-02-08",
    #     "calories":"1000",
    # }
    
    # resp = requests.post(URL, json=params, headers=headers)
    # print(resp.text)


    #####[{"id":1,"user":"username1","title":"Micro M","date":"2022-02-08","calories":1000}]

####delete Calories

    # URL = "https://healthydaytoday1.pythonanywhere.com/api/calories/1/delete"
    
    # headers = {"Accept": "application/json", "Authorization": "Token 9400953c73865f820fdaa4bc528b2ad4c95bc412"}
    # resp = requests.delete(URL, headers=headers)
    # print(resp.text)
    # print(resp.status_code)  


####View Predictions

    # URL = "https://healthydaytoday1.pythonanywhere.com/api/predictions/"
    
    # headers = {"Accept": "application/json", "Authorization": "Token 605c19ed8edbd76c184ee00d2c7101bbc344491d"}
    
    
    # resp = requests.get(URL, headers=headers)
    # print(resp.text)

####Add Predictions
    # URL = "https://healthydaytoday1.pythonanywhere.com/api/predictions/"
    
    # headers = {"Accept": "application/json", "Authorization": "Token 605c19ed8edbd76c184ee00d2c7101bbc344491d"}
    # params = {
    #     "user":"no",
    #     "prediction":"You have less than 30 % chances to lose at least 5 kg of your weight in a month!",
    
    # }
    
    # resp = requests.post(URL, json=params, headers=headers)
    # print(resp.text)


####View Model

    # URL = "https://healthydaytoday1.pythonanywhere.com/api/model/"
    #
    # headers = {"Accept": "application/json", "Authorization": "Token a139b0586b747e6c8efc8b00f5be5ce64c129fcc"}
    #
    #
    # resp = requests.get(URL, headers=headers)
    # print(resp.text)

####Add Model
    # URL = "https://healthydaytoday1.pythonanywhere.com/api/model/"
    #
    # headers = {"Accept": "application/json", "Authorization": "Token a139b0586b747e6c8efc8b00f5be5ce64c129fcc"}
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

    URL = "https://healthydaytoday1.pythonanywhere.com/api/dashboard/"
    
    headers = {"Accept": "application/json", "Authorization": "Token 9400953c73865f820fdaa4bc528b2ad4c95bc412"}
    
    
    resp = requests.get(URL, headers=headers)
    print(resp.text)
    # {"7days":["2022-02-12","2022-02-11","2022-02-10","2022-02-09","2022-02-08","2022-02-07","2022-02-06"],"7calories":[455,0,0,0,0,0,0],"2month":[2,1],"2calories":[455,0],"total_unhealthy":null,"total_healthy":455,"total_moderate":null}

####Logout

    # URL = "https://healthydaytoday1.pythonanywhere.com/api/auth/logout/"

    # headers = {"Accept": "application/json", "Authorization": "Token e32e83d2011924188c504c3e75ecd5c487835a5b"}

    # resp = requests.get(URL, headers=headers)
    # print(resp.status_code)    
    # print(resp.text)


