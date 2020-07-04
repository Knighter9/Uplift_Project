from flask import (
    render_template,
    request,
    Blueprint,
    jsonify,
    json,
    redirect,
    url_for,
)
from uplift.models import User, Channel, Channel_Members, Post, Comments
from uplift import db
from flask_login import current_user, login_required

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
                    Post.num_comments,
                    # Comments.comment,
                )
                .all()
            )

            posts_list = []

            i = 0
            for post in posts:
                i += 1
                print(i)
                post_object = {
                    "username": post.username,
                    "title": post.title,
                    "post_content": post.post_content,
                    "num_likes": post.num_likes,
                    "num_comments": post.num_comments,
                }
                posts_list.append(post_object)
                print("------------------------------------")
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
                .first()
            )

            if post:
                print("The post has been found")
                # list for the comments to be added to
                post_comments_list = []
                post_data = {
                    "username": post.username,
                    "title": post.title,
                    "post_content": post.post_content,
                    "num_comments": post.num_comments,
                    "num_likes": post.num_likes,
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
