# Portfolio Website

This project is a portfolio website with a React frontend (using Vite) and a Flask backend with SQLite database.

## Frontend

The frontend is built with React and Vite.

### Setup and Run

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:3000`.

## Backend

The backend is built with Flask and uses SQLite as the database.

### Setup and Run

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # On Windows
# source venv/bin/activate  # On macOS/Linux
pip install -r requirements.txt
python app.py
```

The backend will be available at `http://localhost:5000`.

## Features

- Navbar with Home, About, Projects, and Contact sections.
- Smooth scrolling navigation to respective sections.
- Backend API to serve projects data and handle contact form submissions.

## Notes

- Make sure to run both frontend and backend servers simultaneously.
- Adjust backend API URLs in the frontend if needed.
