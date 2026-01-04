This schema is designed for a job application tracking system, with normalized tables, UUID primary keys, and strong relational integrity.

users — Authentication & Ownership
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

companies — Normalized Company Data
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  website TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

applications 
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

application_notes 
CREATE TABLE application_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  note TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



users ───< applications >─── companies
             |
             └───< application_notes


Indexes for optimize and faster search : 

CREATE INDEX idx_applications_user_id ON applications(user_id);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_companies_name ON companies(name);

