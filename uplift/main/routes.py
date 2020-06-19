from flask import render_template, request, Blueprint, url_for, jsonify
from flask_login import login_required


main = Blueprint("main", __name__)


@main.route("/")
def index():
    print("i am rendering the template again now")
    return render_template("index.html")


@main.route("/explore", methods=["GET", "POST"])
@login_required
def explore():
    if request.method == "GET":
        return render_template("index.html")

    elif request.method == "POST":
        print("what is up with you")
        data = {
            "success": True,
            "channels": [
                "test1",
                "test32",
                "test3",
                "test5",
                "test5",
                "test6",
                "test7",
                "test8",
                "test9",
                "test10",
            ],
        }
        return jsonify(data)
