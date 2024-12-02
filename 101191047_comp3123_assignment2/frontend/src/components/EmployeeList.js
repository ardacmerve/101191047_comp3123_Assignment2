import React from 'react';

function EmployeeList({ employees }) {
  return (
    <div>
      <h2>Employee List</h2>
      <ul>
        {employees.map(employee => (
          <li key={employee._id}>
            {employee.first_name} {employee.last_name} - {employee.position} ({employee.department})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeList;
