# ClassMate Users API

## Overview
This is the backend API for the ClassMate application, built with Node.js, Express, and PostgreSQL.

## API Endpoints
- `GET /users` - Get all users
- `GET /users/:id` - Get single user by ID

## Technologies Used
- Node.js
- Express
- PostgreSQL (hosted on Render)
- CORS for cross-origin requests

## Setup
1. Install dependencies: `npm install`
2. Create `.env` file with `DATABASE_URL`
3. Run server: `npm run dev`

## Challenges
- Database connection timeout issues with Render free tier
- Converting between snake_case (database) and camelCase (frontend)

## Key Takeaways
- Learned to set up PostgreSQL database
- Created RESTful API endpoints
- Connected frontend to backend API