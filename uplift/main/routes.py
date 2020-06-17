from flask import render_template, request, Blueprint, url_for
from flask_login import login_required


main = Blueprint("main", __name__)


@main.route("/")
def index():
    print("i am rendering the template again now")
    return render_template("index.html")


@main.route("/home", methods=["GET", "POST"])
@login_required
def home():

    if request.method == "GET":
        return render_template("index.html")

    elif request.method == "POST":
        print("what is up with you")
