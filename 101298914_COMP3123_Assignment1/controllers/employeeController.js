const Employee = require('../models/Employee');

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createEmployee = async (req, res) => {
  console.log('Request Body:', req.body); // Log the incoming request
  console.log('Request URL:', req.originalUrl); // Log the request URL

  try {
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res.status(201).json({ 
      message: 'Employee created successfully', 
      employee_id: newEmployee._id 
    });
  } catch (error) {
    console.error('Error creating employee:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.eid);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json(employee);
  } catch (error) {
    console.error('Error fetching employee by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateEmployee = async (req, res) => {
  const employeeId = req.params.eid.trim();
  console.log('Updating Employee ID:', employeeId);
  console.log('Request Body:', req.body);

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(employeeId, req.body, { new: true });
    if (!updatedEmployee) return res.status(404).json({ message: 'Employee not found' });
    
    res.status(200).json({ 
      message: 'Employee details updated successfully', 
      employee: updatedEmployee 
    });
  } catch (error) {
    console.error('Update Error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid employee ID format' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteEmployee = async (req, res) => {
  const employeeId = req.params.eid.trim(); 
  console.log('Deleting Employee ID:', employeeId);

  try {
    const result = await Employee.findByIdAndDelete(employeeId);
    if (!result) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    
    // Respond with a 200 status and a success message
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Delete Error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid employee ID format' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

