const express = require('express');
const {
  getAllEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employeeController');
const router = express.Router();

// Define routes
router.get('/', getAllEmployees); // This route should fetch all employees
router.post('/', createEmployee); // This route should create a new employee
router.get('/:eid', getEmployeeById); // This route should fetch an employee by ID
router.put('/:eid', updateEmployee); // This route should update an employee by ID
router.delete('/:eid', deleteEmployee); // This route should delete an employee by ID

module.exports = router;
