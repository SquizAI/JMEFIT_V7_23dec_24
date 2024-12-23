-- Enable foreign keys
PRAGMA foreign_keys = ON;

-- Users table with role-based access control
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT CHECK(role IN ('user', 'admin', 'trainer')) DEFAULT 'user',
  permissions TEXT DEFAULT '[]',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin user (password: admin123)
INSERT OR IGNORE INTO users (email, password_hash, name, role) 
VALUES (
  'admin@jmefit.com',
  '$2a$10$zXwPxpMeOLV8JWZz5ZQe5.QR1YUKEHgYMZ3V.9MZ5.h8yGEjqxX4q',
  'Admin User',
  'admin'
);

-- Rest of the schema remains unchanged...