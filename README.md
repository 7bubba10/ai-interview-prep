# AI Interview Prep 🎯

An AI-powered full-stack web application that generates personalized interview questions based on job descriptions. Built to help developers walk into interviews prepared and confident.

**Live Demo:** [ai-interview-prep-teal-nine.vercel.app](https://ai-interview-prep-teal-nine.vercel.app)

---

## Features

- **AI-Generated Questions** — Paste any job description and get personalized technical, conceptual, and behavioral interview questions powered by the Anthropic Claude API
- **JWT Authentication** — Secure register and login with JSON Web Tokens
- **Password Hashing** — Passwords are hashed with bcrypt before storage
- **Session Persistence** — Stay logged in across page refreshes with localStorage
- **Protected Routes** — Dashboard and results are only accessible to authenticated users
- **Loading States** — Visual feedback while AI generates questions
- **Responsive Dark UI** — Clean, modern interface built for developers

---

## Tech Stack

**Frontend**
- React 18
- TypeScript
- React Router v6
- Deployed on Vercel

**Backend**
- Node.js
- Express
- TypeScript
- JWT (jsonwebtoken)
- bcrypt
- Deployed on Railway

**Database**
- PostgreSQL

**AI**
- Anthropic Claude API (claude-haiku)

---

## How It Works

1. **Register/Login** — Create an account or log in with your credentials
2. **Paste Job Description** — Copy and paste any job posting into the dashboard
3. **Set Preferences** — Choose how many questions you want and how many days until your interview
4. **Generate** — The app sends your job description to the Anthropic Claude API which generates tailored interview questions with detailed answers
5. **Study** — Review your personalized questions and answers before your interview

---

## Architecture

```
ai-interview-prep/
├── client/                 # React TypeScript frontend
│   ├── src/
│   │   ├── components/     # Reusable components (ProtectedRoute)
│   │   ├── context/        # Auth context (JWT token management)
│   │   └── pages/          # HomePage, Login, Register, Dashboard, Results
│   └── ...
└── server/                 # Node/Express TypeScript backend
    ├── src/
    │   ├── controllers/    # authController, interviewController
    │   ├── middleware/      # JWT auth middleware
    │   ├── routes/          # authRoutes, interviewRoutes
    │   └── db/              # PostgreSQL connection pool
    └── ...
```

---

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login and receive JWT | No |
| POST | `/api/interview/generate` | Generate interview questions | Yes |

---

## Local Development

### Prerequisites
- Node.js 20+
- PostgreSQL

### Setup

1. Clone the repo
```bash
git clone https://github.com/7bubba10/ai-interview-prep.git
cd ai-interview-prep
```

2. Set up the server
```bash
cd server
npm install
```

3. Create `server/.env`
```
DATABASE_URL=postgresql://your_user@localhost:5432/ai_interview_prep
JWT_SECRET=your_jwt_secret
PORT=8000
ANTHROPIC_API_KEY=your_anthropic_api_key
```

4. Set up the database
```sql
CREATE DATABASE ai_interview_prep;

CREATE TABLE users (
    id serial primary key,
    password_hash varchar(255) not null,
    email varchar(255) unique not null,
    created_at timestamp default now()
);

CREATE TABLE sessions (
    id serial primary key,
    user_id integer not null references users(id),
    job_description text,
    created_at timestamp default now()
);
```

5. Start the server
```bash
npm run dev
```

6. Set up the client
```bash
cd ../client
npm install
npm start
```

---

## Environment Variables

### Server
| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret key for signing JWTs |
| `ANTHROPIC_API_KEY` | Anthropic API key |
| `PORT` | Server port (default: 8000) |

### Client
| Variable | Description |
|----------|-------------|
| `REACT_APP_API_URL` | Backend API URL |

---

## Author

**Aidan** — Computer Science student at Marist University

[GitHub](https://github.com/7bubba10)
