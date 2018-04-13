from flask import Flask, render_template, redirect, url_for, request
import utils.trees as trees

app = Flask(__name__)

#home page?
@app.route('/')
def home():
    return render_template("map.html", trees=trees.jsonString)

#This will be requested by map.html
@app.route('/treedots.js')
def jsfile():
    return render_template("treedots.js", trees=trees.jsonString)

if __name__ == "__main__":
    app.debug = True
    app.run()
