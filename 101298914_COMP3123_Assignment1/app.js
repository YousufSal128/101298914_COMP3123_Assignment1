require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const employeeRoutes = require('./routes/employee');

const app = express();

// Middleware
app.use(express.json()); // For parsing application/json

// MongoDB connection
const uri = "mongodb+srv://101298914:WXNtv0EhYLSI9CIs@mycluster.8eile.mongodb.net/?retryWrites=true&w=majority&appName=MyCluster";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected successfully"))
.catch(err => console.error("MongoDB connection error:", err));

// Define routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);

module.exports = app;
