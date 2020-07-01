from flask import (
    render_template,
    request,
    Blueprint,
    jsonify,
    json,
    redirect,
    url_for,
)
from uplift.models import User, Channel, Channel_Members
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

