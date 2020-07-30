"""added video file to post

Revision ID: 0a332d868230
Revises: bd1b2a322502
Create Date: 2020-07-06 18:44:12.195174

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0a332d868230'
down_revision = 'bd1b2a322502'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('post', sa.Column('video_file', sa.String(length=128), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('post', 'video_file')
    # ### end Alembic commands ###