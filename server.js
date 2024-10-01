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
    user: 'root',         // Replace with your MySQL username
    password: '',         // Replace with your MySQL password
    database: 'gardener'  // The database we created
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database.');
});

// Handle form submission
app.post('/submit', (req, res) => {
    const { gname, gmail, cname, cage, message } = req.body;

    // Insert data into MySQL
    const query = 'INSERT INTO members (name, email, mobile, serviceType, message) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [gname, gmail, cname, cage, message], (err, result) => {
        if (err) {
            return res.status(500).send('Error saving member.');
        }
        res.status(200).send('Member saved successfully.');
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
