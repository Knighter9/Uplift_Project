import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    SECRET_KEY = "you-will-never-guess"
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(basedir, "Uplift-test-4-db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # UPLOAD_FOLDER = "uplift/file_folder/videos/posts"
    UPLOAD_FOLDER = "uplift/static/videos/posts"
    ALLOWED_EXTENTIONS = {"mp4"}

