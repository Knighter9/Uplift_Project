from uplift import app, db
from uplift.models import (
    User,
    Post,
    Channel,
    Channel_Members,
    Comments,
    Likes_Dislikes,
    Reply_To_Comments,
)


@app.shell_context_processor
def make_shell_context():
    return {
        "db": db,
        "User": User,
        "Channel": Channel,
        "Channel_Members": Channel_Members,
        "Post": Post,
        "Comments": Comments,
        "Likes_Dislikes": Likes_Dislikes,
        "Reply_To_Comments": Reply_To_Comments,
    }
