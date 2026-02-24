# Bookstore API

A Node.js + Express REST API for user authentication and book management.

## Features
- User registration and login with JWT.
- Protected CRUD APIs for books.
- MongoDB with Mongoose models.
- Swagger UI documentation with JWT Bearer auth support.
- Centralized error handler middleware.

## Tech Stack
- Node.js
- Express
- MongoDB + Mongoose
- JWT (`jsonwebtoken`)
- Password hashing (`bcryptjs`)
- Swagger (`swagger-jsdoc`, `swagger-ui-express`)

## Project Structure
```txt
src/
  app.js
  server.js
  config/
    db.js
    swagger.js
  controllers/
    authController.js
    bookController.js
  middleware/
    authMiddleware.js
    errorMiddleware.js
  models/
    userModel.js
    bookModel.js
  routes/
    authRoutes.js
    bookRoutes.js
```

## Prerequisites
- Node.js 18+ (20+ recommended)
- MongoDB connection string

## Installation
```bash
npm install
```

## Environment Variables
Create a `.env` file in the project root:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## Run the Project
```bash
npm run dev
```

For production-like start:
```bash
npm start
```

## Deploy on Vercel
This project is configured to run on Vercel using `api/index.js` and `vercel.json`.

### Steps
1. Push your project to GitHub.
2. Import the repository in Vercel.
3. In Vercel Project Settings, add environment variables:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `PORT` (optional)
4. Deploy.

### Notes
- Vercel routes are configured to forward all paths to `api/index.js`.
- Database connection is initialized per serverless instance and reused while warm.
- Your local run (`npm run dev` / `npm start`) still works with `src/server.js`.

## API Base URL
`http://localhost:3000`

## Swagger Docs
- URL: `http://localhost:3000/api-docs/`

### Authorize in Swagger
1. Call `POST /api/auth/login` and copy the returned `token`.
2. Click `Authorize` in Swagger UI.
3. Paste the token.
4. Call protected `books` endpoints.

## Authentication Endpoints
### Register
- `POST /api/auth/register`
- Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

### Login
- `POST /api/auth/login`
- Body:
```json
{
  "email": "john@example.com",
  "password": "123456"
}
```
- Success response includes JWT token.

## Book Endpoints (Protected)
All routes below require `Authorization: Bearer <token>`.

### Get all books
- `GET /api/books`

### Create book
- `POST /api/books`
- Body:
```json
{
  "title": "Atomic Habits",
  "author": "James Clear",
  "publishedYear": 2018,
  "genre": "Self-help",
  "price": 19.99
}
```

### Get book by ID
- `GET /api/books/:id`

### Update book
- `PUT /api/books/:id`

### Delete book
- `DELETE /api/books/:id`

## Notes
- Book IDs are UUID strings.
- Passwords are hashed before storing.
- If `JWT_SECRET` is missing, login token generation fails.
