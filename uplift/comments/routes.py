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
from uplift.models import (
    User,
    Channel,
    Channel_Members,
    Post,
    Comments,
    Likes_Dislikes,
    Reply_To_Comments,
)
from uplift import db
from flask_login import current_user, login_required
from config import Config
from werkzeug.utils import secure_filename
import os
from uplift import app
from pathlib import Path

comments = Blueprint("comments", __name__)


@comments.route(
    "/explore/channel/<string:channel_name>/posts/<string:post_title>/create-comment",
    methods=["POST"],
)
@login_required
def create_comment(channel_name, post_title):
    if request.method == "POST":
        print("The user is trying to create a comment")
        print(post_title)

        comment = request.form.get("comment")
        print(comment)
        # check to see if the comment is not a empty string
        if not comment.isspace():
            # see if the channel exits
            channel = Channel.query.filter_by(channel_name=channel_name).first()

            if channel:
                print("The channel exists")

                # see if the post exists
                post = Post.query.filter_by(title=post_title).first()

                if post:
                    print("The post exists")
                    print(comment)

                    # store the comment in the database
                    new_comment = Comments(
                        comment=comment,
                        user_id=current_user.id,
                        post_id=post.id,
                        num_likes=0,
                        num_dislikes=0,
                        num_replies=0,
                    )
                    db.session.add(new_comment)

                    # update the number of comments on the post
                    post.num_comments += 1

                    # commit the session
                    db.session.commit()

                    return jsonify({"success": True})

                else:
                    print("The post doesn't exist")
                    return jsonify(
                        {"success": False, "error": "The post doesn't exist"}
                    )

            else:
                print("The channel doesn't exist")
                return jsonify({"success": False, "error": "The channel doesn't exist"})

        else:
            print("The comment is a empty string")
            return jsonify({"success": False, "error": "The comment is empty"})


@comments.route(
    "/explore/channel/<string:channel_name>/posts/<string:post_title>/reply-to-comment",
    methods=["POST"],
)
@login_required
def reply_to_comment(channel_name, post_title):
    if request.method == "POST":
        comment = request.form.get("comment")
        comment_creator = request.form.get("comment_creator")
        reply = request.form.get("reply")

        print(channel_name)
        print(post_title)
        print(comment)
        print(comment_creator)
        print(reply)

        # check to see if the reply is empty
        if not reply.isspace():
            # check to see if the channel exists
            channel = Channel.query.filter_by(channel_name=channel_name).first()

            if channel:
                print("the channel exists")

                # check to see if the post exists
                post = Post.query.filter_by(title=post_title).first()

                if post:
                    print("The post exists")
                    # check to see if the comment exists
                    comment_query = Comments.query.filter_by(comment=comment).first()

                    if comment_query:
                        print("The comment exists")
                        new_reply = Reply_To_Comments(
                            main_comment=comment_query.id,
                            reply=reply,
                            reply_user_id=current_user.id,
                        )
                        print(comment_query.num_replies)
                        comment_query.num_replies += 1

                        db.session.add(new_reply)
                        db.session.commit()

                        return jsonify({"success": True})
                    else:
                        print("The comment doesn't exist")
                        return jsonify({"success": False})

                else:
                    print("The post doesn't exist")
                    return jsonify({"success": False})

            else:
                print("The channel doesn't exists")

                return jsonify({"success": False})

        else:
            return jsonify({"success": False})


@comments.route(
    "/explore/channel/<string:channel_name>/posts/<string:post_title>/reply-to-reply-comment",
    methods=["POST"],
)
@login_required
def reply_to_reply(channel_name, post_title):
    print("the reply to reply function has been called")

    # get the data from the form
    sub_comment = request.form.get("comment")
    sub_comment_creator = request.form.get("comment_creator")
    og_comment = request.form.get("og_comment")
    og_comment_creator = request.form.get("og_comment_creator")

    reply = request.form.get("reply")

    print(sub_comment)
    print(sub_comment_creator)
    print(og_comment)
    print(og_comment_creator)

    # see if the channel exists

    channel = Channel.query.filter_by(channel_name=channel_name).first()

    if channel:
        print("The channel exists")

        # see if the posts exits
        post = Post.query.filter_by(title=post_title).first()

        if post:
            print("The post exists")

            # check to see if the comment exists
            main_comment = (
                Comments.query.filter_by(post_id=post.id)
                .filter_by(comment=og_comment)
                .first()
            )

            """comment = (
                Reply_To_Reply_Comments.query.filter_by(post_id=post.id)
                .filter_by(reply=sub_comment)
                .first()
            )"""

            if main_comment:
                print("The comment main does exist")
                print(main_comment)

                # check to see if the comment the user wants to reply to exists
                comment = (
                    Reply_To_Comments.query.filter_by(main_comment=main_comment.id)
                    .filter_by(reply=sub_comment)
                    .first()
                )
                print(comment)

                if comment:
                    # create the reply to reply comment
                    new_reply_comment = Reply_To_Comments(
                        main_comment=main_comment.id,
                        comment_replied_to=comment.id,
                        reply=reply,
                        reply_user_id=current_user.id,
                    )

                    db.session.add(new_reply_comment)

                    main_comment.num_replies += 1

                    db.session.commit()

                    return jsonify({"success": True})

                else:
                    print("The comment does not exist")
                    return jsonify({"success": False})

            else:
                print("The comment does not exist")
                return jsonify({"success": False})
        else:
            print("The post doesn't exist")

    else:
        print("THe post does not exist")
        return jsonify({"success": False})


@comments.route(
    "/explore/channel/<string:channel_name>/posts/<string:post_title>/get-sub-comments",
    methods=["POST"],
)
@login_required
def get_sub_comments(channel_name, post_title):
    if request.method == "POST":
        print(channel_name)
        print(post_title)

        comment = request.form.get("comment")
        creator = request.form.get("creator")

        print(comment)
        print(creator)

        # query to see if the channel name exists
        channel = Channel.query.filter_by(channel_name=channel_name).first()

        if channel:
            print("THe channel exists")

            post = Post.query.filter_by(title=post_title).first()

            if post:
                print("The post exists")

                # query to see if the comment exists
                """comment = (
                    Comments.query.filter_by(post_id=post.id)
                    .filter_by(comment=comment)
                    .first()
                )
                """
                """
                comment = (
                    Comments.query.join(User, (Comments.user_id == User.id))
                    .add_columns(
                        User.username,
                        Comments.comment,
                        Comments.user_id,
                        Comments.post_id,
                        Comments.num_likes,
                        Comments.num_dislikes,
                        Comments.num_replies,
                    )
                    .filter_by(post_id=post.id)
                    .filter_by(comment=comment)
                    .first()
                )
                """

                main_comment = (
                    Comments.query.filter_by(post_id=post.id)
                    .filter_by(comment=comment)
                    .join(User, (Comments.user_id == User.id))
                    .add_columns(
                        User.username,
                        Comments.comment,
                        Comments.user_id,
                        Comments.post_id,
                        Comments.num_likes,
                        Comments.num_dislikes,
                        Comments.num_replies,
                        Comments.id,
                    )
                    .first()
                )

                if main_comment:
                    print("The comment exists")

                    # query for the sub comments

                    """sub_comments = (
                        Reply_To_Comments.query.filter_by(comment_id=main_comment.id)
                        .join(User, (User.id == Reply_To_Comments.reply_user_id))
                        .add_columns(
                            User.username,
                            Reply_To_Comments.reply,
                            Reply_To_Comments.comment_id,
                        )
                        .all()
                    )
                    """
                    """
                    sub_comments = (
                        Reply_To_Comments.query.filter_by(comment_id=main_comment.id)
                        .join(User, (User.id == Reply_To_Comments.reply_user_id))
                        .add_columns(
                            User.username,
                            Reply_To_Comments.reply,
                            Reply_To_Comments.comment_id,
                        )
                        .outerjoin(
                            Reply_To_Reply_Comments,
                            (Reply_To_Reply_Comments.reply_id == Reply_To_Comments.id),
                        )
                        .add_columns(Reply_To_Reply_Comments.reply_to_reply)
                        .all()
                    )
                    """
                    sub_comments = (
                        Reply_To_Comments.query.filter_by(main_comment=main_comment.id)
                        .join(User, (User.id == Reply_To_Comments.reply_user_id))
                        .add_columns(
                            User.username,
                            Reply_To_Comments.id,
                            Reply_To_Comments.main_comment,
                            Reply_To_Comments.comment_replied_to,
                            Reply_To_Comments.reply,
                            Reply_To_Comments.reply_user_id,
                        )
                        .all()
                    )

                    reply_comment_list = []
                    first_comment_id = sub_comments[0]
                    first_comment_id = first_comment_id.id
                    for comment in sub_comments:
                        print(comment.id)
                        if comment.comment_replied_to:
                            print("okay there is a reply to reply comment")
                            # i = comment.comment_replied_to - 1
                            # replying_to = sub_comments[i].username
                            i = comment.comment_replied_to
                            print("the comment replied to id is ")
                            print(i)
                            replying_to = sub_comments[i].username
                            print(
                                "this should be the comment that that the user replied to"
                            )
                            # print(sub_comments[i].reply)
                            reply_comment_object = {
                                "reply": comment.reply,
                                "username": comment.username,
                                "replying_to": replying_to,
                            }
                            reply_comment_list.append(reply_comment_object)
                        else:
                            reply_comment_object = {
                                "reply": comment.reply,
                                "username": comment.username,
                                "replying_to": main_comment.username,
                            }
                            reply_comment_list.append(reply_comment_object)

                    """for comment in sub_comments:
                        print("--------------------------")
                        if comment.reply_to_reply:
                            print("#################################")
                            print("There is a reply to the reply on this reply comment")
                            print(comment.reply_to_reply)
                            print("##################################")

                        print(comment.reply)
                        print(comment.username)
                        print("-----------------------------")
                        reply_comment_object = {
                            "reply": comment.reply,
                            "username": comment.username,
                            "replying_to": main_comment.username,
                        }
                        reply_comment_list.append(reply_comment_object)
                    """

                    return jsonify(
                        {"success": True, "reply_comment_list": reply_comment_list}
                    )
                else:
                    print("The comment doesn't exist")

                    return jsonify({"success": False})

            else:
                print("The post doesn't exist")

                return jsonify({"success": False})

        else:
            print("The channel does not exist")

            return jsonify({"success": False})
