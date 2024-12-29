import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const AddCandidateModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    resume: null,
    declaration: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const newValue = type === "checkbox" ? checked : files ? files[0] : value;
    setFormData({ ...formData, [name]: newValue });
  };
 

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: "",
      email: "",
      phone: "",
      position: "",
      experience: "",
      resume: null,
      declaration: false,
    });
    onClose();
  };

  if (!isOpen) return null;
 

  return (
    <div className="fixed  inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-lg w-[500px] shadow-lg p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
          onClick={onClose}
        >
          <AiOutlineClose size={24} />
        </button>

        {/* Modal Header */}
        <h2 className="text-2xl font-bold text-center mb-6 backgroundGradiend h-12">
          Add New Candidate
        </h2>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-between">
            <div className="w-[48%]">
              <label className="block mb-2 text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="w-[48%]">
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
          </div>

          <div className="flex justify-between">
            <div className="w-[48%]">
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

            <div className="w-[48%]">
              <label className="block mb-2 text-gray-700">Position</label>
              <input
                type="text"
                name="position"
                value={formData.department}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div className="flex justify-between">
            <div className="w-[48%]">
              <label className="block mb-2 text-gray-700">
                Experience (years)
              </label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="w-[48%]">
              <label className="block mb-2 text-gray-700">
                Resume (PDF only)
              </label>
              <input
                type="file"
                name="resume"
                accept=".pdf"
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="declaration"
              checked={formData.declaration}
              onChange={handleChange}
              required
              className="mr-2"
            />
            <span className="text-gray-700">
              Lorem ipsum dolor sit amet consectetur.
            </span>
          </div>

          {/* Submit Button */}
          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg backgroundGradiend"
            >
              Add Candidate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCandidateModal;
