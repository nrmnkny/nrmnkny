const sql = require('mssql');
const dotenv = require('dotenv');

dotenv.config();

const config = {
    server: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT),
    options: {
        encrypt: true, // Use encryption
        trustServerCertificate: true // Change to true for local dev / self-signed certs
    },
    authentication: {
        type: 'ntlm',
        options: {
            domain: process.env.DB_DOMAIN,
            userName: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        }
    }
};

let pool;

const getDbConnection = async () => {
    console.log('Attempting to connect to the database...');
    if (!pool) {
        console.log('No existing pool, creating new connection');
        try {
            pool = await sql.connect(config);
            console.log('Database connection successful');
        } catch (err) {
            console.error('Database connection failed:', err.message);
            throw err;
        }
    } else {
        console.log('Using existing pool connection');
    }
    return pool;
};

module.exports = { getDbConnection };
