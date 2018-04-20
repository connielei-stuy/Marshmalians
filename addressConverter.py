import requests

def convert(s):
    address_sep = '+'.join(s.split(' '))
    response = requests.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address_sep )
    resp_json_payload = response.json()
    print(resp_json_payload['results'][0]['geometry']['location'])


#s is the address you wanna convert 
