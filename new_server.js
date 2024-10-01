const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Middleware to parse incoming requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',  // Your MySQL password
    database: 'garden'  // Ensure this database exists
});

// Connect to MySQL database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        throw err;
    }
    console.log('Connected to MySQL database.');

    // Create 'members' table if it doesn't exist
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS members (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            mobile VARCHAR(20) NOT NULL,
            serviceType VARCHAR(255) NOT NULL,
            message TEXT
        )
    `;
    
    db.query(createTableQuery, (err, result) => {
        if (err) throw err;
        console.log("Members table created or already exists.");
    });
});

// Handle form submission
app.post('/submit', (req, res) => {
    const { gname, gmail, cname, cage, message } = req.body;

    // Insert data into MySQL
    const query = 'INSERT INTO members (name, email, mobile, serviceType, message) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [gname, gmail, cname, cage, message], (err, result) => {
        if (err) {
            console.error('Error saving member:', err);
            return res.status(500).send('Error saving member.');
        }
        res.status(200).send('Member saved successfully.');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
