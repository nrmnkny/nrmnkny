const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

const user = {
  email: 'corei2308@gmail.com',
  password: '$2a$10$K5b2wMB7ElF5HorKDqu73eQm4ZkWY5XVwsEMtifcxilQC8EYBtNmi' // '@en_kenya.'
};

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (email !== user.email) {
    return res.status(400).json({ message: 'Invalid email or password.' });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid email or password.' });
  }
  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
