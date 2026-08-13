const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'admin'], required: true },
  createdAt: { type: Date, default: Date.now },
},
{
    collection: "users"
});

module.exports = mongoose.model('User', userSchema);
