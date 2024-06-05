const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User details 
const user = {
  username: 'admin',
  password: '$2a$10$K5b2wMB7ElF5HorKDqu73eQm4ZkWY5XVwsEMtifcxilQC8EYBtNmi' 
};

// Login method
const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }
  if (username !== user.username) {
    return res.status(400).json({ message: 'Invalid username or password.' });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid username or password.' });
  }
  const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

// Renew token method
const renewToken = (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    const newToken = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token: newToken });
  });
};

module.exports = {
  login,
  renewToken,
};
