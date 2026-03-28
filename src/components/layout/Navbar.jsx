import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) setIsOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  return (
    <nav className="sticky top-0 z-50 bg-bg/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            className="text-text-h font-mono font-bold text-xl hover:text-accent transition-colors"
            to="/"
          >
            <span className="tracking-tight">pass</span>
            <span className="text-accent tracking-tight">Gen</span>
          </Link>

          <div className="hidden md:flex md:items-center md:space-x-8">
            {isAuthenticated ? (
              <>
                <span className="text-text font-mono text-sm px-3 py-1 rounded-md border border-border">
                  {user?.username}
                </span>
                <Link
                  to="/passwords"
                  className="text-text font-mono text-sm hover:text-accent transition-colors"
                >
                  [ vault ]
                </Link>
                <button
                  onClick={logout}
                  className="text-text font-mono text-sm hover:text-accent transition-colors"
                >
                  [ exit ]
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="text-text font-mono text-sm hover:text-accent transition-colors"
                >
                  [ sign-up ]
                </Link>
                <Link
                  to="/login"
                  className="text-text font-mono text-sm hover:text-accent transition-colors"
                >
                  [ sign-in ]
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden" ref={menuRef}>
            <button
              onClick={toggleMenu}
              className="text-text hover:text-accent transition-colors focus:outline-none p-2 rounded-md hover:bg-accent-bg"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50">
                {isAuthenticated ? (
                  <>
                    <div className="px-4 py-3 text-sm text-text border-b border-border font-mono">
                      {user?.username}
                    </div>
                    <Link
                      to="/passwords"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2 text-sm text-text hover:bg-accent-bg transition font-mono"
                    >
                      [ vault ]
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-text hover:bg-accent-bg transition font-mono"
                    >
                      [ exit ]
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/register"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2 text-sm text-text hover:bg-accent-bg transition font-mono"
                    >
                      [ sign-up ]
                    </Link>
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2 text-sm text-text hover:bg-accent-bg transition font-mono"
                    >
                      [ sign-in ]
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};