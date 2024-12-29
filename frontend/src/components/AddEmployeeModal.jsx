import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";

const AddEmployeeModal = ({ isOpen, onClose, onSubmit }) => {
  const [candidates, setCandidates] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    role: "",
    profilePic: "",
  });

  const fetchCandidates = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/candidates",
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    const data = res.data;

    setCandidates(data);
  };
  useEffect(() => {
    fetchCandidates();
  }, []);

  // Handle Select Employee (Auto-fill Email)

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const isImage = formData.profilePic && formData.profilePic.type.startsWith("image/");
  if (!isImage) {
    alert("Please upload a valid image file for the profile picture.");
    return;
  }
    onSubmit(formData);
    setFormData({
      employeeId: "",
      email: "",
      phone: "",
      department: "",
      profilePic: "",
      role: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-lg w-[600px] shadow-lg p-8 relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
          onClick={onClose}
        >
          <AiOutlineClose size={24} />
        </button>

        {/* Modal Header */}
        <h2 className="text-2xl font-bold text-center mb-8">
          Add New Employee
        </h2>

        {/* Modal Form */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6">
            {/* Employee Select */}
            <div>
              <label className="block mb-2 text-gray-700">Employee</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Email (Auto-filled) */}
            <div>
              <label className="block mb-2 text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-2 text-gray-700">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Department */}
            <div>
              <label className="block mb-2 text-gray-700">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* profilePic */}
            <div>
              <label className="block mb-2 text-gray-700">Designation</label>
              <input
                type="file"
                name="profilePic"
                onChange={(e) =>
                  setFormData({ ...formData, profilePic: e.target.files[0] })
                }
                required
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block mb-2 text-gray-700">Role</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center mt-8">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2 rounded-lg backgroundGradiend"
            >
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
