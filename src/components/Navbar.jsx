import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const { isAuthenticated, logout, user, checkLogin } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    checkLogin();
  }, [isAuthenticated]);

  return (
    <div>
      <nav className="flex flex-col xl:flex-row pb-5 text-lg">
        <div className="flex justify-between items-center w-full">
          <Link className="text-white font-bold" to="/">
            Password Generator
          </Link>
          <button
            onClick={toggleMenu}
            className="text-white xl:hidden focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>

        <ul
          className={`w-full flex flex-col gap-5 pt-5 text-end xl:py-0 xl:flex xl:flex-row xl:justify-end xl:px-6 xl:gap-8 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          {isAuthenticated ? (
            <>
              <li className="text-white font-bold select-none">{user.username}</li>
              <li className="text-white font-bold transition-all hover:text-gray-400">
                <Link to="/passwords">Passwords</Link>
              </li>
              <li className="text-white font-bold transition-all hover:text-gray-400">
                <Link to="/" onClick={() => logout()}>
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="text-white font-bold transition-all hover:text-gray-400">
                <Link to="/register">Sign Up</Link>
              </li>
              <li className="text-white font-bold transition-all hover:text-gray-400">
                <Link to="/login">Sign In</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};
