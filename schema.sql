CREATE TABLE IF NOT EXISTS signups (
  email TEXT PRIMARY KEY,
  role TEXT NOT NULL CHECK (role IN ('najemnik', 'lastnik')),
  created_at TEXT NOT NULL,
  unsubscribed_at TEXT
);
