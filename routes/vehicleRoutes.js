const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const authenticate = require('../auth');
const isAdmin = require('../middleware/admin');

// 1. Specific static endpoints MUST come before parameterized /:id routes
router.get('/vehicles/upcoming', authenticate, vehicleController.getUpcomingVehicles);
router.get('/vehicles/available', authenticate, vehicleController.getAvailableVehicles);
router.get('/vehicles/sold', authenticate, vehicleController.getSoldVehicles);

// 2. Base CRUD routes
router.post('/', isAdmin, vehicleController.createVehicle);
router.get('/', authenticate, vehicleController.getAllVehicles);
router.get('/:id', authenticate, vehicleController.getVehicleById);
router.put('/:id', isAdmin, vehicleController.updateVehicle);
router.delete('/:id', isAdmin, vehicleController.deleteVehicle);

// 3. Specific status change actions
router.put('/:id/sold', isAdmin, vehicleController.markAsSold);
router.put('/:id/available', isAdmin, vehicleController.markAsAvailable);

module.exports = router;
