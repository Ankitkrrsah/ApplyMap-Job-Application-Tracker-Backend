1️⃣ Connect to PostgreSQL default DB

On macOS, connect to postgres database:

psql postgres


or if username required:

psql -U ankitkumar postgres


✅ You should now see:

postgres=#

2️⃣ Create the database

Inside postgres=# run:

CREATE DATABASE "ApplyMap";


📌 Quotes are optional but safe.

Verify:

\l


You should see ApplyMap in the list.

3️⃣ Connect to ApplyMap
\c ApplyMap


You’ll see:

You are now connected to database "ApplyMap"
ApplyMap=#

Enable UUID generation (run once)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

1️⃣ users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

2️⃣ companies table
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  website TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

3️⃣ applications table (CORE)
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

4️⃣ application_notes table
CREATE TABLE application_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  note TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

5️⃣ Indexes (HIGHLY recommended)
CREATE INDEX idx_applications_user_id ON applications(user_id);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_companies_name ON companies(name);

✅ Verify everything

Run:

\dt


Expected:

 users
 companies
 applications
 application_notes


Check structure:

\d applications