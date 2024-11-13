const sqlite3 = require('sqlite3').verbose();

// Create and connect to the SQLite database
const db = new sqlite3.Database('orders.db', (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Connected to SQLite database');
    }
});

// SQL statement to create the orders table if it doesn't exist
const createTableQuery = `
    CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customerName TEXT NOT NULL,
        item TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        orderDate TEXT DEFAULT CURRENT_TIMESTAMP
    )
`;

// Execute the query to create the table
db.run(createTableQuery, (err) => {
    if (err) {
        console.error('Error creating table:', err);
    } else {
        console.log('Orders table is ready');
    }
});

// Close the database connection
db.close((err) => {
    if (err) {
        console.error('Error closing the database:', err);
    } else {
        console.log('Database connection closed');
    }
});
