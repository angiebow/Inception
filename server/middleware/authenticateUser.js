const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  console.log("Token received:", token); // Debug line
  if (!token) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token payload:", decoded); // Debug line
    req.user = { id: decoded.userId };
    console.log("Decoded token, user ID:", req.user.id); // Debug line
    next();
  } catch (error) {
    console.error("Failed to authenticate user:", error.message);
    res.status(403).json({ message: 'Access denied. Invalid token.' });
  }
};

module.exports = authenticateUser;