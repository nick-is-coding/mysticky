CREATE DATABASE defaultdb;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  subject VARCHAR(50) NOT NULL,
  text VARCHAR(500) NOT NULL
);