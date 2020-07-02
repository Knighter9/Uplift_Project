from flask import (
    render_template,
    request,
    Blueprint,
    jsonify,
    json,
    redirect,
    url_for,
)
from .utils import verify_registration
from uplift.models import User
from uplift import db
from werkzeug.security import check_password_hash, generate_password_hash
from flask_login import login_user, logout_user, current_user, login_required

users = Blueprint("users", __name__)


@users.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        username = request.form.get("username")
        email = request.form.get("email")
        password = request.form.get("password")
        password_confirm = request.form.get("password_confirm")

        # query for the user
        response = verify_registration(
            route="register",
            username=username,
            password=password,
            password_confirm=password_confirm,
            email=email,
        )
        if response == True:
            # query for the user
            user = User.query.filter_by(username=username).first()
            print(user)
            if user:
                return jsonify(
                    {
                        "success": False,
                        "username_taken": "The username has already been taken please select a new one",
                    }
                )
            else:
                # register the user
                hash_pass = generate_password_hash(password)
                new_user = User(
                    username=username, password_hash=hash_pass, email=email,
                )
                db.session.add(new_user)
                db.session.commit()

                # return data for the ajax call
                return jsonify({"success": True, "username": username})
        else:
            return jsonify(response)

    elif request.method == "GET":
        url_request = "/register"
        return render_template("index.html", url=url_request)


@users.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form.get("username")
        print(username)
        password = request.form.get("password")
        print(password)

        user = User.query.filter_by(username=username).first()
        test = User.query.all()
        print(test)

        if user:
            # check the password
            print(user.password_hash)
            pass_check = check_password_hash(user.password_hash, password)
            if pass_check:
                print("The passwords are the same")
                login_user(user)
                return jsonify({"success": True, "username": username})
            else:
                return jsonify(
                    {
                        "success": False,
                        "password_error": "The password doesn't match the account",
                    }
                )

        return jsonify(
            {
                "success": False,
                "username_error": "There is no account registered with the username entered",
            }
        )

    elif request.method == "GET":
        url_request = "/login"
        return render_template("index.html", url=url_request)


@users.route("/logout", methods=["GET", "POST"])
def logout():
    if request.method == "GET":
        return render_template("index.html")

    if request.method == "POST":
        print("This should be firing")
        logout_user()
        print("The user has been logged out")
        return redirect(url_for("main.index"))
