import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

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

  async function checkLogin() {
    const cookies = Cookies.get();

    if (!cookies.token) {
      setIsAuthenticated(false);
      setLoading(false);
      return setUser(null);
    }

    try {
      const { data } = await verifyTokenRequest(cookies._vercel_jwt);
      console.log(data)
      const { id, username, email } = data;
      if (!id || !username || !email) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      setIsAuthenticated(true);
      setUser({ id, username, email });
      setLoading(false);
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      setLoading(false);
    }
  }

  const signup = async (user) => {
    const res = await registerRequest(user);
    setUser(res.data);
    setIsAuthenticated(true);
  };

  const signin = async (user) => {
    const res = await loginRequest(user);
    setIsAuthenticated(true);
    setUser(res.data);
  };

  const logout = async () => {
    Cookies.remove("token", { domain: ".vercel.app" });
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    checkLogin();
  }, []);
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
        checkLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
