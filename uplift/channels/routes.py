from flask import (
    render_template,
    request,
    Blueprint,
    jsonify,
    json,
    redirect,
    url_for,
    send_file,
    send_from_directory,
)
from uplift.models import User, Channel, Channel_Members, Post, Comments, Likes_Dislikes
from uplift import db
from flask_login import current_user, login_required
from config import Config
from werkzeug.utils import secure_filename
import os
from uplift import app
from pathlib import Path

channels = Blueprint("channels", __name__)


@channels.route("/explore/channel/<string:channel_name>", methods=["GET", "POST"])
@login_required
def channel(channel_name):
    print(channel_name)
    if request.method == "GET":
        print("A get request has been called on this route")
        # query the database to see if the channel exits
        return render_template("index.html")

    elif request.method == "POST":
        print("A post request has ben made")
        # query the database to see if the channel exits
        channel_name = request.form.get("channel_name")
        # query the database to see if the channel exits
        channel = Channel.query.filter_by(channel_name=channel_name).first()
        if channel:
            print("This should work")
            # Channel_Joined = Channel.query.join(Channel_Members, (Channel_Members.channel_id == channel.id)).join(User, (User.id == current_user.id))
            channel_joined = Channel_Members.query.filter_by(
                channel_id=channel.id, user_id=current_user.id
            ).all()
            if channel_joined:
                print("The user has joined the channel")
                return jsonify(
                    {
                        "success": True,
                        "about": channel.about,
                        "num_users": channel.num_users,
                        "channel_name": channel.channel_name,
                        "joined": True,
                    }
                )
            else:
                print("The user hasn't joined the channel")
                return jsonify(
                    {
                        "success": True,
                        "about": channel.about,
                        "num_users": channel.num_users,
                        "channel_name": channel.channel_name,
                        "joined": False,
                    }
                )

        else:
            print("The channel is not available")
            return jsonify({"success": False})


def check_like(post_like):
    if post_like == True:
        return True

    else:
        return False


@channels.route("/explore/channel/<string:channel_name>/posts", methods=["POST", "GET"])
@login_required
def channel_posts(channel_name):
    print(f"The name of the channel for the posts is {channel_name}")
    print("---------------------------------------------------------")

    if request.method == "POST":

        # first query so see if the channel exists
        channel = Channel.query.filter_by(channel_name=channel_name).first()
        if channel:
            # query for the posts
            """
            posts = (
                Post.query.filter_by(channel_id=channel.id)
                .join(User, (User.id == Post.user_id))
                .add_columns(
                    User.username,
                    Post.id,
                    Post.title,
                    Post.channel_id,
                    Post.user_id,
                    Post.post_content,
                    Post.video_file,
                    Post.image_file,
                    Post.num_likes,
                    Post.num_comments,
                    # Comments.comment,
                )
                .all()
            )
            """

            posts = (
                Post.query.filter_by(channel_id=channel.id)
                .join(User, (User.id == Post.user_id))
                .add_columns(
                    User.username,
                    Post.id,
                    Post.title,
                    Post.channel_id,
                    Post.user_id,
                    Post.post_content,
                    Post.video_file,
                    Post.image_file,
                    Post.num_likes,
                    Post.num_comments,
                    # Comments.comment,
                )
                .outerjoin(
                    Likes_Dislikes,
                    (
                        Likes_Dislikes.post_id == Post.id
                        and Likes_Dislikes.user_id == current_user.id
                    ),
                )
                .add_columns(
                    Likes_Dislikes.id,
                    Likes_Dislikes.post_id,
                    Likes_Dislikes.user_id,
                    Likes_Dislikes.like,
                    Likes_Dislikes.dislike,
                )
                .all()
            )

            posts_list = []
            i = 0
            for post in posts:
                i += 1
                print(i)
                if post.video_file != "" and post.video_file != None:

                    # file_path = "C:\\Users\\knigh\\Desktop\\uplift_1\\uplift\\file_folder\\videos\\posts\\"
                    if post.like or post.dislike:
                        print("------------------------------------")
                        print("The current user has liked the post")
                        if post.like == True:
                            post_object = {
                                "type": "video",
                                "username": post.username,
                                "title": post.title,
                                "video_file": post.video_file,
                                "num_likes": post.num_likes,
                                "num_comments": post.num_comments,
                                "liked_disliked": "liked",
                            }
                            posts_list.append(post_object)
                            print(post.username)
                            print(post.title)
                            print(post.num_likes)
                            print(post.num_comments)
                            print("------------------------------------")
                        elif post.dislike == True:
                            post_object = {
                                "type": "video",
                                "username": post.username,
                                "title": post.title,
                                "video_file": post.video_file,
                                "num_likes": post.num_likes,
                                "num_comments": post.num_comments,
                                "liked_disliked": "disliked",
                            }
                            posts_list.append(post_object)
                            print(post.username)
                            print(post.title)
                            print(post.num_likes)
                            print(post.num_comments)
                            print("------------------------------------")
                    else:
                        post_object = {
                            "type": "video",
                            "username": post.username,
                            "title": post.title,
                            "video_file": post.video_file,
                            "num_likes": post.num_likes,
                            "num_comments": post.num_comments,
                            "liked_disliked": False,
                        }
                        posts_list.append(post_object)
                        print(post.username)
                        print(post.title)
                        print(post.num_likes)
                        print(post.num_comments)
                        print("------------------------------------")

                else:
                    if post.like or post.dislike:
                        print("------------------------------------")
                        print("The current user has liked the post")

                        if post.like == True:
                            post_object = {
                                "type": "text",
                                "username": post.username,
                                "title": post.title,
                                "post_content": post.post_content,
                                "num_likes": post.num_likes,
                                "num_comments": post.num_comments,
                                "liked_disliked": "liked",
                            }
                            posts_list.append(post_object)
                            print(post.username)
                            print(post.title)
                            print(post.post_content)
                            print(post.num_likes)
                            print(post.num_comments)
                            print("------------------------------------")
                        elif post.dislike == True:
                            post_object = {
                                "type": "text",
                                "username": post.username,
                                "title": post.title,
                                "post_content": post.post_content,
                                "num_likes": post.num_likes,
                                "num_comments": post.num_comments,
                                "liked_disliked": "disliked",
                            }
                            posts_list.append(post_object)
                            print(post.username)
                            print(post.title)
                            print(post.post_content)
                            print(post.num_likes)
                            print(post.num_comments)
                            print("------------------------------------")
                    else:
                        post_object = {
                            "type": "text",
                            "username": post.username,
                            "title": post.title,
                            "post_content": post.post_content,
                            "num_likes": post.num_likes,
                            "num_comments": post.num_comments,
                            "liked_disliked": False,
                        }
                        posts_list.append(post_object)
                        print(post.username)
                        print(post.title)
                        print(post.post_content)
                        print(post.num_likes)
                        print(post.num_comments)
                        print("------------------------------------")

            return jsonify({"success": True, "posts": posts_list})

        return jsonify({"success": False, "Error": "The channel isn't available"})

    else:
        print("The user is accessing the get request route")
        return render_template("index.html")


@channels.route(
    "/explore/channel/<string:channel_name>/posts/<string:post_title>",
    methods=["POST", "GET"],
)
@login_required
def channel_individual_post(channel_name, post_title):
    if request.method == "POST":
        print("The user wants to get the post route")
        print(post_title)
        print(post_title)
        if "%20" in post_title:
            post_title = post_title.replace("%20", " ")

        print(post_title)
        # query the database to see if the channel exists
        channel = Channel.query.filter_by(channel_name=channel_name).first()

        if channel:
            print("The channel has been found")
            # query for the post
            post = (
                Post.query.filter_by(channel_id=channel.id)
                .filter_by(title=post_title)
                .join(User, (User.id == Post.user_id))
                .add_columns(
                    User.username,
                    Post.title,
                    Post.post_content,
                    Post.num_likes,
                    Post.num_comments,
                    Post.id,
                )
                .outerjoin(
                    Likes_Dislikes,
                    (
                        Likes_Dislikes.user_id == current_user.id
                        and Likes_Dislikes.post_id == Post.id
                    ),
                )
                .add_columns(
                    Likes_Dislikes.like,
                    Likes_Dislikes.dislike,
                    Likes_Dislikes.id,
                    Likes_Dislikes.post_id,
                    Likes_Dislikes.user_id,
                )
                .first()
            )

            if post:
                print("The post has been found")

                if post.like or post.dislike:

                    if post.like == True:
                        # list for the comments to be added to
                        post_comments_list = []
                        post_data = {
                            "username": post.username,
                            "title": post.title,
                            "post_content": post.post_content,
                            "num_comments": post.num_comments,
                            "num_likes": post.num_likes,
                            "liked_disliked": "liked",
                        }
                        # query for the channels associated with the post
                        post_comments = (
                            Comments.query.filter_by(post_id=post.id)
                            .join(User, (User.id == Comments.user_id))
                            .add_columns(User.username, Comments.comment)
                            .all()
                        )

                        for comment in post_comments:
                            comment_object = {
                                "username": comment.username,
                                "comment": comment.comment,
                            }
                            print(comment.username)
                            print(comment.comment)

                            # insert the comment object into the comment list
                            post_comments_list.append(comment_object)

                        return jsonify(
                            {
                                "success": True,
                                "post_data": post_data,
                                "comments": post_comments_list,
                            }
                        )

                    elif post.dislike == True:

                        # list for the comments to be added to
                        post_comments_list = []
                        post_data = {
                            "username": post.username,
                            "title": post.title,
                            "post_content": post.post_content,
                            "num_comments": post.num_comments,
                            "num_likes": post.num_likes,
                            "liked_disliked": "disliked",
                        }
                        # query for the channels associated with the post
                        post_comments = (
                            Comments.query.filter_by(post_id=post.id)
                            .join(User, (User.id == Comments.user_id))
                            .add_columns(User.username, Comments.comment)
                            .all()
                        )

                        for comment in post_comments:
                            comment_object = {
                                "username": comment.username,
                                "comment": comment.comment,
                            }
                            print(comment.username)
                            print(comment.comment)

                            # insert the comment object into the comment list
                            post_comments_list.append(comment_object)

                        return jsonify(
                            {
                                "success": True,
                                "post_data": post_data,
                                "comments": post_comments_list,
                            }
                        )
                else:
                    # list for the comments to be added to
                    post_comments_list = []
                    post_data = {
                        "username": post.username,
                        "title": post.title,
                        "post_content": post.post_content,
                        "num_comments": post.num_comments,
                        "num_likes": post.num_likes,
                        "liked_disliked": False,
                    }
                    # query for the channels associated with the post
                    post_comments = (
                        Comments.query.filter_by(post_id=post.id)
                        .join(User, (User.id == Comments.user_id))
                        .add_columns(User.username, Comments.comment)
                        .all()
                    )

                    for comment in post_comments:
                        comment_object = {
                            "username": comment.username,
                            "comment": comment.comment,
                        }
                        print(comment.username)
                        print(comment.comment)

                        # insert the comment object into the comment list
                        post_comments_list.append(comment_object)

                    return jsonify(
                        {
                            "success": True,
                            "post_data": post_data,
                            "comments": post_comments_list,
                        }
                    )

            else:
                return jsonify({"success": False, "errors": "The post wasn't found"})

        else:
            print("The channel doesn't exist")
            return jsonify(
                {"success": False, "errors": "The channel requested doesn't exist"}
            )
    else:
        print("The user wants a get request on this route")

        return render_template("index.html")


@channels.route("/explore/create-new-channel", methods=["GET", "POST"])
@login_required
def create_new_channel():

    if request.method == "GET":
        print("The user has sent a get request to the create new channel route")
        return render_template("index.html")

    elif request.method == "POST":
        print("The user has sent a post request to the create new channel route")

        channel_name = request.form.get("channel_name")
        channel_description = request.form.get("channel_description")
        print(channel_name)
        print(channel_description)

        # query to see if the channel already exists

        channel = Channel.query.filter_by(channel_name=channel_name).first()

        if channel:
            print("The channel already exists")

            return jsonify({"success": False, "error": "The channel already exists"})

        else:

            # make sure the channel_name and channel_descriptor are not null
            if channel_name == None and channel_description == None:
                return jsonify(
                    {"success": False, "Error": "The fields must all be filled out"}
                )

            elif channel_name == None:
                return jsonify(
                    {"success": False, "Error": "The channel_name must be filled out"}
                )

            elif channel_description == None:
                return jsonify(
                    {
                        "success": False,
                        "Error": "The channel_description must be filled out",
                    }
                )

            else:
                # insert the channel into the database

                new_channel = Channel(
                    channel_name=channel_name,
                    about=channel_description,
                    user_id=current_user.id,
                    num_users=1,
                )
                db.session.add(new_channel)
                db.session.commit()

                return jsonify({"success": True, "channel_name": channel_name})

        # return jsonify({"success": True})


"""
def allowed_file(filename):
    return (
        "." in filename
        and filename.rsplit(".", 1)[1].lower() in Config.ALLOWED_EXTENTIONS
    )


@channels.route(
    "/explore/channel/<string:channel_name>/create-new-post", methods=["GET", "POST"]
)
@login_required
def create_new_post(channel_name):
    if request.method == "GET":
        print("The user has made a get request on the create-new-post route")
        return render_template("index.html")

    elif request.method == "POST":
        print("This is how the create new post route should work")

        post_title = request.form.get("title")
        file = request.files.get("file")
        file.filename = current_user.username + file.filename

        # query the database to see if the channel exists
        channel = Channel.query.filter_by(channel_name=channel_name).first()

        if channel:
            if file.filename != "":

                if file and allowed_file(file.filename):
                    filename = secure_filename(file.filename)
                    # file.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))
                    file.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))

                    new_post = Post(
                        channel_id=channel.id,
                        user_id=current_user.id,
                        title=post_title,
                        video_file=filename,
                        num_likes=1,
                        num_comments=0,
                        num_dislikes=0,
                    )

                    db.session.add(new_post)
                    db.session.commit()

                    return jsonify({"success": True})

            else:
                return jsonify({"success": False})

            # get the video file from the

        else:

            return jsonify({"success": False})
"""


def myfunc():
    """
        posts = (
            Post.query.filter_by(channel_id=channel.id)
            .join(User, (User.id == Post.user_id))
            .add_columns(
                User.username,
                Post.id,
                Post.title,
                Post.channel_id,
                Post.user_id,
                Post.post_content,
                Post.image_file,
                Post.num_likes,
                # Comments.comment,
            )
            .outerjoin(Comments, (Comments.post_id == Post.id))
            .add_columns(Comments.comment)
            .all()
        )
    
        posts = (
            Post.query.filter_by(channel_id=channel.id)
            .join(User, (User.id == Post.user_id))
            .add_columns(
                User.username,
                Post.id,
                Post.channel_id,
                Post.user_id,
                Post.title,
                Post.post_content,
                Post.post_content,
                Post.image_file,
                Post.num_likes,
            )
            .all()
        )
"""
