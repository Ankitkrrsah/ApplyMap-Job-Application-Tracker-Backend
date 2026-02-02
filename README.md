# Job Application Tracker - Backend

A robust REST API for tracking job applications, built with Node.js, Express, and PostgreSQL. This backend handles user authentication, company management, and application tracking with a focus on data integrity and normalization.

## 🚀 Tech Stack

*   **Runtime:** Node.js
*   **Framework:** Express.js (v5)
*   **Database:** PostgreSQL
*   **Driver:** `pg` (node-postgres)
*   **Authentication:** JWT (JSON Web Tokens) & `bcrypt` for password hashing
*   **Environment:** `dotenv`

## ✨ Key Features

*   **User Authentication:** Secure registration and login with JWT issuance.
*   **Application Tracking:** CRUD operations for job applications (Role, Status, Date).
*   **Company Management:** Normalized company data to prevent duplicates.
*   **Security:**
    *   Password hashing with `bcrypt`.
    *   Protected routes via JWT middleware.
    *   Prevents IDOR (Insecure Direct Object References) by enforcing user ownership checks.

## 🛠️ Installation & Setup

### 1. Prerequisites
*   Node.js (v18+ recommended)
*   PostgreSQL installed and running

### 2. Clone and Install
```bash
git clone <repository_url>
cd backend
npm install
```

### 3. Database Setup
Create a PostgreSQL database (e.g., `job_tracker`) and run the following SQL scripts to set up the schema:

```sql
-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Companies Table
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  website TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Applications Table
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES companies(id),
  role VARCHAR(255) NOT NULL,
  status VARCHAR(50) NOT NULL CHECK (
    status IN ('APPLIED', 'INTERVIEW', 'OFFER', 'REJECTED')
  ),
  applied_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_applications_user_id ON applications(user_id);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_companies_name ON companies(name);
```

### 4. Environment Variables
Create a `.env` file in the root directory:
```env
PORT=8044
# Replace with your actual credentials
DATABASE_URL=postgres://username:password@localhost:5432/your_database_name
JWT_SECRET=your_super_secret_key_here
```

### 5. Run the Server
```bash
# Development Mode (with --watch)
npm run dev

# Start Production
npm start
```
The server will run on `http://localhost:8044` (or your defined PORT).

## 📡 API Endpoints

### Auth
*   `POST /api/auth/register` - Create a new account.
*   `POST /api/auth/login` - Login and receive a JWT.

### Applications (Protected)
*   `POST /api/applications` - Add a new job application.
*   `GET /api/applications` - List all your applications.
*   `GET /api/applications/:id` - Get details of a specific application.
*   `PUT /api/applications/:id` - Update status or role.
*   `DELETE /api/applications/:id` - Remove an application.

### Companies (Protected)
*   `GET /api/companies` - List all available companies (for dropdowns).
