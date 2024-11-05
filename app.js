const express = require('express')
const app = express()
const mysql = require('mysql2')
require('dotenv').config()


app.listen(process.env.PORT, () => {
    console.log('sagar patel is handsome')
})


const connection = mysql.createConnection({
    host: 'localhost',  // MySQL container or localhost if running locally
    user: 'root',       // MySQL root user
    password: process.env.DB_PASSWORD,  // MySQL root password
    database: 'hoteldatabase' // Database you want to connect to
});


connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ' + err.stack);
        return;
    }
    console.log('Connected to the database as ID ' + connection.threadId);
});

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS guests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    check_in DATE,
    check_out DATE
  );
`;

const insertDataQuery = `
  INSERT INTO guests (first_name, last_name, email, check_in, check_out)
  VALUES
    ('John', 'Doe', 'john.doe@example.com', '2024-11-01', '2024-11-05'),
    ('Jane', 'Smith', 'jane.smith@example.com', '2024-11-02', '2024-11-06');
`;

connection.query(createTableQuery, (err, result) => {
    if (err) {
        console.error('Error creating table: ' + err.stack);
        return;
    }
    console.log('Table created or already exists.');

    // Insert sample data into the guests table
    connection.query(insertDataQuery, (err, result) => {
        if (err) {
            console.error('Error inserting data: ' + err.stack);
            return;
        }
        console.log('Data inserted into the guests table.');

        // Close the connection
        connection.end();
    });
});