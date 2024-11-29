const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const testConnection = async () => {
    try{
        const connection = await pool.getConnection();
        console.log('Database connected successfully');
        connection.release();
    } catch(error){
        console.error('Error connecting to database', error);
        process.exit(1)
    }
};

module.exports = { pool, testConnection }