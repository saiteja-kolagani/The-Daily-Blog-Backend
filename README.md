# The Daily Blog - Backend

This is the backend for **The Daily Blog**, a blogging platform built with Node.js, Express, and SQLite. The backend provides RESTful APIs for managing user authentication and CRUD operations on blog posts. This project uses JWT-based authentication and supports user registration and login.

## Features

- **User Authentication**: Registration, login, and JWT-based authentication.
- **CRUD Operations on Blog Posts**: Create, read, update, and delete blog posts.
- **SQLite Database**: Used for persisting data.
- **Express.js**: RESTful API endpoints for handling requests.
- **Middleware**: Includes authentication middleware to protect routes.
- **Cross-Origin Resource Sharing (CORS)**: Enabled for cross-origin requests.

## Installation

### Prerequisites
- **Node.js**: Ensure that Node.js and npm are installed on your system.

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/saiteja-kolagani/the-daily-blog-backend.git
   cd the-daily-blog-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:

   ```bash
   SECRET_KEY=your_secret_key
   ```

4. Start the development server:

   ```bash
   npm start
   ```

   The server should now be running at `http://localhost:4000`

## API Endpoints

### Authentication

- **POST /api/auth/register**: Register a new user.
  - Request body: `{ "username": "your_username", "password": "your_password" }`
  
- **POST /api/auth/login**: Login with an existing user.
  - Request body: `{ "username": "your_username", "password": "your_password" }`
  - Response: JWT token

### Posts

- **GET /api/posts**: Fetch all posts.
- **GET /api/posts/:id**: Fetch a specific post by ID.
- **POST /api/posts**: Create a new post (requires JWT authentication).
  - Request body: `{ "title": "Post title", "content": "Post content" }`
- **PUT /api/posts/:id**: Update a post by ID (requires JWT authentication).
  - Request body: `{ "title": "Updated title", "content": "Updated content" }`
- **DELETE /api/posts/:id**: Delete a post by ID (requires JWT authentication).

## Project Structure

```bash
backend/
├── controllers/
│   ├── authController.js   # Handles user registration and login
│   └── postController.js   # Handles CRUD operations for posts
├── routes/
│   ├── authRoutes.js       # Authentication routes
│   └── postRoutes.js       # Post routes
├── database.js             # SQLite database setup and connection
├── index.js                # Main entry point for the Express server
├── middleware/
│   └── authMiddleware.js   # JWT authentication middleware
└── models/
    ├── userModel.js        # User model for interacting with the database
    └── postModel.js        # Post model for interacting with the database
```

## Deployment

This application can be deployed on platforms like [Render](https://render.com) or [Heroku](https://www.heroku.com).

1. **Render**: Add the following start script in your `package.json`:
   ```json
   "scripts": {
     "start": "node index.js"
   }
   ```
2. Ensure that the environment variables (e.g., `SECRET_KEY`) are configured in the deployment platform's environment settings.

## Contributing

Feel free to fork this repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.
