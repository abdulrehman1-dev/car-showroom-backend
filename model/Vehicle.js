const mongoose = require('mongoose');

// Define the Vehicle schema
const vehicleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: String, enum: ['available', 'sold','upcoming'], default: 'available' },
  specifications: { type: String , required:true},
  createdAt: { type: Date, default: Date.now },
},
{
    collection: "Vehicles"
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
