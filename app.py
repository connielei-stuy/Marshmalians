from flask import Flask, render_template, redirect, url_for, request
import utils.data as data

app = Flask(__name__)

#home page?
@app.route('/')
def home():
    return render_template("map.html", trees=data.jsonString)

#This will be requested by map.html
@app.route('/treedots.js')
def jsfile():
    return render_template("treedots.js", trees=data.jsonString)

if __name__ == "__main__":
    app.debug = True
    app.run()
