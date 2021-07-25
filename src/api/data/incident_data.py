import random
import json
import datetime


with open('ville.json' , 'r', encoding="UTF-8") as handle:
	parsed = json.load(handle)
ville = parsed

with open('incidents_data.json' , 'r', encoding="UTF-8") as handle:
	parsed = json.load(handle)
incident_data = parsed

category_incident = []

for cle in incident_data["categories"]:
    category_incident.append(cle)


lc = len(category_incident)

lv = len(ville)

start_date = datetime.datetime(2020, 1, 1)
end_date = datetime.datetime(2021, 4, 1)
time_between_dates = end_date - start_date
days_between_dates = time_between_dates.days

listIncident = []

for i in range(10):
    incident = {}
    location = {}

    i = random.randint(0,lc-1)
    nomCat = category_incident[i]
    incident["Category"] = nomCat
    accCat = incident_data["categories"][nomCat]
    lacc = len(accCat)
    j = random.randint(0,lacc-1)
    incident["title"] = accCat[j]
    tv = random.randint(0,lv-1)
    location["city"] = ville[tv]
    location["country"] = "Cameroun"
    incident["location"] = location
    random_number_of_days = random.randrange(days_between_dates)
    random_date = start_date + datetime.timedelta(days=random_number_of_days)
    incident["start_date"] = random_date.strftime("%d/%m/%Y")
    incident["declared_at"] = (random_date + datetime.timedelta(days=random.randrange(3))).strftime("%d/%m/%Y")
    listIncident.append(incident)


for u in listIncident:
    print(u)
#
with open("incident.json", "w", encoding="UTF-8") as writeJSON:
	json.dump(listIncident, writeJSON, ensure_ascii=False)
print("end...")
