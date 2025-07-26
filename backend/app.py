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

class Blog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    excerpt = db.Column(db.String(300), nullable=False)
    date_posted = db.Column(db.String(50), nullable=False)
    read_time = db.Column(db.String(20), nullable=False)
    category = db.Column(db.String(50), nullable=False)

# Create tables once at app startup
with app.app_context():
    db.create_all()
    
    # Add sample blog posts if they don't exist
    if not Blog.query.first():
        sample_blogs = [
            Blog(
                title="Getting Started with React Development",
                content="React has revolutionized the way we build user interfaces. In this comprehensive guide, I'll walk you through the fundamentals of React development, from setting up your first project to understanding core concepts like components, state, and props. We'll explore JSX syntax, component lifecycle methods, and best practices for building scalable applications. Whether you're a beginner or looking to refresh your knowledge, this post will provide valuable insights into modern React development.",
                excerpt="A comprehensive guide to React development fundamentals, covering components, state management, and best practices for building modern web applications.",
                date_posted="December 15, 2024",
                read_time="8 min read",
                category="Web Development"
            ),
            Blog(
                title="The Future of Artificial Intelligence in Software Development",
                content="Artificial Intelligence is transforming the software development landscape at an unprecedented pace. From automated code generation to intelligent debugging tools, AI is becoming an integral part of the development workflow. In this article, I explore the current state of AI in software development, including tools like GitHub Copilot, automated testing frameworks, and AI-powered code review systems. We'll also discuss the implications for developers and how to prepare for an AI-driven future in programming.",
                excerpt="Exploring how AI is revolutionizing software development with automated tools, intelligent debugging, and the future implications for developers.",
                date_posted="December 10, 2024",
                read_time="12 min read",
                category="Technology"
            ),
            Blog(
                title="Building a Portfolio Website: From Design to Deployment",
                content="Creating a compelling portfolio website is crucial for showcasing your skills and projects. In this detailed tutorial, I share my experience building this portfolio website using React and Flask. We'll cover the design process, choosing the right tech stack, implementing responsive design, and deploying your application. I'll also discuss important considerations like performance optimization, SEO best practices, and maintaining a professional online presence.",
                excerpt="A step-by-step guide to creating a professional portfolio website, covering design principles, technical implementation, and deployment strategies.",
                date_posted="December 5, 2024",
                read_time="10 min read",
                category="Web Development"
            ),
            Blog(
                title="Data Structures and Algorithms: Essential Concepts for Every Developer",
                content="Understanding data structures and algorithms is fundamental to becoming a proficient programmer. This post covers essential concepts including arrays, linked lists, stacks, queues, trees, and graphs. I'll explain when to use each data structure, their time and space complexities, and provide practical examples. Whether you're preparing for technical interviews or want to write more efficient code, this guide will strengthen your algorithmic thinking.",
                excerpt="Essential data structures and algorithms every developer should know, with practical examples and complexity analysis for better code optimization.",
                date_posted="November 28, 2024",
                read_time="15 min read",
                category="Programming"
            )
        ]
        
        for blog in sample_blogs:
            db.session.add(blog)
        
        db.session.commit()

@app.route('/api/projects', methods=['GET'])
def get_projects():
    projects = Project.query.all()
    projects_list = [{'id': p.id, 'title': p.title, 'description': p.description} for p in projects]
    return jsonify(projects_list)

@app.route('/api/blogs', methods=['GET'])
def get_blogs():
    blogs = Blog.query.order_by(Blog.id.desc()).all()
    blogs_list = [{
        'id': b.id, 
        'title': b.title, 
        'content': b.content,
        'excerpt': b.excerpt,
        'date_posted': b.date_posted,
        'read_time': b.read_time,
        'category': b.category
    } for b in blogs]
    return jsonify(blogs_list)

@app.route('/api/blogs/<int:blog_id>', methods=['GET'])
def get_blog(blog_id):
    blog = Blog.query.get_or_404(blog_id)
    return jsonify({
        'id': blog.id,
        'title': blog.title,
        'content': blog.content,
        'excerpt': blog.excerpt,
        'date_posted': blog.date_posted,
        'read_time': blog.read_time,
        'category': blog.category
    })

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
