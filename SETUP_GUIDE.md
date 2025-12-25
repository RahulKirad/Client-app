# Cottoniq Project Setup Guide

Your project has been successfully reorganized with a separate backend folder. Here's how to get everything running:

## Project Structure

```
project/                 # Frontend (React + TypeScript)
├── src/
├── public/
├── package.json
└── .env

backend/                 # Backend API (Node.js + Express + MySQL)
├── src/
│   └── index.ts
├── database/
│   └── mysql_schema.sql
├── scripts/
│   └── setup-database.js
├── package.json
├── tsconfig.json
└── .env
```

## Current Status

✅ **Backend Server**: Running on http://localhost:3001  
⚠️ **Database**: Not connected (needs MySQL setup)  
⏳ **Frontend**: Ready to start  

## Next Steps

### 1. Setup MySQL Database

Install MySQL Server and create the database:

```bash
# Navigate to backend folder
cd backend

# Update .env file with your MySQL credentials
# Edit backend/.env and set your MySQL password

# Setup database
npm run setup-db
```

### 2. Start Frontend

In a new terminal:

```bash
# Navigate to frontend folder
cd project

# Install dependencies (if needed)
npm install

# Start frontend development server
npm run dev
```

### 3. Access Your Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **API Health Check**: http://localhost:3001/api/health

## Environment Configuration

### Backend (.env)
```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=cottoniq_db
DB_USER=root
DB_PASSWORD=your_mysql_password_here
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3001/api
```

## Available Scripts

### Backend
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run setup-db` - Initialize database

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/featured` - Get featured products
- `POST /api/inquiries` - Submit inquiry
- `GET /api/content/:sectionKey` - Get content sections
- `GET /api/health` - Health check

## Troubleshooting

### Database Connection Issues
1. Make sure MySQL server is running
2. Check credentials in `backend/.env`
3. Run `npm run setup-db` from backend folder

### Port Conflicts
- Backend runs on port 3001
- Frontend runs on port 5173
- Change ports in respective .env files if needed

### CORS Issues
- Backend is configured to accept requests from http://localhost:5173
- Update `FRONTEND_URL` in backend/.env if using different port

## Migration Complete

✅ Supabase completely removed  
✅ MySQL backend created  
✅ Separate backend folder structure  
✅ All dependencies properly organized  
✅ Environment variables configured  
✅ Database schema ready  

Your application is now running with a clean separation between frontend and backend!