const mongoose = require('mongoose');

// Define the Employee schema
const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  position: { type: String, required: true },
  salary: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
},
{
    collection: "employees"
});

module.exports = mongoose.model('Employee', employeeSchema);
