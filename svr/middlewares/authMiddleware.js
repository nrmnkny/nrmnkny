const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded); // Log the decoded token
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification failed:', error); // Log the error
    res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = authMiddleware;
