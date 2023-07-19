from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    age = db.Column(db.Integer)

    def __init__(self, name, age=None):
        self.name = name
        self.age = age

    def __repr__(self):
        return f"<User {self.name}>"
