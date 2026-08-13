const mongoose = require('mongoose');
const Vehicle = require('../model/Vehicle');

// Add a vehicle (Admin-only)
exports.createVehicle = async (req, res) => {
    try {
        const { name, brand, price, specifications, status } = req.body;

        // Validate required fields
        if (!name || !brand || !price) {
            return res.status(400).json({ error: 'Name, brand, and price are required fields.' });
        }

        // Create a new vehicle
        const newVehicle = new Vehicle({ name, brand, price, specifications, status });
        const response = await newVehicle.save();

        res.status(201).json({ message: 'Vehicle added successfully.', vehicle: response });
    } catch (error) {
        console.error('Create vehicle error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get all vehicles
exports.getAllVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        if (vehicles.length === 0) {
            return res.status(404).json({ message: 'No vehicles found.' });
        }
        res.json(vehicles);
    } catch (error) {
        console.error('Get all vehicles error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get a single vehicle by ID
exports.getVehicleById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid vehicle ID format.' });
        }

        const vehicle = await Vehicle.findById(id);
        if (!vehicle) return res.status(404).json({ error: 'Vehicle not found.' });

        res.json(vehicle);
    } catch (error) {
        console.error('Get vehicle by ID error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update vehicle details (Admin-only)
exports.updateVehicle = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid vehicle ID format.' });
        }

        const vehicle = await Vehicle.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!vehicle) return res.status(404).json({ error: 'Vehicle not found.' });
        res.json(vehicle);
    } catch (error) {
        console.error('Update vehicle error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete a vehicle (Admin-only)
exports.deleteVehicle = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid vehicle ID format.' });
        }

        const vehicle = await Vehicle.findByIdAndDelete(id);
        if (!vehicle) return res.status(404).json({ error: 'Vehicle not found.' });

        res.json({ message: 'Vehicle deleted successfully.' });
    } catch (error) {
        console.error('Delete vehicle error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Mark a vehicle as sold (Admin-only)
exports.markAsSold = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid vehicle ID format.' });
        }

        const vehicle = await Vehicle.findById(id);
        if (!vehicle) return res.status(404).json({ error: 'Vehicle not found.' });

        if (vehicle.status === 'sold') {
            return res.status(400).json({ error: 'Vehicle is already marked as sold.' });
        }

        vehicle.status = 'sold';
        await vehicle.save();
        res.json(vehicle);
    } catch (error) {
        console.error('Mark as sold error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Mark a vehicle as available (Admin-only)
exports.markAsAvailable = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid vehicle ID format.' });
        }

        const vehicle = await Vehicle.findById(id);
        if (!vehicle) return res.status(404).json({ error: 'Vehicle not found.' });

        if (vehicle.status === 'available') {
            return res.status(400).json({ error: 'Vehicle is already marked as available.' });
        }

        vehicle.status = 'available';
        await vehicle.save();
        res.json({ message: 'Vehicle status updated to available.', vehicle });
    } catch (error) {
        console.error('Mark as available error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get upcoming vehicles
exports.getUpcomingVehicles = async (req, res) => {
    try {
        const upcomingVehicles = await Vehicle.find({ status: 'upcoming' }, 'name brand price status specifications');
        if (upcomingVehicles.length === 0) {
            return res.status(404).json({ message: 'No upcoming vehicles found.' });
        }
        res.json(upcomingVehicles);
    } catch (error) {
        console.error('Get upcoming vehicles error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get available vehicles
exports.getAvailableVehicles = async (req, res) => {
    try {
        const availableVehicles = await Vehicle.find({ status: 'available' }, 'name brand price status specifications');
        if (availableVehicles.length === 0) {
            return res.status(404).json({ message: 'No available vehicles found.' });
        }
        res.json(availableVehicles);
    } catch (error) {
        console.error('Get available vehicles error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get sold vehicles
exports.getSoldVehicles = async (req, res) => {
    try {
        const soldVehicles = await Vehicle.find({ status: 'sold' }, 'name brand price status specifications');
        if (soldVehicles.length === 0) {
            return res.status(404).json({ message: 'No sold vehicles found.' });
        }
        res.json(soldVehicles);
    } catch (error) {
        console.error('Get sold vehicles error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
