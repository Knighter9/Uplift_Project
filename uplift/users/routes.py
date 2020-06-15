from flask import render_template, request, Blueprint, jsonify, json

users = Blueprint("users", __name__)


@users.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        username = request.form.get("username")
        email = request.form.get("email")
        password = request.form.get("password")
        password_confirm = request.form.get("password_confirm")
        print(username)
        print(password)
        print(email)
        print(password_confirm)
        return jsonify({"success": True, "username": username})

    elif request.method == "GET":
        url_request = "/register"
        return render_template("index.html", url=url_request)


@users.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        print("I am working on this")

    elif request.method == "GET":
        url_request = "/login"
        return render_template("index.html", url=url_request)
