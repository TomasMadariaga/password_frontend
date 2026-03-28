import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PasswordGenerator } from "./pages/PasswordGenerator";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { PasswordProvider } from "./context/PasswordContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PasswordDashboard } from "./pages/PasswordDashboard";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";

function App() {
  return (
    <AuthProvider>
      <PasswordProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen bg-bg text-text">
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover={false}
              theme="dark"
            />
            <Navbar />
            <main className="grow container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<PasswordGenerator />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/passwords" element={<PasswordDashboard />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </PasswordProvider>
    </AuthProvider>
  );
}

export default App;