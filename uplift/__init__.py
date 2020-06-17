from flask import Flask

# import the congig class
from config import Config
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from flask_login import LoginManager
from flask_session import Session

# create the flask application
app = Flask(__name__)
app.config.from_object(Config)

# configure session to user filesystem
"""
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesytem"
Session(app)
"""
# creae an engine
db = SQLAlchemy(app)
# migrate the changes to the app
migrate = Migrate(app, db)
# set up the login manager
login = LoginManager(app)
# function to handel the login
login.login_view = "users.login"

# register the blueprints
from uplift import models
from uplift.users.routes import users
from uplift.main.routes import main


app.register_blueprint(main)
app.register_blueprint(users)
