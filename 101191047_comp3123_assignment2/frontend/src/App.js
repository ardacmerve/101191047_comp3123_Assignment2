import React, { useState, useEffect } from 'react';
import EmployeeForm from './components/EmployeeForm'; 
import EmployeeList from './components/EmployeeList';

function App() {
  const [employees, setEmployees] = useState([]);


  useEffect(() => {
    fetch('http://localhost:6000/employees')
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.error('Error fetching employees:', error));
  }, []);

  return (
    <div className="App">
      <h1>Employee Management</h1>
      
    
      <EmployeeForm setEmployees={setEmployees} />
      
    
      <EmployeeList employees={employees} />
    </div>
  );
}

export default App;
;

