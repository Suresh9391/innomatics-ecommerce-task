const jwt = require('jsonwebtoken');

// Middleware to protect routes
const protect = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];  // Extract token from 'Authorization' header

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  // JWT_SECRET is stored in .env
        req.user = decoded;  // Attach user data (decoded JWT) to request
        next();  // Continue to the next middleware/route handler
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();  // If user is admin, proceed to the next middleware/route
    } else {
        res.status(403).json({ message: 'Not authorized as an admin' });
    }
};

module.exports = { protect, isAdmin };
