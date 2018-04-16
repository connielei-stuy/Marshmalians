import csv
import json

# Load csv file into a list of dictionaries; the key names are the column names from the first line of the csv file
treeFile = open("data/2015_small.csv", "rb")
reader = csv.DictReader(treeFile)
treeList = []
for row in reader:
    treeList.append(row)
treeFile.close()

#now convert to json
jsonString = json.dumps(treeList)
#access the above variable from anywhere by doing trees.jsonString


#This variable is private, use the getJson() method to access it
cache = {}

def getJson(name):
    if name in cache:
        return cache[name]
    else:
        return "[]"

#Stores the contents of a csv file (fileName, beginning with "data/") as a json string; use getJson(keyName) to access the data
def load(fileName, keyName):
    csvFile = open(fileName)
    reader = csv.DictReader(csvFile)
    rowList = []
    for row in reader:
        rowList.append(row)
    csvFile.close()
    cache[keyName] = json.dumps(rowList)
