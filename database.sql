CREATE TABLE votes (
  rm VARCHAR(5) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  option VARCHAR(50),
  voted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(rm, name)
);

CREATE INDEX idx_votes_rm_name ON votes(rm, name);