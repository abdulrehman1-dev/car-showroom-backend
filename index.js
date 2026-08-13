require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./db');

const app = express();

// 1. Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// 2. Request logging via Morgan
app.use(morgan('dev'));

// 3. Body Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. Welcome/Health Route
app.get('/', (req, res) => {
    res.status(200).json({ 
        status: 'success',
        message: 'Welcome to the Car Showroom Management API!', 
        timestamp: new Date()
    });
});

// 5. Mount API Routes
const vehicleRoutes = require('./routes/vehicleRoutes');
const usersRoutes = require('./routes/usersRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/vehicle', vehicleRoutes);
app.use('/user', usersRoutes);
app.use('/admin', adminRoutes);

// 6. Global 404 Route handler
app.use((req, res, next) => {
    res.status(404).json({ error: 'Endpoint not found.' });
});

// 7. Global Centralized Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err.message || err);
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error'
    });
});

// 8. Bootstrap Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

module.exports = app; // For testing
