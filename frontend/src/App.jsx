import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./router/DashBoard";
import AuthPage from "./pages/AuthPage";

import AttendencePage from "./router/AttendencePage";
import EmployeeDashboard from "./router/EmployeeDashboard";
import LeavePage from "./router/LeavePage";

const App = () => {
  const ProtectedRoute = ({ element }) => {
    const isAuthenticated = localStorage.getItem("token"); // Example check
    return isAuthenticated ? element : <Navigate to="/login" />;
  };
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route
          path="/attendance"
          element={<ProtectedRoute element={<AttendencePage />} />}
        />
        <Route
          path="/employees"
          element={<ProtectedRoute element={<EmployeeDashboard />} />}
        />
        <Route
          path="/leaves"
          element={<ProtectedRoute element={<LeavePage />} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
