import http.client

conn = http.client.HTTPSConnection("sportspage-feeds.p.rapidapi.com")

headers = {
    'X-RapidAPI-Key': "77ece1892bmshd978e6e62ba172cp19d063jsn29603d098b67",
    'X-RapidAPI-Host': "sportspage-feeds.p.rapidapi.com"
}

conn.request("GET", "/teams?league=NFL", headers=headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))