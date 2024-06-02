const { getDbConnection } = require('../config/db');

const testConnection = async () => {
    try {
        const pool = await getDbConnection();
        console.log('Connected to the database!');
        pool.close();
    } catch (error) {
        console.error('Database connection failed:', error.message);
    }
};

testConnection();
