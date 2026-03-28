import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Pagination } from "../components/Pagination";
import { usePassword } from "../context/PasswordContext";
import { ButtonDelete } from "../components/Buttons";
import { toast } from "react-toastify";
import { FaKey, FaUserCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import { usePageTitle } from "../hooks/usePageTitle";

export const PasswordDashboard = () => {
  const [passwords, setPasswords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagina, setPagina] = useState(1);
  const [porPagina] = useState(5);
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const { getPasswordsByUserId, deletePasswordByUserId } = usePassword();
  const { user } = useAuth();

  const maximo = Math.max(1, Math.ceil(passwords.length / porPagina));

  const toggleVisibility = (id) => {
    setVisiblePasswords(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleDelete = async (id, account) => {
    const confirmed = window.confirm(`Delete password for "${account}"?`);
    if (confirmed) {
      try {
        await deletePasswordByUserId(id);
        setPasswords(passwords.filter((p) => p.id !== id));
        toast.success("Password deleted", {
          position: "top-center",
          autoClose: 2000,
        });
      } catch (error) {
        toast.error("Failed to delete password");
      }
    }
  };

  useEffect(() => {
    const fetchPasswords = async () => {
      if (!user?.id) return;
      setLoading(true);
      try {
        const { data } = await getPasswordsByUserId(user.id);
        setPasswords(data || []);
      } catch (error) {
        toast.error("Failed to load passwords");
      } finally {
        setLoading(false);
      }
    };
    fetchPasswords();
  }, [user?.id, getPasswordsByUserId]);

  usePageTitle("My passwords")

  if (loading) {
    return (
      <div className="grow flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-text">Loading your vault...</p>
        </div>
      </div>
    );
  }

  if (!passwords || passwords.length === 0) {
    return (
      <div className="grow flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 border border-accent/30 mb-4">
            <FaKey className="w-8 h-8 text-accent" />
          </div>
          <h2 className="font-sans text-text-h text-xl font-medium mb-2">
            No passwords yet
          </h2>
          <p className="font-sans text-text mb-6">
            Generate and save your first password from the generator
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white rounded-lg hover:opacity-90 transition"
          >
            Go to Generator →
          </a>
        </div>
      </div>
    );
  }

  const startIndex = (pagina - 1) * porPagina;
  const displayedPasswords = passwords.slice(startIndex, startIndex + porPagina);

  return (
    <div className="grow py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="font-sans text-3xl font-bold text-text-h mb-2">
            My Passwords
          </h1>
          <p className="font-sans text-text">
            Securely stored passwords for your accounts
          </p>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <span className="font-mono text-sm text-text/60">
            {passwords.length} password{passwords.length !== 1 ? "s" : ""} saved
          </span>
          <span className="font-mono text-xs text-text/40">
            page {pagina} of {maximo}
          </span>
        </div>

        <div className="space-y-3">
          {displayedPasswords.map((password) => (
            <div
              key={password.id}
              className="group border border-border rounded-lg p-4 bg-card/30 hover:border-accent/50 transition-all duration-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <FaUserCircle className="w-4 h-4 text-accent" />
                    <span className="font-mono text-sm text-accent">
                      [{password.account}]
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="font-mono text-text break-all bg-card/50 rounded-lg px-3 py-2 text-sm flex-1">
                      {visiblePasswords[password.id] 
                        ? password.password 
                        : '•'.repeat(Math.min(password.password.length, 20))}
                    </div>
                    <button
                      onClick={() => toggleVisibility(password.id)}
                      className="p-2 text-text/40 hover:text-accent transition rounded-lg hover:bg-accent-bg"
                      aria-label={visiblePasswords[password.id] ? "Hide password" : "Show password"}
                    >
                      {visiblePasswords[password.id] ? (
                        <FaEyeSlash className="w-4 h-4" />
                      ) : (
                        <FaEye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
                <ButtonDelete
                  id={password.id}
                  onClick={() => handleDelete(password.id, password.account)}
                />
              </div>
            </div>
          ))}
        </div>

        {maximo > 1 && (
          <div className="mt-8">
            <Pagination
              pagina={pagina}
              setPagina={setPagina}
              maximo={maximo}
            />
          </div>
        )}
      </div>
    </div>
  );
};