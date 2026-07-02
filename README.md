# AI-Driven Learning Platform

A mini learning platform that allows users to select a topic by category and sub-category, receive AI-generated lessons, and view their learning history.

---

## Technologies Used

**Backend**
- Node.js + Express
- PostgreSQL + Sequelize ORM
- Google Gemini AI API (`@google/generative-ai`)
- dotenv

**Frontend**
- React (Create React App)

---

## Project Structure

```
ai-learning-platform/
├── backend/
│   ├── server.js
│   └── src/
│       ├── config/        # DB connection
│       ├── controllers/   # Route handlers
│       ├── models/        # Sequelize models
│       ├── routes/        # Express routers
│       └── services/      # AI service
└── frontend/              # React app
```

---

## Setup Instructions

### Prerequisites
- Node.js v18+
- PostgreSQL running locally
- A Gemini API key (free at https://makersuite.google.com)

### 1. Clone the repository
```bash
git clone https://github.com/michal8319/ai-learning-platform.git
cd ai-learning-platform
```

### 2. Backend setup
```bash
cd backend
npm install
cp .env.example .env
# Fill in your values in .env
npm start
```

### 3. Frontend setup
```bash
cd frontend
npm install
npm start
```

---

## Environment Variables

Create a `.env` file in the `backend/` folder based on `.env.example`:

```env
PORT=5000
DATABASE_URL=postgres://postgres:YOUR_PASSWORD@localhost:5432/learning_platform
GEMINI_API_KEY=your_gemini_api_key_here
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/login` | Register or login a user |
| GET | `/api/categories` | Get all categories |
| GET | `/api/categories/:id/sub-categories` | Get sub-categories by category |
| POST | `/api/learning/generate-lesson` | Generate AI lesson and save to DB |
| GET | `/api/learning/history/:userId` | Get user's learning history |
| GET | `/api/admin/users` | Get all users with their history |

### Example request — Generate Lesson
```json
POST /api/learning/generate-lesson
{
  "userId": 1,
  "categoryId": 2,
  "subCategoryId": 5
}
```

---

## Assumptions Made

- Authentication is phone-based (no passwords). The system uses `findOrCreate` — if the phone exists the user is logged in, otherwise registered.
- Category and sub-category data is seeded manually into the database.
- The AI model used is `gemini-pro` (free tier). OpenAI GPT can be substituted by replacing `aiService.js`.

---

## How to Run Locally

1. Make sure PostgreSQL is running and the database `learning_platform` exists
2. Start the backend: `cd backend && npm start`
3. Start the frontend: `cd frontend && npm start`
4. Open http://localhost:3000
