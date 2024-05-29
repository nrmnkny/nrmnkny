const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

// User details (for demonstration purposes)
const user = {
  username: 'admin',
  password: '$2a$10$K5b2wMB7ElF5HorKDqu73eQm4ZkWY5XVwsEMtifcxilQC8EYBtNmi' 
};

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (username !== user.username) {
    return res.status(400).json({ message: 'Invalid username or password.' });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid username or password.' });
  }
  const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
