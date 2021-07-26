import random
import json
import datetime
import requests


with open("incident.json", "r", encoding="UTF-8") as handle:
    parsed = json.load(handle)
incident_data = parsed

api_key = "Token 49a765a550133c659208b5edaf129616059430ae"

headers = {
    "Authorization": api_key,
}
j = 0
for incident in incident_data:
    id = ""
    r = requests.get(
        "http://127.0.0.1:8000/api/category/?name=" + incident["Category"],
        headers=headers,
    )
    reponse = r.json()
    for i in reponse:
        id = i["id"]
    data = {
        "user": random.randint(1, 100),
        "title": incident["title"],
        "locations": json.dumps(incident["location"]),
        "start_date": datetime.datetime.strptime(incident["start_date"], "%d/%m/%Y"),
        "declared_at": datetime.datetime.strptime(incident["declared_at"], "%d/%m/%Y"),
        "category": int(id),
    }
    #
    r = requests.post("http://127.0.0.1:8000/api/incident/", data=data, headers=headers)
    print("Add ", j, "with statut code : ", r.status_code)
    j = j + 1
