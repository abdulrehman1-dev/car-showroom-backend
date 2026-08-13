const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User');

const JWT_SECRET = process.env.JWT_SECRET || 'SECRET_KEY';

// Register a customer
exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Basic validation
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required.' });
        }

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: 'Email already registered.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new customer
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: 'customer' // Signups default to customer role
        });

        const response = await newUser.save();
        
        // Return user without password
        const userObj = response.toObject();
        delete userObj.password;

        res.status(201).json({ message: 'Customer registered successfully.', user: userObj });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Login (for all roles)
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required.' });
        }

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found.' });

        // Validate the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ error: 'Invalid credentials.' });

        // Generate a JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ token, role: user.role, name: user.name });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update profile
exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const updatedData = { ...req.body };

        // Do not allow changing role directly via profile update
        delete updatedData.role;

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Check if the request contains a new password
        if (updatedData.password) {
            // Hash the new password before updating
            const salt = await bcrypt.genSalt(10);
            updatedData.password = await bcrypt.hash(updatedData.password, salt);
        }

        // Update the user's data in the database
        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true, runValidators: true }).select('-password');

        res.json({ message: 'Profile updated successfully.', user: updatedUser });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// View own profile
exports.getProfile = async (req, res) => {
    try {
        if (req.user.role !== 'customer') {
            return res.status(403).json({ error: 'Access denied. Only customers can view their profile.' });
        }

        // Fetch the logged-in customer's details (exclude password)
        const customer = await User.findById(req.user.id).select('-password');

        if (!customer) return res.status(404).json({ error: 'Customer not found.' });

        res.json(customer);
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
