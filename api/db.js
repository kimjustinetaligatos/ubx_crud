const mysql = require("mysql");

// Create DB Connection
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ubx_crud"
});

// Start MySQL Con
connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

module.exports = connection;