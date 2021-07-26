import names
import random
import string
import json

# for i in range(3):
#     print(names.get_first_name().lower())
lower = string.ascii_lowercase
upper = string.ascii_uppercase
num = string.digits
symbols = string.punctuation
all = lower + upper + num + symbols
global listPhone
listPhone = []

def buildEmail(first_name , last_name):
    return first_name+last_name+"@gmail.com"

def buildPhone():
    bool = True
    while bool:
        bool = False
        p = []
        operateur = ["9", "7", "5", "6"]
        i = random.randint(0,3)
        op = operateur[i]
        randomlist = random.sample(range(0, 9), 7)
        for value in randomlist:
            p.append(str(value))
        phone = "".join(p)
        phone = "+237"+"6"+op+phone
        if phone in listPhone:
            bool = True
        listPhone.append(phone)
    return phone



userlist = []


for i in range(100):
    user = {}
    first = names.get_first_name().lower()
    last = names.get_last_name().lower()
    user["email"] = buildEmail(first, last)
    user["name"] = last
    temp = random.sample(all,6)
    user["password"] = "".join(temp)
    user["phone"] = buildPhone()
    userlist.append(user)

for u in userlist:
    print(u)

with open("user.json", "w") as writeJSON:
	json.dump(userlist, writeJSON, ensure_ascii=False)
print("end...")
