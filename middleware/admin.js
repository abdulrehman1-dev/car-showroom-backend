// middleware/admin.js
const authenticate = require('../auth'); // Import authentication middleware

const isAdmin = (req, res, next) => {
    // First, call the authenticate middleware to check if the user is authenticated
    authenticate(req, res, () => {
        // Now check if the user role is admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied. Only admins can perform this action.' });
        }
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = isAdmin;