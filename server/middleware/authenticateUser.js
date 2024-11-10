const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateUser = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  console.log("Token received:", token); // Debug line

  if (!token) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.userId };
    console.log("Decoded token, user ID:", req.user.id); // Debug line
    next();
  } catch (error) {
    console.error("Failed to authenticate user:", error); // Debug line
    res.status(403).json({ message: 'Access denied. Invalid token.' });
  }
};

module.exports = authenticateUser;