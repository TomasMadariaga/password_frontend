import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const signup = async (userData) => {
    try {
      const { data } = await registerRequest(userData);
      localStorage.setItem("token", data.token);
      setIsAuthenticated(true);
      setUser({ id: data.id, username: data.username, email: data.email });
      setErrors([]);
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Registration failed";
      setErrors(Array.isArray(errorMsg) ? errorMsg : [errorMsg]);
    }
  };

  const signin = async (userData) => {
    try {
      const { data } = await loginRequest(userData);
      localStorage.setItem("token", data.token);
      setIsAuthenticated(true);
      setUser({ id: data.id, username: data.username, email: data.email });
      setErrors([]);
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Login failed";
      setErrors(Array.isArray(errorMsg) ? errorMsg : [errorMsg]);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
    setErrors([]);
  };

  const checkLogin = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuthenticated(false);
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const { data } = await verifyTokenRequest(token);
      setUser({ id: data.id, username: data.username, email: data.email });
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => setErrors([]), 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        loading,
        logout,
        user,
        isAuthenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};