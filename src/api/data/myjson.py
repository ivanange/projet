<<<<<<< HEAD:src/api/myjson.py
import json

with open('incident.json' , 'r',  encoding="UTF-8") as handle:
	parsed = json.load(handle)
	print(json.dumps(parsed, indent = 4))
=======
import json

with open('incident.json' , 'r',  encoding="UTF-8") as handle:
	parsed = json.load(handle)
	print(json.dumps(parsed, indent = 4))
>>>>>>> f0b963e7ff065f305589b21a46a9046c84bd9fd5:src/api/data/myjson.py
