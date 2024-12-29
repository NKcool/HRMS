import React, { useEffect, useState } from "react";
import ReusableHeader from "./ReusableHeader";
import AddCandidateModal from "./AddCandidateModal";
import axios from "axios";
import { AiFillX } from "react-icons/ai";



const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

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

  const handleSearch = (e) => setSearch(e.target.value);

  const filteredCandidates = candidates.filter(
    (candidate) =>
      candidate.name.toLowerCase().includes(search.toLowerCase()) &&
      (positionFilter ? candidate.position === positionFilter : true) &&
      (statusFilter ? candidate.status === statusFilter : true)
  );

  const handleAddCandidate = async (newCandidate) => {
    const formData = new FormData();
    formData.append("name", newCandidate.name);
    formData.append("email", newCandidate.email);
    formData.append("phone", newCandidate.phone);
    formData.append("position", newCandidate.position);
    formData.append("experience", newCandidate.experience);
    formData.append("document", newCandidate.resume);
    

    const res = await axios.post(
      "http://localhost:5000/api/candidates",
      formData,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    
    fetchCandidates();
  };

  // Status Options
  const statusOptions = ["new", "rejected", "ongoing", "selected", "pending"];

  // Handle Status Update
  const handleStatusUpdate = async (id, newStatus) => {
    const updateCandidate = await axios.put(
      `http://localhost:5000/api/candidates/${id}`,
      { status: newStatus },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    fetchCandidates();
  };

  const handleDelete = async (id) => {
    const res = await axios.delete(
      `http://localhost:5000/api/candidates/${id}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    fetchCandidates();
  };
  const getRowClass = (status) => {
    switch (status.toLowerCase()) {
      case "new":
        return "text-gray-500 ";
      case "rejected":
        return "text-red-500 ";
      case "ongoing":
        return "text-green-500 ";
      case "selected":
        return "text-blue-500 ";
      case "pending":
        return "text-yellow-500 ";
      default:
        return "text-gray-500 ";
    }
  };

  return (
    <div className="p-8 h-screen overflow-y-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Candidates</h1>
        <ReusableHeader />
      </div>
      <div className="flex justify-between mb-6">
        <div className="flex gap-4">
          {/* Position Filter */}
          <select
            value={positionFilter}
            onChange={(e) => setPositionFilter(e.target.value)}
            className="border p-2 rounded-lg"
          >
            <option value="">All</option>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="Full Stack">Full Stack</option>
            <option value="Figma develover">Figma develover</option>
            <option value="TL">TL</option>
            <option value="Ai develover">Ai develover</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border p-2 rounded-lg"
          >
            <option value="">All</option>
            <option value="new">New</option>
            <option value="ongoing">Ongoing</option>
            <option value="selected">Selected</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Search and Add Button */}
        <div className="flex gap-4">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search by name..."
            className="border p-2 rounded-lg"
          />
          <button
            onClick={() => setModalOpen(true)}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 backgroundGradiend"
          >
            + Add Candidate
          </button>
        </div>
      </div>

      <div className="overflow-x-auto overflow-y-auto" style={{ width:"84vw" }}>
        <table className="w-full bg-white rounded-lg shadow-lg text-center">
          <thead className="bg-gray-100 backgroundGradiend">
            <tr>
              <th className="py-4 px-6 text-left">Sr. no</th>
              <th className="py-4 px-6 text-left">Candidate Name</th>
              <th className="py-4 px-6 text-left">Email ID</th>
              <th className="py-4 px-6 text-left">Phone</th>
              <th className="py-4 px-6 text-left">Position</th>
              <th className="py-4 px-6 text-left">Status</th>
              <th className="py-4 px-6 text-left">Experience</th>
              <th className="py-4 px-6 text-left">Resume</th>
              <th className="py-4 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.map((candidate, index) => (
              <tr
                key={candidate._id}
                className={`border-t font-bold hover:bg-gray-50 ${getRowClass(
                  candidate.status
                )}`}
                
              >
                <td className="py-4 px-6">
                  <div className={`box${index}`}></div>
                  0{index + 1}
                </td>
                <td className="py-4 px-6">{candidate.name}</td>
                <td className="py-4 px-6">{candidate.email}</td>
                <td className="py-4 px-6">{candidate.phone}</td>
                <td className="py-4 px-6">{candidate.position}</td>

                {/* Status with Dropdown */}
                <td className="py-4 px-6">
                  <select
                    value={candidate.status}
                    onChange={(e) =>
                      handleStatusUpdate(candidate._id, e.target.value)
                    }
                    className={`p-2 rounded-md ${getRowClass(
                      candidate.status
                    )}`}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="py-4 px-6">{candidate.experience}</td>
                <td className="py-4 px-6">
                  <a
                    href={`./files/${candidate.resume}`}
                    download={candidate.resume}
                    className="text-blue-500 hover:underline"
                  >
                    Download
                  </a>
                </td>
                <td
                  className="py-4 px-6"
                  onClick={() => handleDelete(candidate._id)}
                >
                  <button className="text-red-500 hover:text-red-700">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {candidates.length === 0 && (
          <p className="text-center py-6 text-gray-500">No candidates found</p>
        )}
      </div>
      {/* Modal */}
      <AddCandidateModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAddCandidate}
      />
    </div>
  );
};

export default CandidateList;
