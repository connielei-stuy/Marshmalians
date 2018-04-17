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

@app.route('/about')
def about_page():
    return render_template("about.html")

if __name__ == "__main__":
    data.load("data/2015_small.csv", "trees")
    app.debug = True
    app.run()
