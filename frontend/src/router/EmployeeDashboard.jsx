import React from 'react'
import Sidebar from '../components/Sidebar';
import EmployeeList from '../components/EmployeeList';

const EmployeeDashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <EmployeeList />
      </div>
    </div>
  );
}

export default EmployeeDashboard
