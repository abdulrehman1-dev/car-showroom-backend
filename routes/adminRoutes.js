const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const isAdmin = require('../middleware/admin');

// 1. Static endpoints MUST come before parameterized /:id routes
router.get('/employees', isAdmin, adminController.getAllEmployees);
router.get('/customers', isAdmin, adminController.getAllCustomers);

// 2. Action endpoints and general CRUD
router.post('/create', isAdmin, adminController.createEmployee);
router.get('/:id', isAdmin, adminController.getEmployeeById);
router.put('/:id', isAdmin, adminController.updateEmployee);
router.delete('/:id', isAdmin, adminController.deleteEmployee);

module.exports = router;
