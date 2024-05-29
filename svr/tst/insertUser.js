const bcrypt = require('bcryptjs');
const { query } = require('./db'); 
const sql = require('mssql');

const insertUser = async () => {
    const username = 'nrmnkny'; 
    const email = 'nrmnkny@example.com'; 
    const password = '@en_kenya.'; 
    const hashedPassword = await bcrypt.hash(password, 10);

    const sqlQuery = `
        INSERT INTO users (username, email, password)
        VALUES (@username, @username, @hashedPassword)
    `;

    const inputs = [
        { name: 'username', type: sql.NVarChar, value: username },
        { name: 'email', type: sql.NVarChar, value: email },
        { name: 'hashedPassword', type: sql.NVarChar, value: hashedPassword },
    ];

    try {
        await query(sqlQuery, inputs);
        console.log('User inserted successfully');
    } catch (error) {
        console.error('Error inserting user:', error);
    }
};

insertUser();
