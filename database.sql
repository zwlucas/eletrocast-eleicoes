CREATE TABLE votes (
  id SERIAL PRIMARY KEY,
  rm VARCHAR(5) NOT NULL,
  name VARCHAR(100) NOT NULL,
  cpf VARCHAR(11) NOT NULL,
  option_voted VARCHAR(50),
  voted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(rm, cpf)
);

CREATE INDEX idx_votes_rm_cpf ON votes(rm, cpf);