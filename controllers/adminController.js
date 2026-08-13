const mongoose = require('mongoose');
const Employee = require('../model/Employee');
const User = require('../model/User');

// Create an employee (Admin-only)
exports.createEmployee = async (req, res) => {
    try {
        const { name, email, position, salary } = req.body;

        if (!name || !email || !position || !salary) {
            return res.status(400).json({ error: 'Name, email, position, and salary are required.' });
        }

        // Check if employee already exists
        const employeeExists = await Employee.findOne({ email });
        if (employeeExists) {
            return res.status(400).json({ error: 'Employee email already exists.' });
        }

        const newEmployee = new Employee({ name, email, position, salary });
        const response = await newEmployee.save();
        res.status(201).json(response);
    } catch (error) {
        console.error('Create employee error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get all employees (Admin-only)
exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        if (employees.length === 0) {
            return res.status(404).json({ message: 'No employees found.' });
        }
        res.json(employees);
    } catch (error) {
        console.error('Get all employees error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get a single employee by ID (Admin-only)
exports.getEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid employee ID format.' });
        }

        const employee = await Employee.findById(id);
        if (!employee) return res.status(404).json({ error: 'Employee not found.' });

        res.json(employee);
    } catch (error) {
        console.error('Get employee by ID error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update an employee (Admin-only)
exports.updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid employee ID format.' });
        }

        const employee = await Employee.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!employee) return res.status(404).json({ error: 'Employee not found.' });

        res.json(employee);
    } catch (error) {
        console.error('Update employee error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete an employee (Admin-only)
exports.deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid employee ID format.' });
        }

        const employee = await Employee.findByIdAndDelete(id);
        if (!employee) return res.status(404).json({ error: 'Employee not found.' });

        res.json({ message: 'Employee deleted successfully.' });
    } catch (error) {
        console.error('Delete employee error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get all customers (Admin-only)
exports.getAllCustomers = async (req, res) => {
    try {
        // Retrieve all customers
        const customers = await User.find({ role: 'customer' }).select('-password');

        if (customers.length === 0) {
            return res.status(404).json({ message: 'No customers found.' });
        }
        res.json(customers);
    } catch (error) {
        console.error('Get all customers error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
