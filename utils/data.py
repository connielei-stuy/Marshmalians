import csv
import json


#This variable is private, use the getJson() method to access it
cache = {}

def getJson(name):
    if name in cache:
        return cache[name]
    else:
        return "[]"

def getData(name):
    return json.loads(getJson(name))

#Stores the contents of a csv file (fileName, beginning with "data/") as a json string; use getJson(keyName) to access the data
def load(fileName, keyName):
    # Load csv file into a list of dictionaries; the key names are the column names from the first row
    csvFile = open(fileName)
    reader = csv.DictReader(csvFile)
    rowList = []
    for row in reader:
        rowList.append(row)
    csvFile.close()
    #now convert to json and store as string
    cache[keyName] = json.dumps(rowList)

#Shazam "I will be with you again"
#example: count("trees", "spc_latin") -> {Homo Sapiens: 4, Canas Lupus: 0}
def count(fileKeyName, column, filter=lambda x: True):
    array = getData(fileKeyName)
    amounts = {}
    for row in array:
        if filter(row) == True:
            value = row[column]
            if value in amounts:
                amounts[value] += 1
            else:
                amounts[value] = 1
    return amounts
