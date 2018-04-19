from flask import Flask, render_template, redirect, url_for, request, Response
import utils.data as data

app = Flask(__name__)

#home page?
@app.route('/')
def home():
    return render_template("map.html", trees=data.getJson("trees"))

#This will be requested by map.html
@app.route('/treedots.js')
def jsfile():
    return Response(render_template("treedots.js", trees=data.getJson("trees")), mimetype="text/javascript")

@app.route('/charts/boroughs.html')
def compare_parish():
    return render_template("borough.html")

#This will be used to generate responsive charts
@app.route('/stats.js')
def jsfile2():
    return Response(render_template("stats.js", data="[]"), mimetype="text/javascript")

if __name__ == "__main__":
    data.load("data/trees_1k_2015.csv", "trees")
    app.debug = True
    app.run()
