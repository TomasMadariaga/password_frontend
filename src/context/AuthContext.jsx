import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

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
    // const cookies = Cookies.get();
    const username = localStorage.getItem("username")

    if (!username) {
      setIsAuthenticated(false);
      setLoading(false);
      return setUser(null);
    }

    try {
      const username = localStorage.getItem("username")
      const email = localStorage.getItem("email")
      const id = localStorage.getItem("id")
      // const { data } = await verifyTokenRequest(cookies.token);

      // const { id, username, email } = data;
      if (!id || !username || !email) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      setUser({ id, username, email });
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      setLoading(false);
    }
  }

  const signup = async (user) => {
    const {data} = await registerRequest(user);
    localStorage.setItem("username", data.username)
    localStorage.setItem("email", data.email)
    localStorage.setItem("id", data.id)
    setUser(data.id, data.username, data.email);
    setIsAuthenticated(true);
  };

  const signin = async (user) => {
    const {data} = await loginRequest(user);
    localStorage.setItem("username", data.username)
    localStorage.setItem("email", data.email)
    localStorage.setItem("id", data.id)
    setIsAuthenticated(true);
    setUser(data.id, data.username, data.email);
  };

  const logout = async () => {
    localStorage.removeItem("id")
    localStorage.removeItem("email")
    localStorage.removeItem("username")
    // Cookies.remove("token", { domain: ".vercel.app" });
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
