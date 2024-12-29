import React from 'react'
import Sidebar from '../components/Sidebar';
import LeaveList from '../components/LeaveList';

const LeavePage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <LeaveList />
      </div>
    </div>
  );
}

export default LeavePage
