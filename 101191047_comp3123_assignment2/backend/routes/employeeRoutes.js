const express = require('express');
const { body, validationResult } = require('express-validator');
const Employee = require('../models/Employee');

const router = express.Router();

// Get all employees
router.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});

// Create a new employee
router.post('/employees', [
  body('first_name').notEmpty().withMessage('First name is required'),
  body('last_name').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Email is invalid'),
  body('position').notEmpty().withMessage('Position is required'),
  body('salary').isNumeric().withMessage('Salary must be a number'),
  body('date_of_joining').isISO8601().toDate().withMessage('Joining date is required'),
  body('department').notEmpty().withMessage('Department is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: false, errors: errors.array() });
  }

  try {
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res.status(201).json({ message: "Employee created successfully.", employee: newEmployee });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});

// Get an employee by ID
router.get('/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ status: false, message: "Employee not found." });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});

// Update employee details
router.put('/employees/:id', async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEmployee) {
      return res.status(404).json({ status: false, message: "Employee not found." });
    }
    res.status(200).json({ message: "Employee updated successfully.", employee: updatedEmployee });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});

// Delete an employee
router.delete('/employees/:id', async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({ status: false, message: "Employee not found." });
    }
    res.status(200).json({ message: "Employee deleted successfully." });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});

module.exports = router;

