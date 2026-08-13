const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'SECRET_KEY';

// Authentication middleware
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authorization token missing or malformed.' });
    }

    const token = authHeader.split(' ')[1];

    // Verify the token and attach the payload to `req.user`
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded; // Contains userId and role from token payload
    next();
  } 
  catch (error) {
    console.error('Authentication error:', error.message);
    res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

module.exports = authenticate;