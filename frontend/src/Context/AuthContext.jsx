import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       axios.get("/api/auth/user").then(({ data }) => setUser(data));
//     }
//   }, []);

  const login = async (email, password) => {
    const { data } = await axios.post("/api/auth/login", { email, password });
    localStorage.setItem("token", data.token);
    setUser(data.user);
  };

  const logout = () => {
    axios.post("/api/auth/logout");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
