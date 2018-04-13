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