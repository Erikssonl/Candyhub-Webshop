const { json } = require('body-parser');
const cors = require('cors');
const express = require('express');
const dotenv = require("dotenv");
dotenv.config();
const mysql = require('mysql2');

// Create a MySQL connection
const connection = mysql.createPool({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  port: process.env.db_port
});

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());

app.get('/products', async (req, res) => {
  try {
    const results = await new Promise((resolve, reject) => {
      connection.query('SELECT * FROM products', (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      });
    });

    res.json(results);
  } catch (error) {
    console.error('Error executing MySQL query: ' + error.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post("/registration", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    await new Promise((resolve, reject) => {
      connection.query("INSERT INTO users (username, password) VALUES (?,?)",
        [username, password],
        (err, result) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(result);
        }
      );
    });

    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error('Error executing MySQL query: ' + error.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post("/login", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const result = await new Promise((resolve, reject) => {
      connection.query("SELECT * FROM users WHERE username = ? AND password = ?",
        [username, password],
        (err, result) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(result);
        }
      );
    });

    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Wrong username or password" });
    }
  } catch (error) {
    console.error('Error executing MySQL query: ' + error.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post("/orders", async (req, res) => {
  try {
    const orders = req.body.orders;

    for (const item of orders) {
      const { name, price, quantity, orderId } = item;

      await new Promise((resolve, reject) => {
        connection.query('INSERT INTO orders (name, price, quantity, orderId) VALUES (?, ?, ?, ?)',
          [name, price, quantity, orderId], (err, result) => {
            if (err) {
              reject(err);
              return;
            }
            console.log('Row inserted:', result);
            resolve(result);
          });
      });
    }

    res.status(201).json({ message: 'Data is successfully inserted' });
  } catch (error) {
    console.error('Error executing MySQL query: ' + error.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});