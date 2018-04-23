from flask import Flask, render_template, redirect, url_for, request, Response
import utils.data as data

app = Flask(__name__)

#Home Page and also the About Page
@app.route('/')
def about_page():
    return render_template("about.html")

#A Map of our data
@app.route('/charts/map.html')
def home():
    return render_template("map.html")

#This will be requested by map.html
@app.route('/scripts/treedots.js')
def jsfile():
    return Response(render_template("treedots.js",
                                    trees=data.getJson("trees"),
                                    homeless=data.getJson("shelters"),
                                    rats = data.getJson("rats")),
                    mimetype="text/javascript")

#Analyzes statistics on each borough
@app.route('/charts/boroughs.html')
def compare_parish():
    return render_template("borough.html", borough=request.args.get("city", "nyc"))

#This will be used to generate responsive charts in the boroughs page
@app.route('/scripts/boroughs.js', methods=["GET", "POST"])
def jsfile2():
    where = request.args.get("city", "nyc")
    speciesSums = data.count("trees", "spc_latin", filter=lambda row: row['boroname'].lower() == where.lower() or where.lower() == "nyc")
    diameters = data.count("trees", "tree_dbh", filter=lambda row: row['boroname'].lower() == where.lower() or where.lower() == "nyc")
    return Response(render_template("stats.js", species=speciesSums, borough=where, diameters=diameters), mimetype="text/javascript")

#Displays scatter plots?
@app.route('/charts/plot.html')
def zipcodes():
    trees_by_zip = data.count("trees2", "zipcode")
    fires_by_zip = data.count("fires", "ZIPCODE")
    return render_template("zipcodes.html", trees=trees_by_zip, fires=fires_by_zip)

if __name__ == "__main__":
    data.load("data/trees_1k_2015.csv", "trees")
    data.load("data/trees_10k_2015.csv", "trees2")
    data.load("data/housefires.csv", "fires")
    data.load("data/homeless_shelters.csv", "shelters")
    data.load("data/rat_sightings_2015.csv", "rats")
    app.debug = True
    app.run()
