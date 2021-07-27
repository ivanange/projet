import random
import json
import datetime
import requests


with open('user.json' , 'r', encoding="UTF-8") as handle:
	parsed = json.load(handle)
users = parsed

i = 1
for user in users :
    data = {
		"phone" : user["phone"],
	    "password" : user["password"],
	    "name" : user["name"],}
    r = requests.post("http://127.0.0.1:8000/api/profile/", data = data)
    print("Add ",i,"with statut code : " , r.status_code)
    i = i + 1
