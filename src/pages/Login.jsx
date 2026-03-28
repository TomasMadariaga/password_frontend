import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { usePageTitle } from "../hooks/usePageTitle";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const { signin, isAuthenticated} = useAuth();
  const [apiError, setApiError] = useState(null);

  const onSubmit = handleSubmit(async (values) => {
    setApiError(null);
    try {
      await signin(values);
      toast.success("Welcome back!", {
        position: "top-center",
        autoClose: 3000,
      });
      reset();
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Login failed";
      setApiError(errorMsg);
      toast.error(errorMsg, {
        position: "top-center",
        autoClose: 3000,
      });
    }
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  usePageTitle("Sign In");

  return (
    <div className="grow flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-sans text-3xl font-bold text-text-h mb-2">
            Welcome back
          </h1>
          <p className="font-sans text-text">
            Sign in to access your passwords
          </p>
        </div>

        <div className="bg-card/30 border border-border rounded-2xl p-6 shadow-xl backdrop-blur-sm">
          {apiError && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm text-center">
              {apiError}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block font-sans text-text text-sm mb-1">
                Email
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className={`w-full bg-card border ${
                  errors.email ? "border-red-500" : "border-border"
                } rounded-lg px-3 py-2 text-text placeholder:text-text/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all`}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block font-sans text-text text-sm mb-1">
                Password
              </label>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                className={`w-full bg-card border ${
                  errors.password ? "border-red-500" : "border-border"
                } rounded-lg px-3 py-2 text-text placeholder:text-text/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all`}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-accent text-white py-2 rounded-lg font-medium transition-all hover:bg-accent/80 focus:outline-none focus:ring-2 focus:ring-accent/50"
            >
              Sign in
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="font-sans text-text text-sm">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-accent hover:underline transition"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
