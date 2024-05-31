const sql = require('mssql');

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
};

let poolPromise;

const getDbConnection = async () => {
    if (!poolPromise) {
        poolPromise = sql.connect(config);
    }
    return poolPromise;
};

const query = async (queryString, inputs = []) => {
    const pool = await getDbConnection();
    const request = pool.request();
    inputs.forEach(input => {
        request.input(input.name, input.type, input.value);
    });
    const result = await request.query(queryString);
    return result.recordset;
};

module.exports = {
    getDbConnection,
    query,
};
