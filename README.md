# Keeper App

## Description
Keeper App is a full-stack note-keeping application that allows users to register, log in, create, view, and delete notes. The app includes JWT authentication, a React frontend, and a Node.js/Express backend with PostgreSQL for data storage.

## Features
- User registration and login
- JWT-based authentication
- Add, view, and delete notes

## Technology Stack
- Frontend: React, Tailwind CSS
- Backend: Node.js, Express
- Database: PostgreSQL
- Authentication: JWT
- API calls: Axios
  
## Project Structure
<pre>keeper-app/
client/ # React frontend
server/ # Node.js backend
</pre>

## Setup
### Frontend
<pre>
1. Go to client/ folder:
cd client
npm install
  
2. Create .env file:
VITE_API_URL=http://localhost:5000
  
3. Start frontend:npm run dev
</pre>
### Backend
1. Go to `server/` folder:
   ```bash
   cd server
   npm install
   
2. Create .env file
<pre>
PORT=your_db_port_number
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_HOST=your_db_host_name
JWT_SECRET=your_jwt_secret
</pre>

3. Start server:
nodemon .\index.js



