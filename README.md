# ClassMate Users API - Assignment 7

## Overview
Backend API for ClassMate application, refactored with MVC (Model-View-Controller) architecture pattern for better code organization and maintainability.

## Project Structure
```
users-api/
├── src/
│   ├── config/          # Database and service configurations
│   │   └── supabase.js  # Supabase client initialization
│   ├── controllers/     # Business logic and request handlers
│   │   └── userController.js  # User-related operations
│   ├── middleware/      # Authentication, logging, validation (future)
│   ├── routers/         # API route definitions
│   │   └── userRoutes.js  # User routes
│   └── index.js         # Main application entry point
├── .env                 # Environment variables (not in git)
├── .gitignore
├── package.json
└── README.md
```

## Technologies Used
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Supabase** - PostgreSQL database and backend services
- **@supabase/supabase-js** - Supabase JavaScript client
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management
- **nodemon** - Development auto-restart

## Database Schema

### Tables

#### `users`
| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | Primary Key |
| first_name | VARCHAR | NOT NULL |
| last_name | VARCHAR | NOT NULL |
| email | VARCHAR | UNIQUE, NOT NULL |
| created_at | TIMESTAMP | DEFAULT NOW() |

#### `user_profiles`
| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | Primary Key |
| user_id | BIGINT | Foreign Key → users.id, NOT NULL |
| date_of_birth | DATE | |
| bio | TEXT | |
| created_at | TIMESTAMP | DEFAULT NOW() |

### Relationships
- **One-to-one** relationship between `users` and `user_profiles`
- Foreign key constraint with **CASCADE** delete

## API Endpoints

### Base URL
`http://localhost:3000`

### Routes

| Method | Endpoint | Description | Controller |
|--------|----------|-------------|------------|
| GET | `/` | Welcome message and API info | N/A |
| GET | `/users` | Get all users | `getAllUsers` |
| GET | `/users/:id` | Get single user by ID | `getUserById` |
| GET | `/users/profiles` | Get users with profiles (JOIN) | `getUsersWithProfiles` |

### Example Responses

**GET /users**
```json
[
  {
    "id": 1,
    "first_name": "Sarah",
    "last_name": "Johnson",
    "email": "sarah.j@northwestern.edu",
    "created_at": "2025-12-22T..."
  }
]
```

**GET /users/profiles**
```json
[
  {
    "id": 1,
    "first_name": "Sarah",
    "last_name": "Johnson",
    "email": "sarah.j@northwestern.edu",
    "created_at": "2025-12-22T...",
    "user_profiles": {
      "date_of_birth": "2003-05-15",
      "bio": "Computer Science major..."
    }
  }
]
```

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/FayMa331/users-api.git
cd users-api
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root directory:
```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
PORT=3000
```

### 4. Run the server

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

## Key Changes in Assignment 7

### 1. MVC Architecture
- **Separated concerns** into config, controllers, and routers
- **Config layer**: Centralized Supabase client initialization
- **Controller layer**: Business logic isolated from routing
- **Router layer**: Clean API endpoint definitions

### 2. Improved Code Organization
- Easier to maintain and scale
- Better separation of concerns
- Clearer file structure for team collaboration

### 3. Entry Point
- Moved from `server.js` to `src/index.js`
- Updated npm scripts accordingly

## Challenges Encountered

### 1. Route Ordering
**Issue**: `/users/:id` was catching `/users/profiles` requests

**Solution**: Defined specific routes (`/profiles`) before parameterized routes (`:id`) in the router

### 2. Module Import/Export
**Issue**: Initially had syntax errors with ES6 imports

**Solution**: Ensured `"type": "module"` in `package.json` and used correct import/export syntax

### 3. Path Resolution
**Issue**: Relative imports between config, controllers, and routers

**Solution**: Used proper relative paths (`../config/supabase.js`)

## Key Takeaways

- ✅ Understanding of **MVC architecture pattern**
- ✅ Separation of concerns in backend development
- ✅ Modular code structure for scalability
- ✅ ES6 module system in Node.js
- ✅ Express Router for organizing routes
- ✅ Controller pattern for business logic

## Deployment

**Backend Deployed on**: [Your Render URL will go here]

## Future Enhancements
- Add middleware for authentication
- Implement request validation
- Add error handling middleware
- Create POST, PUT, DELETE endpoints
- Add pagination for large datasets

---

**Developed for DISC Northwestern - Assignment 7**