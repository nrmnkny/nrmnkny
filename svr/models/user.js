const db = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
  findByEmail: async (email) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await db.query(sql, [email]);
    return rows[0];
  },
  createUser: async (email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
    await db.query(sql, [email, hashedPassword]);
  }
};

module.exports = User;
