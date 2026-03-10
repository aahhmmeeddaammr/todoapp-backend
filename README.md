# Todo App API with Auth

This is a production-ready Todo API built with Express, MongoDB (Mongoose), and Node.js, featuring JWT Authentication.

## Features
- **User Authentication** (Register & Login)
- **Protected Routes** (Only logged-in users can manage todos)
- **User-Specific Data** (Users only see their own todos)
- **Create** Todos
- **Read** Todos (List all, Get one)
- **Update** Todos
- **Delete** Todos

## Prerequisites
1. **Node.js**: Installed on your machine.
2. **MongoDB**: Installed and running locally (or use a cloud URI).

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   - A `.env` file is created with default values:
     ```
     MONGODB_URI=mongodb://localhost:27017/todoapp
     PORT=5000
     JWT_SECRET=supersecretkey123
     ```
   - Change `JWT_SECRET` for production.

3. **Run the Server**
   ```bash
   # Development
   npm run dev

   # Production
   npm start
   ```
   Server will run on `http://localhost:5000`.

## API Documentation (Postman / ARC)

A Postman Collection is included for easy testing.

1. Open Postman or Advanced REST Client (ARC).
2. Import `postman_collection.json`.
3. The base URL is set to `{{BASE_URL}}` which defaults to `http://localhost:5000`.

### Authentication Flow
1. **Register**: `POST /api/auth/register` with `username`, `email`, `password`.
   - Returns a `token`.
   - Postman test script automatically saves this token.
2. **Login**: `POST /api/auth/login` with `email`, `password`.
   - Returns a `token`.
   - Postman test script automatically saves this token.

### Todo Operations (Protected)
All Todo endpoints require the `Authorization` header: `Bearer <token>`.
*If using the imported collection, this is handled automatically if you run Register or Login first.*

| Method | Endpoint        | Description           |
|--------|-----------------|-----------------------|
| GET    | `/api/todos`    | Get your todos        |
| POST   | `/api/todos`    | Create a new todo     |
| GET    | `/api/todos/:id`| Get a single todo     |
| PUT    | `/api/todos/:id`| Update a todo         |
| DELETE | `/api/todos/:id`| Delete a todo         |

## Structure

- `src/server.js`: Entry point.
- `src/models/`: Mongoose schemas (User, Todo).
- `src/routes/`: API routes (Auth, Todos).
- `src/middleware/`: Authentication middleware.
"# todoapp-backend" 
