const { json } = require('body-parser');
const cors = require('cors');
const express = require('express');
const mysql = require('mysql');


// Create a MySQL connection
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'YiGdf?ysc?F$4HEy',
  database: 'candy_hub_db',
  port: 3006
});

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());

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

app.post("/registration", (req, res) => {

  const username = req.body.username;
  const password = req.body.password;

  connection.query("INSERT INTO users (username, password) VALUES (?,?)",
    [username, password],
    (err, result) => {
      if (err) {
        res.status(400).json(err)
      } else {
        return res.status(200).json(result);
      }
    }
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});