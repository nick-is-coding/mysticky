const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5002;

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  connectionString: process.env.PG_CONNECTION_STRING,
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
    res.json(result.rows.map(row => ({
      id: row.id,
      subject: row.subject,
      text: row.text,
      color: row.color
    })));
  } catch (err) {
    console.error(err);
    res.status(500).send('Error getting users');
  }
});

app.post('/users', async (req, res) => {
  try {
    const { subject , text } = req.body;

    const result = await pool.query('INSERT INTO users (subject, text) VALUES ($1, $2) RETURNING id', [subject, text]);
    await pool.query('COMMIT');

    const newNoteId = result.rows[0].id; // get the ID of the newly inserted note

    res.json({ message: 'User added successfully', newNoteId });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding user');
  }
});

app.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { color } = req.body;

    const result = await pool.query('UPDATE users SET color = $1 WHERE id = $2', [color, id]);
    await pool.query('COMMIT');

    res.json({ message: `User ${id} updated successfully` });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating user');
  }
});


app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query('DELETE FROM users WHERE id = $1', [id]);
    await pool.query('COMMIT');

    res.json({ message: `User ${id} deleted successfully` });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting user');
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
