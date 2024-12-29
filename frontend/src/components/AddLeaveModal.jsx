import React from 'react'
import { AiOutlineClose } from "react-icons/ai";
const AddLeaveModal = ({
  setIsModalOpen,
  newLeave,
  setNewLeave,
  employees,
  addLeave,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-[500px] relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
          onClick={() => setIsModalOpen(false)}
        >
          <AiOutlineClose size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center backgroundGradiend">Add Leave</h2>
        <div className="grid grid-cols-2 gap-4">
          <select
            className="border p-2"
            value={newLeave.employeeId}
            onChange={(e) =>
              setNewLeave({ ...newLeave, employeeId: e.target.value })
            }
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Leave Type"
            className="border p-2"
            value={newLeave.leaveType}
            onChange={(e) =>
              setNewLeave({ ...newLeave, leaveType: e.target.value })
            }
          />
          <input
            type="date"
            className="border p-2"
            value={newLeave.startDate}
            onChange={(e) =>
              setNewLeave({ ...newLeave, startDate: e.target.value })
            }
          />
          <input
            type="date"
            className="border p-2"
            value={newLeave.endDate}
            onChange={(e) =>
              setNewLeave({ ...newLeave, endDate: e.target.value })
            }
          />
          <textarea
            placeholder="Reason"
            className="border p-2 col-span-2"
            value={newLeave.reason}
            onChange={(e) =>
              setNewLeave({ ...newLeave, reason: e.target.value })
            }
          ></textarea>
          <input
            type="file"
            className="border p-2 col-span-2"
            onChange={(e) =>
              setNewLeave({ ...newLeave, document: e.target.files[0] })
            }
          />
          <button
            className="col-span-2 bg-green-500 text-white p-2 rounded backgroundGradiend"
            onClick={addLeave}
          >
            Add Leave
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLeaveModal
