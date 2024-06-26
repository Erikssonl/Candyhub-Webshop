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

// app.get('/products', (req, res) => {
//   connection.query('SELECT * FROM products', (error, results) => {
//     if (error) {
//       console.error('Error executing MySQL query: ' + error.stack);
//       res.status(500).json({ error: 'Internal Server Error' });
//       return;
//     }
//     res.json(results);
//   });
// });

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

// app.post("/registration", (req, res) => {

//   const username = req.body.username;
//   const password = req.body.password;

//   connection.query("INSERT INTO users (username, password) VALUES (?,?)",
//     [username, password],
//     (err, result) => {
//       if (err) {
//         res.status(400).json(err)
//       } else {
//         return res.status(200).json(result);
//       }
//     }
//   );
// });

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

// app.post("/login", (req, res) => {
//   const username = req.body.username;
//   const password = req.body.password;

//   connection.query("SELECT * FROM users WHERE username = ? AND password = ?",
//     [username, password],
//     (err, result) => {
//       if (err) {
//         res.send({err: err})
//         console.log(err)
//       } 

//       if (result) {
//         res.send(result)
//       } else {
//         res.send({message: "No user found, wrong username or password"})
//       }
//     }
//   );

// })

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

// app.post("/orders", (req, res) => {
//   const orders = req.body.orders;

//   orders.forEach(item => {
//     const { name, price, quantity, orderId } = item;
//     connection.query('INSERT INTO orders (name, price, quantity, orderId) VALUES (?, ?, ?, ?)',
//       [name, price, quantity, orderId], (err, result) => {
//         if (err) {
//           console.error(err);
//           res.status(500).json({ error: 'Internal Server Error' });
//         } else {
//           console.log('Row inserted:', result);
//           res.status(201).json({ message: 'Data is successfully inserted' });
//         }
//       });
//   });
// });

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