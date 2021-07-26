import random
import json
import datetime
import requests

with open("incidents_data.json", "r", encoding="UTF-8") as handle:
    parsed = json.load(handle)
incident_data = parsed

api_key = "Token 49a765a550133c659208b5edaf129616059430ae"

headers = {
    "Authorization": api_key,
}
i = 1
for cle in incident_data["categories"]:
    # category_incident.append(cle)
    print(cle)
    data = {
        "name": str(cle),
    }
    r = requests.post("http://127.0.0.1:8000/api/category/", headers=headers, data=data)
    print("Add ", i, "with statut code : ", r.status_code)
    i = i + 1