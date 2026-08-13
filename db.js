const mongoose = require('mongoose');

// Get MongoDB connection URL from environment variables, fallback if not defined
const mongoURL = process.env.MONGO_URI || 'mongodb://localhost:27017/car-showroom';

// Set up MongoDB connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

// Define event listeners for database connection
db.on('connected', () => {
    console.log(`Connected to MongoDB server at ${mongoURL.split('@').pop()}`);
});

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

// Export the database connection
module.exports = db;