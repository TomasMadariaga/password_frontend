import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const { signup, isAuthenticated } = useAuth();

  const onSubmit = handleSubmit(async (values) => {
    try {
      await signup(values);
    } catch (error) {
      toast.error(`${error.response.data.message}`, {
        position: "top-center",
        pauseOnHover: false,
        autoClose: 3000,
        closeButton: false,
        className: "text-center",
      });
    }
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  useEffect(() => {
    document.title = "Create an account"
  }, [])

  return (
    <div className="flex-grow flex items-center justify-center my-8 py-10">
      <div className="xl:max-w-lg bg-slate-700 p-5 rounded-md border shadow-2xl">
        <h1 className="text-2xl font-bold text-white">Register</h1>
        <form className="p-5 flex flex-col gap-2" onSubmit={onSubmit}>
          <input
            className="bg-zinc-600 py-1 text-white rounded-md"
            type="text"
            {...register("username", { required: true })}
            placeholder="Username"
          />
          {errors.username && (
            <p className="text-red-500">Username is required</p>
          )}
          <input
            className="bg-zinc-600 py-1 text-white rounded-md"
            type="email"
            {...register("email", { required: true })}
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500">Email is required</p>}
          <input
            className="bg-zinc-600 py-1 text-white rounded-md"
            type="password"
            {...register("password", { required: true })}
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}
          <button
            className="bg-purple-700 text-white px-4 py-2 rounded-md my-2 transition-all hover:bg-purple-800"
            type="submit"
          >
            Register
          </button>
          <p className="flex gap-x-2 justify-between text-white">
            Already have an account?
            <Link
              className="text-sky-500 underline underline-offset-2 xl:no-underline xl:text-sky-500 transition-all hover:underline hover:underline-offset-4"
              to="/login"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
