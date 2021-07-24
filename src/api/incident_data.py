import random
import json


incident_title = ["vol à mokolo" , "accident de circulation à ngoussou", "viol sur mineur" , "accident de circulation à obala", "vol à main armée" , "agression à main armé" , "Incendie volontaire", "Voyeurisme" ,   "accident de circulation à ngoussou",
"Incendie volontaire marché central" ,  "Incendie marché nsam", "Exhibition sexuelle" , "Voyeurisme", "Voyeurisme" , "Abus de biens sociaux", "L’homicide" ]


listIncident = []

for i in range(10):
    incident = {}
    incident["user"] = random.randint(1,10)
    i=random.randint(1,10)
    incident["title"] = incident_title[i]
    listIncident.append(incident)
    incident["declared_at"] = now = datetime.now()



for u in listIncident:
    print(u)

with open("incident.json", "w") as writeJSON:
	json.dump(listIncident, writeJSON, ensure_ascii=False)
print("end...")
