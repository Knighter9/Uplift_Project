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

posts = Blueprint("posts", __name__)


def allowed_file(filename):
    return (
        "." in filename
        and filename.rsplit(".", 1)[1].lower() in Config.ALLOWED_EXTENTIONS
    )


@posts.route(
    "/explore/channel/<string:channel_name>/create-new-post", methods=["GET", "POST"]
)
@login_required
def create_new_post(channel_name):
    if request.method == "GET":
        print("The user has made a get request on the create-new-post route")
        return render_template("index.html")

    elif request.method == "POST":
        print("This is how the create new post route should work")

        type_of_post = request.form.get("type")
        if type_of_post == "video":

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

                        newly_created_post = Post.query.filter_by(
                            title=post_title
                        ).first()
                        new_likes_dislikes = Likes_Dislikes(
                            post_id=newly_created_post.id,
                            user_id=current_user.id,
                            like=True,
                            dislike=False,
                        )

                        db.session.add(new_likes_dislikes)
                        db.session.commit()

                        return jsonify({"success": True})

                else:
                    return jsonify({"success": False})

                # get the video file from the
            else:

                return jsonify({"success": False})

        elif type_of_post == "text":
            print("it is a text post")
            post_title = request.form.get("title")
            print(post_title)
            post_content = request.form.get("post_content")
            print(post_content)

            # query the database to see if the channel exists
            channel = Channel.query.filter_by(channel_name=channel_name).first()

            if channel:

                new_post = Post(
                    channel_id=channel.id,
                    user_id=current_user.id,
                    title=post_title,
                    post_content=post_content,
                    num_likes=1,
                    num_comments=0,
                    num_dislikes=0,
                )

                db.session.add(new_post)
                db.session.commit()

                newly_created_post = Post.query.filter_by(title=post_title).first()
                new_likes_dislikes = Likes_Dislikes(
                    post_id=newly_created_post.id,
                    user_id=current_user.id,
                    like=True,
                    dislike=False,
                )

                db.session.add(new_likes_dislikes)
                db.session.commit()

                return jsonify({"success": True})

            # get the video file from the
            else:

                return jsonify({"success": False})


@posts.route(
    "/<string:post_title>/like_dislike/<string:like_dislike>", methods=["POST"]
)
@login_required
def like_dislike(post_title, like_dislike):
    # query to see if the post_title exists
    post = Post.query.filter_by(title=post_title).first()

    if post:
        print("The post exists")
        # check to see if the user wants to like or dislike the post

        # see if the user has liked or disliked the post
        check_liked = (
            Likes_Dislikes.query.filter_by(post_id=post.id)
            .filter_by(user_id=current_user.id)
            .first()
        )
        if like_dislike == "like":
            print("The user wants to like the post")

            # check to see if the user already liked the post
            if not check_liked:
                print("The user has never liked the post before")
                # create the Likes_Dislikes model
                new_likes_dislikes = Likes_Dislikes(
                    post_id=post.id, user_id=current_user.id, like=True, dislike=False
                )
                db.session.add(new_likes_dislikes)
                # db.session.commit()
                # update the post number of likes
                post.num_likes += 1
                # db.session.add(post)
                db.session.commit()
                return jsonify({"success": True, "passed_liked": False})

            elif check_liked.like == True:
                print("THe user has already put a like on this post")
                # unlike the post
                check_liked.like = False

                # remove the like number from the post
                post.num_likes -= 1

                db.session.commit()
                return jsonify({"success": True, "passed_liked": "removed_like"})

            elif check_liked.dislike == False:
                # we don't need to subtract from the dislike comments
                print("The user has not disliked the post")
                # make sure the like is added to the liking dislike table
                check_liked.like = True
                # db.session.add(check_liked)
                # db.session.commit()
                # add a like to the post
                post.num_likes += 1
                # db.session.add(post)
                db.session.commit()

                # return the success message
                return jsonify({"success": True, "passed_liked": False})

            elif check_liked.dislike == True:
                print("The user has disliked the post before and now wants to like it")
                # make sure to set the check_liked dislike = False
                check_liked.dislike = False
                check_liked.like = True
                # db.session.add(check_liked)
                # db.session.commit()
                # make sure to subtract a dislike from the post
                print(f"The number of dislikes was {post.num_dislikes}")
                post.num_dislikes -= 1
                print(f"The number of likes was {post.num_likes}")
                post.num_likes += 1
                print(f"The number of dislikes now is {post.num_dislikes}")
                print(f"The number of likes now is {post.num_likes}")
                # db.session.add(post)
                db.session.commit()

                return jsonify({"success": True, "passed_liked": "dislike"})

        elif like_dislike == "dislike":

            if not check_liked:
                print("The user has never like or disliked the post before")
                # create the lilng disliking model
                new_likes_dislikes = Likes_Dislikes(
                    post_id=post.id, user_id=current_user.id, like=False, dislike=True
                )
                db.session.add(new_likes_dislikes)
                # db.session.commit()
                print("The users wants to dislike the post")
                post.num_dislikes += 1
                # db.session.add(post)
                db.session.commit()
                return jsonify({"success": True, "passed_liked": False})

            elif check_liked.dislike == True:
                print("The user has already disliked the post")

                # set check_liked.dislike == False
                check_liked.dislike = False
                # remove a dislike from the post

                post.num_dislikes -= 1

                db.session.commit()

                return jsonify({"success": True, "passed_liked": "removed_dislike"})

            elif check_liked.like == False:
                print("The user hasn't liked the post we can add the dislike")
                # update the check_liked
                check_liked.dislike = True
                # db.session.add(check_liked)
                # db.session.commit()

                # update the post
                post.num_dislikes += 1
                # db.session.add(post)
                db.session.commit()

                return jsonify({"success": True, "passed_liked": False})

            elif check_liked.like == True:
                print(
                    "The user has liked the post we need to remove the like and add the dislike"
                )
                # update the check_liked
                check_liked.like = False
                check_liked.dislike = True
                # db.session.add(check_liked)
                # db.session.commit()

                # update the post
                post.num_likes -= 1
                post.num_dislikes += 1
                # db.session.add(post)
                db.session.commit()

                return jsonify({"success": True, "passed_liked": "like"})

    else:
        print("The post doesn't exist")
        return jsonify({"success": False, "error": "The post doesn't exist"})

