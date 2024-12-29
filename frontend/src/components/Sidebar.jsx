import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";

import {
  FaSearch,
  FaUser,
  FaBuilding,
  FaUsers,
  FaCalendarCheck,
  FaFileAlt,
  FaEllipsisH,
  FaSignOutAlt,
} from "react-icons/fa";
import Logout from "./Logout";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
   const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  return (
    <div
      className={`bg-white h-screen shadow-lg transition-all duration-300 ${
        collapsed ? "w-20" : "w-72"
      }`}
    >
      <div
        className="p-4 flex items-center justify-between cursor-pointer"
        onClick={() => setCollapsed(!collapsed)}
      >
        {!collapsed && <img src={Logo} alt="logo hrms" />}
        {collapsed && (
          <button onClick={() => setCollapsed(!collapsed)} className="text-xl">
            ☰
          </button>
        )}
      </div>

      {/* Search Bar */}
      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute top-3 left-3 text-gray-500" />
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="mt-6">
        <ul className="">
          <li>
            <Link
              to=""
              className="flex items-center gap-4 p-4  rounded-lg"
            >
              {/* <FaUser size={20} /> */}
              {!collapsed && <span className="text-gray-500">Requirement</span>}
            </Link>
            <Link
              to="/"
              className="flex items-center gap-4 p-4 hover:bg-blue-100 rounded-lg"
            >
              
              {!collapsed && <span>Candidates</span>}
            </Link>
          </li>

          <li>
            <Link
              to=""
              className="flex items-center gap-4 p-4  rounded-lg"
            >
              {/* <FaBuilding size={20} /> */}
              {!collapsed && <span className="text-gray-500">Organization</span>}
            </Link>
          </li>

          <li>
            <Link
              to="/employees"
              className="flex items-center gap-4 p-4 hover:bg-blue-100 rounded-lg"
            >
              
              {!collapsed && <span>Employees</span>}
            </Link>
          </li>

          <li>
            <Link
              to="/attendance"
              className="flex items-center gap-4 p-4 hover:bg-blue-100 rounded-lg"
            >
              
              {!collapsed && <span>Attendance</span>}
            </Link>
          </li>

          <li>
            <Link
              to="/leaves"
              className="flex items-center gap-4 p-4 hover:bg-blue-100 rounded-lg"
            >
              
              {!collapsed && <span>Leaves</span>}
            </Link>
          </li>

          <li>
            <Link
              to=""
              className="flex items-center gap-4 p-4  rounded-lg"
            >
              {/* <FaEllipsisH size={20} /> */}
              {!collapsed && <span className="text-gray-500">Others</span>}
            </Link>
          </li>

          <li className="mt-1" onClick={() => setIsLogoutModalOpen(true)}>
            <Link
              
              className="flex items-center gap-4 p-4 text-red-500 hover:bg-red-100 rounded-lg"
            >
              
              {!collapsed && <span>Logout</span>}
            </Link>
          </li>
        </ul>
      </nav>
      {
        isLogoutModalOpen && (
          <Logout
            handleLogout={logout}
            setIsLogoutModalOpen={setIsLogoutModalOpen}
          />)
      }
    </div>
  );
};

export default Sidebar;
