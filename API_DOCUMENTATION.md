# Car Showroom Management System - API Documentation

Base URL: `http://localhost:5000`

## Table of Contents
1. [Authentication & Users](#1-authentication--users)
2. [Vehicle Management](#2-vehicle-management)
3. [Admin & Employees](#3-admin--employees)

---

## 1. Authentication & Users
Base Route: `/user`

### Register a User
- **Method:** `POST`
- **Endpoint:** `/user/signup`
- **Access:** Public
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

### Login
- **Method:** `POST`
- **Endpoint:** `/user/login`
- **Access:** Public
- **Body:**
  ```json
  {
    "email": "admin@showroom.com",
    "password": "admin123"
  }
  ```
- **Response:** Returns a JWT token to be used in the `Authorization` header (`Bearer <token>`).

### Get User Profile
- **Method:** `GET`
- **Endpoint:** `/user/profile`
- **Access:** Private (Requires Token)

### Update User Profile
- **Method:** `PUT`
- **Endpoint:** `/user/profile`
- **Access:** Private (Requires Token)

---

## 2. Vehicle Management
Base Route: `/vehicle`

### Get All Vehicles
- **Method:** `GET`
- **Endpoint:** `/vehicle/`
- **Access:** Private (Requires Token)

### Add New Vehicle
- **Method:** `POST`
- **Endpoint:** `/vehicle/`
- **Access:** Admin Only
- **Body:**
  ```json
  {
    "name": "Civic Oriel",
    "brand": "Honda",
    "price": 8500000,
    "specifications": "1.8L i-VTEC",
    "status": "available"
  }
  ```

### Get Vehicle by ID
- **Method:** `GET`
- **Endpoint:** `/vehicle/:id`
- **Access:** Private (Requires Token)

### Update Vehicle
- **Method:** `PUT`
- **Endpoint:** `/vehicle/:id`
- **Access:** Admin Only

### Delete Vehicle
- **Method:** `DELETE`
- **Endpoint:** `/vehicle/:id`
- **Access:** Admin Only

### Status Filters
- **Method:** `GET`
- **Endpoints:** 
  - `/vehicle/upcoming`
  - `/vehicle/available`
  - `/vehicle/sold`
- **Access:** Private (Requires Token)

### Update Vehicle Status
- **Method:** `PUT`
- **Endpoints:**
  - `/vehicle/:id/sold` (Marks as sold)
  - `/vehicle/:id/available` (Marks as available)
- **Access:** Admin Only

---

## 3. Admin & Employees
Base Route: `/admin`
*Note: All routes in this section require an Admin token.*

### Get All Employees
- **Method:** `GET`
- **Endpoint:** `/admin/employees`

### Get All Customers
- **Method:** `GET`
- **Endpoint:** `/admin/customers`

### Create an Employee
- **Method:** `POST`
- **Endpoint:** `/admin/create`
- **Body:**
  ```json
  {
    "name": "Ali Raza",
    "email": "ali@showroom.com",
    "position": "Sales Executive",
    "salary": 50000
  }
  ```

### Get Employee by ID
- **Method:** `GET`
- **Endpoint:** `/admin/:id`

### Update Employee
- **Method:** `PUT`
- **Endpoint:** `/admin/:id`

### Delete Employee
- **Method:** `DELETE`
- **Endpoint:** `/admin/:id`
