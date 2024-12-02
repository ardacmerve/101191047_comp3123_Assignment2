const express = require('express');
const mongoose = require('mongoose');


const app = express();
app.use(express.json());  


mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/employees_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.log('Error connecting to MongoDB:', err);
  });


const Employee = mongoose.model('Employee', employeeSchema);


app.post('/employees', async (req, res) => {
  try {
    const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;
    const newEmployee = new Employee({
      first_name,
      last_name,
      email,
      position,
      salary,
      date_of_joining,
      department
    });

    await newEmployee.save();
    res.status(201).send(newEmployee);
  } catch (err) {
    res.status(400).send({ message: 'Error creating employee', error: err });
  }
});

// Route to list employees
app.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).send(employees);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching employees', error: err });
  }
});

// Start the server
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

