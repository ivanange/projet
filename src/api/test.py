
import requests
from requests_toolbelt.multipart.encoder import MultipartEncoder
import json

api_key = "Token 3de789b352044c91150dfc327c689176ab2be915"

headers = {
	"Authorization" : api_key,
}
data = {
		"decision" : "CNF",
		"incident" : 1,}
# multipart_data = MultipartEncoder(
#  fields={
	
# 	"phone" : "+23845697",
# 	"username" : "+23861113",
# 	"password" : "1234",
# 	"name" : "jadon",
# 	"email" : "sancho@gmail.com",
# 	"avatar" : ('4.jpg', open('4.jpg', 'rb'), 'text/plain'),
# }

# )

# r = requests.post("http://127.0.0.1:8000/api/profile/" ,  data=multipart_data,
#                   headers={'Content-Type': multipart_data.content_type} )

r = requests.get("http://127.0.0.1:8000/api/incident", headers = headers, data = data)

print(r.status_code)
print('----------------')
print(r.reason)
print('----------------')
print(r.text)


