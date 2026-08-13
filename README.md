# 🚗 Car Showroom Management System (Backend API)

[![Node.js Version](https://img.shields.io/badge/node.js-%3E%3D%2016.0.0-blue.svg?style=flat-square&logo=node.js)](https://nodejs.org/)
[![Express.js Framework](https://img.shields.io/badge/express-4.21.2-green.svg?style=flat-square&logo=express)](https://expressjs.com/)
[![MongoDB Connection](https://img.shields.io/badge/mongodb-database-brightgreen.svg?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg?style=flat-square)](https://opensource.org/licenses/ISC)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-orange.svg?style=flat-square)](#)

A professional, role-based REST API designed for managing users, employees, and vehicles in a car showroom. Built with **Node.js**, **Express**, and **MongoDB (Mongoose)**, featuring secure authentication with JWT and strict Role-Based Access Control (RBAC).

---

## 🌟 Key Features

*   **Secure Authentication**: Password hashing using `bcrypt` and token-based state authorization with `JSON Web Tokens (JWT)`.
*   **Role-Based Access Control (RBAC)**: Strict differentiation between `admin` and `customer` privileges using custom middlewares.
*   **Complete Vehicle Inventory Management**: Add, update, delete, view, and transition vehicle statuses (`available`, `sold`, `upcoming`).
*   **Employee Records (Admin-only)**: Clean CRUD system for managing staff records securely.
*   **Database Seeding**: Easily generate a sandbox database loaded with sample users, vehicles, and staff for testing with one command.
*   **Modern Coding Standards**: Fully refactored into a structured Controller-Router layout for maximum scalability.

---

## 🏗️ Backend Architecture & Project Structure

The project employs a clean layered model separating routing, logic (controllers), and database schemas (models):

```text
├── config/             # Configuration templates
├── controllers/        # Business logic handlers
│   ├── adminController.js
│   ├── authController.js
│   └── vehicleController.js
├── middleware/         # Auth & access control middlewares
│   └── admin.js
├── model/              # MongoDB schemas
│   ├── Employee.js
│   ├── User.js
│   └── Vehicle.js
├── routes/             # Express routes defining API surface
│   ├── adminRoutes.js
│   ├── usersRoutes.js
│   └── vehicleRoutes.js
├── .env.example        # Environment variable configuration template
├── .gitignore          # Rules for preventing committed dependencies/secrets
├── auth.js             # Authentication verification middleware
├── db.js               # Database connection manager
├── index.js            # App entry point & main middleware stack
├── package.json        # Dependencies & start scripts
└── seed.js             # DB Seeding Script
```

---

## 🛠️ Tech Stack

*   **Runtime**: Node.js
*   **Framework**: Express.js
*   **Database**: MongoDB
*   **ODM**: Mongoose
*   **Security & Auth**: JWT (`jsonwebtoken`), `bcrypt` (password hashing), `cors` (CORS policies)
*   **Logger**: `morgan` (HTTP request logs)

---

## 🚀 Quick Start Guide

### 1. Prerequisites
Ensure you have the following installed on your machine:
*   [Node.js](https://nodejs.org/) (v16.0.0 or later)
*   [MongoDB](https://www.mongodb.com/try/download/community) running locally on port `27017`

### 2. Installation
Clone the repository and install the dependencies:
```bash
npm install
```

### 3. Setup Configuration
Copy the environment variables template and configure your secrets:
```bash
# Windows Command Prompt or PowerShell
copy .env.example .env
```
Open `.env` and set your preferred port, database connection string, and JWT secret key:
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/car-showroom
JWT_SECRET=super_secret_car_showroom_jwt_key_123!
```

### 4. Seed Database
Execute the database seeder to populate default test credentials, mock employees, and vehicles:
```bash
npm run seed
```
This inserts:
- **Admin Account**: `admin@showroom.com` (Password: `admin123`)
- **Customer Account**: `customer@showroom.com` (Password: `customer123`)
- Sample staff and premium cars with different statuses (`available`, `sold`, `upcoming`).

### 5. Running the Application
Start the development server with hot-reloading:
```bash
npm run dev
```
For production environments, run:
```bash
npm start
```
The server will boot up and log:
```text
Connected to MongoDB server at localhost:27017/car-showroom
Server running on http://localhost:3000
```

---

## 📝 API Endpoints Reference

All protected endpoints require sending the token in the Authorization Header:
`Authorization: Bearer <token>`

### Auth & Profile (`/user`)

| Method | Endpoint | Access Role | Description |
| :--- | :--- | :--- | :--- |
| **POST** | `/user/signup` | Public | Register a new customer account |
| **POST** | `/user/login` | Public | Sign in user & receive JWT token |
| **GET** | `/user/profile` | Customer | View logged-in customer profile details |
| **PUT** | `/user/profile` | Customer | Update own profile info (password is auto-hashed) |

### Vehicle Inventory (`/vehicle`)

| Method | Endpoint | Access Role | Description |
| :--- | :--- | :--- | :--- |
| **GET** | `/vehicle/vehicles/available` | Authenticated | List all cars with status `available` |
| **GET** | `/vehicle/vehicles/upcoming` | Authenticated | List all cars with status `upcoming` |
| **GET** | `/vehicle/vehicles/sold` | Authenticated | List all cars with status `sold` |
| **GET** | `/vehicle/` | Authenticated | Retrieve complete vehicle catalog |
| **GET** | `/vehicle/:id` | Authenticated | Retrieve specific vehicle detail |
| **POST** | `/vehicle/` | Admin | Add new car to inventory |
| **PUT** | `/vehicle/:id` | Admin | Update car specifications and attributes |
| **PUT** | `/vehicle/:id/sold` | Admin | Fast action: mark vehicle status to `sold` |
| **PUT** | `/vehicle/:id/available` | Admin | Fast action: mark vehicle status to `available` |
| **DELETE**| `/vehicle/:id` | Admin | Remove vehicle from system |

### Showroom Staff & Administration (`/admin`)

| Method | Endpoint | Access Role | Description |
| :--- | :--- | :--- | :--- |
| **GET** | `/admin/employees` | Admin | View database of all showroom staff |
| **POST** | `/admin/create` | Admin | Create a new employee profile |
| **GET** | `/admin/:id` | Admin | Retrieve a single employee's data by ID |
| **PUT** | `/admin/:id` | Admin | Modify employee details |
| **DELETE**| `/admin/:id` | Admin | Remove an employee record |
| **GET** | `/admin/customers` | Admin | View a directory of all registered customers |

---

## 👥 Authors
*   **Abdul Rehman** - [GitHub](https://github.com/)
*   **Muhammad Mujeeb Ur Rehman** - [GitHub](https://github.com/)
