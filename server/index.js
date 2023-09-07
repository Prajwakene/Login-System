
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//for password 
// const salt =10;

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

// MySQL database configuration
const mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'loginsystem',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Secret key for JWT
const secretKey = 'your_secret_key';

// Register API
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert the user into the database
  db.query(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, hashedPassword],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Error registering user' });
      } else {
        res.status(201).json({ message: 'User registered successfully' });
      }
    }
  );
});

// Login API
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Check if the user exists
  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error logging in' });
    } else if (results.length > 0) {
      const user = results[0];
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const token = jwt.sign({ id: user.id, username: user.username }, secretKey, {
          expiresIn: '1h', // Token expires in 1 hour
        });

        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } else {
      res.status(401).json({ message: 'User not found' });
    }
  });
});

// Logout API
app.get('/api/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout successful' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
