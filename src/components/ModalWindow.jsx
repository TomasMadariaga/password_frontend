import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { usePassword } from "../context/PasswordContext";
import { toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";

export const Modal = ({ toggle, value }) => {
  const { user } = useAuth();
  const { savePassword } = usePassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (values) => {
    const { id } = user;
    const userdata = { ...values, userId: id};
    await savePassword(userdata);
    toast.success("Password saved!", {
      position: "top-center",
      pauseOnHover: false,
      autoClose: 3000,
      closeButton: false,
      className: "text-center",
    });
    toggle();
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-2xl shadow-xl w-full max-w-md mx-4 animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-4 border-b border-border">
          <h3 className="font-sans text-text-h font-semibold text-lg">
            Save Password
          </h3>
          <button
            onClick={toggle}
            className="text-text/50 hover:text-text transition-colors p-1 rounded-lg hover:bg-accent-bg"
            aria-label="Close"
          >
            <FaTimes className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-4 space-y-4">
          <div>
            <label className="block font-sans text-text text-sm mb-1">
              Account / Service
            </label>
            <input
              type="text"
              {...register("account", { required: "Account name is required" })}
              className="w-full bg-card border border-border rounded-lg px-3 py-2 text-text placeholder:text-text/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
              placeholder="e.g., Gmail, GitHub, etc."
              autoFocus
            />
            {errors.account && (
              <p className="text-red-400 text-xs mt-1">
                {errors.account.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-sans text-text text-sm mb-1">
              Password
            </label>
            <input
              type="text"
              {...register("password", { required: "Password is required" })}
              className="w-full bg-card border border-border rounded-lg px-3 py-2 text-text font-mono text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
              readOnly
              value={value}
            />
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={toggle}
              className="flex-1 bg-border text-text hover:bg-border/80 px-4 py-2 rounded-lg font-medium transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-accent text-white hover:bg-accent/80 px-4 py-2 rounded-lg font-medium transition-all"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};