const jwt = require('jsonwebtoken');

// Function to generate a JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d', // Token valid for 1 day
  });
};

// Middleware to verify a JWT token
const verifyToken = (req, res, next) => {
  const token = req.cookies.token; // Retrieve token from cookies

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to request
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = { generateToken, verifyToken };
