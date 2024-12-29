import React from 'react'
import Attendance from '../components/Attendance';
import Sidebar from '../components/Sidebar';

const AttendencePage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
       <Attendance />
      </div>
    </div>
  );
}

export default AttendencePage
