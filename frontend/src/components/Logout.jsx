import React from 'react'

const Logout = ({ handleLogout, setIsLogoutModalOpen }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4 backgroundGradiend p-3">Confirm Logout</h2>
        <p className="mb-4">Are you sure you want to logout?</p>
        <div className="flex justify-end gap-4">
          <button
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={() => setIsLogoutModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded backgroundGradiend"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout
