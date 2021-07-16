
import requests

api_key = "Token dc1430ffc2fb61567ca00ebcfd36ebebd8d541e1"

headers = {
	"Authorization" : api_key,
}
data = {
		"username" : "onanadonald@gmail.com",
		"password" : "1234",}

r = requests.post("http://127.0.0.1:8000/api/api-token-auth/" , data = data )

print(r.status_code)
print('----------------')
print(r.reason)
print('----------------')
print(r.text)
