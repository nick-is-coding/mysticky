const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: 'doadmin',
  password: 'AVNS_wJlhiGuZFP4D64PYiud',
  host: 'db-postgresql-nyc1-72255-do-user-13638499-0.b.db.ondigitalocean.com',
  port: 25060,
  database: 'defaultdb',
  ssl: {
    rejectUnauthorized: false
  }
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error executing query', err);
  } else {
    console.log('Query result', res.rows);
  }
});

app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error getting users');
  }
});

app.post('/users', async (req, res) => {
  try {
    const { subject , text } = req.body;

    const result = await pool.query('INSERT INTO users (subject, text) VALUES ($1, $2)', [subject, text]);
    await pool.query('COMMIT');

    res.json({ message: 'User added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding user');
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
