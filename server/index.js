const express = require('express');
const mysql = require('mysql');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'YiGdf?ysc?F$4HEy',
  database: 'candy_hub_db',
  port: 3006
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database as id ' + connection.threadId);
});

const app = express();
const port = 3000;

app.get('/products', (req, res) => {
  connection.query('SELECT * FROM products', (error, results) => {
    if (error) {
      console.error('Error executing MySQL query: ' + error.stack);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});