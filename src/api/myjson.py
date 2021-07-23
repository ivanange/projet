import json

with open('incident.json' , 'r', encoding="utf-8") as handle:
	parsed = json.load(handle)
	print(json.dumps(parsed, indent = 4))
