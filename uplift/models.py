from uplift import db, login
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

# user loading function
@login.user_loader
def load_user(id):
    return User.query.get(int(id))


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True, nullable=False)
    email = db.Column(db.String(120), index=True, unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f"User ({self.username})"


class Channel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    channel_name = db.Column(db.String(120), unique=True, nullable=False)
    about = db.Column(db.String(500), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    num_users = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f"{self.channel_name}"


class Channel_Members(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    channel_id = db.Column(db.Integer, db.ForeignKey("channel.id"))


class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    channel_id = db.Column(db.Integer, db.ForeignKey("channel.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    title = db.Column(db.String(128), nullable=False)
    post_content = db.Column(db.String(40000))
    image_file = db.Column(db.String(128))
    video_file = db.Column(db.String(128))
    num_likes = db.Column(db.Integer)
    num_dislikes = db.Column(db.Integer)
    num_comments = db.Column(db.Integer)


class Comments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String(1000), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    post_id = db.Column(db.Integer, db.ForeignKey("post.id"))
    num_likes = db.Column(db.Integer)
    num_dislikes = db.Column(db.Integer)
    num_replies = db.Column(db.Integer)

    def __repr__(self):
        return f"comment: {self.comment}"


"""class Reply_Comments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    main_comment = db.Column(db.Integer, db.ForeignKey("comments.id"))
    comment_replied_to = db.Column(db.Integer, db.ForeignKey("reply__to__comments.id"))
"""


class Reply_To_Comments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    main_comment = db.Column(db.Integer, db.ForeignKey("comments.id"))
    comment_replied_to = db.Column(db.Integer, db.ForeignKey("reply__to__comments.id"))
    reply = db.Column(db.String(1000))
    reply_user_id = db.Column(db.Integer, db.ForeignKey("user.id"))

    def __repr__(self):
        return f"reply_comment: {self.reply}"


"""

class Reply_To_Comments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    reply = db.Column(db.String(1000), nullable=False)
    comment_id = db.Column(db.Integer, db.ForeignKey("comments.id"), nullable=False)
    reply_user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    post_id = db.Column(db.Integer, db.ForeignKey("post.id"))


class Reply_To_Reply_Comments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    reply_to_reply = db.Column(db.String(1000))
    reply_reply_user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    reply_id = db.Column(db.Integer, db.ForeignKey("reply__to__comments.id"))
"""


class Likes_Dislikes(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey("post.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    like = db.Column(db.Boolean, nullable=False)
    dislike = db.Column(db.Boolean, nullable=False)

