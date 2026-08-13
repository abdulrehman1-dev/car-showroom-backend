require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./model/User');
const Employee = require('./model/Employee');
const Vehicle = require('./model/Vehicle');

const mongoURL = process.env.MONGO_URI || 'mongodb://localhost:27017/car-showroom';

const seedData = async () => {
  try {
    console.log('Connecting to database for seeding...');
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB.');

    // Clear existing data
    console.log('Clearing existing collections...');
    await User.deleteMany({});
    await Employee.deleteMany({});
    await Vehicle.deleteMany({});
    console.log('Collections cleared.');

    // 1. Seed Users
    console.log('Seeding users...');
    const hashedAdminPassword = await bcrypt.hash('admin123', 10);
    const hashedCustomerPassword = await bcrypt.hash('customer123', 10);

    const admin = new User({
      name: 'Admin Showroom',
      email: 'admin@showroom.com',
      password: hashedAdminPassword,
      role: 'admin'
    });

    const customer = new User({
      name: 'John Doe',
      email: 'customer@showroom.com',
      password: hashedCustomerPassword,
      role: 'customer'
    });

    await admin.save();
    await customer.save();
    console.log('Admin user seeded: admin@showroom.com / admin123');
    console.log('Customer user seeded: customer@showroom.com / customer123');

    // 2. Seed Employees
    console.log('Seeding employees...');
    const employees = [
      { name: 'Kamran Akmal', email: 'kamran@showroom.com', position: 'Sales Manager', salary: 75000 },
      { name: 'Sajid Khan', email: 'sajid@showroom.com', position: 'Senior Technician', salary: 60000 },
      { name: 'Ayesha Omar', email: 'ayesha@showroom.com', position: 'Customer Relations', salary: 50000 }
    ];
    await Employee.insertMany(employees);
    console.log(`Seeded ${employees.length} employees successfully.`);

    // 3. Seed Vehicles
    console.log('Seeding vehicles...');
    const vehicles = [
      { name: 'Civic Reborn', brand: 'Honda', price: 2800000, status: 'available', specifications: '1.8L Engine, Automatic, Petrol, Sunroof' },
      { name: 'Corolla Altis Grande', brand: 'Toyota', price: 4200000, status: 'available', specifications: '1.8L Dual VVT-i, Automatic, Leather Seats' },
      { name: 'Sportage AWD', brand: 'Kia', price: 6500000, status: 'sold', specifications: '2.0L Engine, All-Wheel Drive, Panoramic Roof' },
      { name: 'Elantra GLS', brand: 'Hyundai', price: 3800000, status: 'sold', specifications: '1.6L DOHC, Automatic, Cruise Control' },
      { name: 'Swift GLX CVT', brand: 'Suzuki', price: 3100000, status: 'upcoming', specifications: '1.2L VVT, Continuously Variable Transmission, Push Start' },
      { name: 'Oshan X7', brand: 'Changan', price: 7200000, status: 'upcoming', specifications: '1.5L Turbocharged Engine, 7-seater SUV, BlueCore technology' }
    ];
    await Vehicle.insertMany(vehicles);
    console.log(`Seeded ${vehicles.length} vehicles successfully.`);

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
