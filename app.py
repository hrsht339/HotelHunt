from flask import Flask, render_template , request
import jwt
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from models import User
from database import db

# Additional imports will be added as needed
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'cockroachdb://hrsht339:sk-FLzMW0YGPlOHJltNseA@hotelhunt-5441.8nk.cockroachlabs.cloud:26257/defaultdb?sslmode=disable'
db.init_app(app)

@app.route('/')
def home():
    return "Welcome to Homestead Horizon"

@app.route('/login', methods=['POST'])
def login():
    person = User(name='John', age=30)
    db.session.add(person)
    db.session.commit()
    return "Data saved successfully!"



if __name__ == '__main__':
    app.run(debug=True)
