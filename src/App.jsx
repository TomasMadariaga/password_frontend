import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PasswordGenerator } from "./pages/PasswordGenerator";
import { Navbar } from "./components/Navbar";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Footer } from "./components/Footer";
import { PasswordProvider } from "./context/PasswordContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PasswordDashboard } from "./pages/PasswordDashboard";

function App() {
  return (
    <AuthProvider>
      <PasswordProvider>
        <BrowserRouter>
          <div className="justify-center p-5 bg-slate-800 min-h-screen flex flex-col">
            <ToastContainer />
            <Navbar />
            <Routes>
              <Route path="/" element={<PasswordGenerator />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/passwords" element={<PasswordDashboard />} />
            </Routes>
            <Footer />
          </div>
        </BrowserRouter>
      </PasswordProvider>
    </AuthProvider>
  );
}

export default App;
