import random
import json
import datetime
import requests


with open("incident.json", "r", encoding="UTF-8") as handle:
    parsed = json.load(handle)
incident_data = parsed

api_key = "Token 93184645684125f676574fbacf1ac0a68b45e902"

headers = {
    "Authorization": api_key,
}
j = 0
for incident in incident_data:
    id = 0
    r = requests.get(
        "http://127.0.0.1:8000/api/category/?name=" + incident["Category"],
        headers=headers,
    )
    for d in r.json():
        # print(d)
        id = d["id"]
    data = {
        "user": random.randint(1, 100),
        "title": incident["title"],
        "locations": json.dumps(incident["location"]),
        "start_date": datetime.datetime.strptime(incident["start_date"], "%d/%m/%Y"),
        "declared_at": datetime.datetime.strptime(incident["declared_at"], "%d/%m/%Y"),
        "category": id,
    }
    #
    r = requests.post("http://127.0.0.1:8000/api/incident/", data=data, headers=headers)
    print("Add ", j, "with statut code : ", r.status_code)
    print(r.reason)
    j = j + 1
