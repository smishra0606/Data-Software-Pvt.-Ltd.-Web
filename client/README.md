
# Learning Platform - MERN Stack

This is a full-stack MERN (MongoDB, Express, React, Node.js) application for a learning platform that offers courses and internships.

## Project Structure

```
├── client (Frontend)
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── hooks
│   │   ├── lib
│   │   ├── pages
│   │   └── types
│   └── ...
└── server (Backend)
    ├── controllers
    ├── middleware
    ├── models
    ├── routes
    └── ...
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)

### Installation

1. Clone the repository

2. Install server dependencies:
```
cd server
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env` and fill in your MongoDB URI and JWT secret

4. Start the backend server:
```
npm run dev
```

5. In a new terminal, install frontend dependencies:
```
cd ../client
npm install
```

6. Start the frontend development server:
```
npm run dev
```

7. Access the application:
   - Frontend: http://localhost:8080
   - Backend API: http://localhost:5000/api

## Features

- User Authentication (Register, Login, JWT)
- User Dashboard
- Admin Dashboard
- Course Management
- Internship Management
- API integration with React Query

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login a user
- GET /api/auth/me - Get current user

### Courses
- GET /api/courses - Get all courses
- GET /api/courses/:id - Get a single course
- POST /api/courses - Create a new course (admin only)
- PUT /api/courses/:id - Update a course (admin only)
- DELETE /api/courses/:id - Delete a course (admin only)
- POST /api/courses/:id/enroll - Enroll in a course

### Internships
- GET /api/internships - Get all internships
- GET /api/internships/:id - Get a single internship
- POST /api/internships - Create a new internship (admin only)
- PUT /api/internships/:id - Update an internship (admin only)
- DELETE /api/internships/:id - Delete an internship (admin only)
- POST /api/internships/:id/apply - Apply for an internship

### Users
- GET /api/users/enrollments - Get enrolled courses for current user
- GET /api/users/applications - Get applied internships for current user
- PUT /api/users/profile - Update user profile
- PUT /api/users/password - Update user password
- GET /api/users - Get all users (admin only)
