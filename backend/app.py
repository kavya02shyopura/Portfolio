from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)

import os

basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'instance', 'portfolio.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500), nullable=False)

class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    message = db.Column(db.Text, nullable=False)

# Create tables once at app startup
with app.app_context():
    db.create_all()

@app.route('/api/projects', methods=['GET'])
def get_projects():
    projects = Project.query.all()
    projects_list = [{'id': p.id, 'title': p.title, 'description': p.description} for p in projects]
    return jsonify(projects_list)

@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.json
    new_message = Message(name=data.get('name'), email=data.get('email'), message=data.get('message'))
    db.session.add(new_message)
    db.session.commit()
    return jsonify({'message': 'Contact form submitted successfully'})

@app.route('/api/messages', methods=['GET'])
def get_messages():
    messages = Message.query.all()
    messages_list = [{'name': m.name, 'email': m.email, 'message': m.message} for m in messages]
    return jsonify(messages_list)

if __name__ == '__main__':
    app.run(debug=True)
