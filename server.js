const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Middleware to parse JSON data
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory

// SQLite database connection
const db = new sqlite3.Database('./orders.db', (err) => {
    if (err) {
        console.error('Database connection error: ' + err.message);
    } else {
        console.log('Connected to SQLite database');
    }
});

// Ensure the orders table exists (you can run this manually or check if it exists first)
db.run(`
    CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_name TEXT NOT NULL,
        coffee_type TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        price REAL NOT NULL
    )
`);

// POST route to handle order submissions
app.post('/order', (req, res) => {
    const { customerName, coffeeType, quantity, price } = req.body;

    // Validate input
    if (!customerName || !coffeeType || !quantity || !price) {
        return res.status(400).send('Missing required fields');
    }

    // Insert the order data into the Orders table
    const query = `INSERT INTO orders (customer_name, coffee_type, quantity, price) VALUES (?, ?, ?, ?)`;
    db.run(query, [customerName, coffeeType, quantity, price], function (err) {
        if (err) {
            res.status(500).send('Error placing order: ' + err.message);
        } else {
            res.status(200).send('Order placed successfully');
        }
    });
});

// Default route to serve the menu HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'menu.html'));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
