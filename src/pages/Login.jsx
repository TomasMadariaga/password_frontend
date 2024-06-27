import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const { signin, isAuthenticated } = useAuth();

  const onSubmit = handleSubmit(async (values) => {
    try {
      await signin(values);
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

  return (
    <div className="flex-grow flex items-center justify-center py-10 my-12">
      <div className="xl:max-w-lg bg-slate-700 px-5 py-4 rounded-md border shadow-2xl">
        <h1 className="text-2xl font-bold text-white">Sign In</h1>
        <form className="p-5 flex flex-col gap-2" onSubmit={onSubmit}>
          <input
            className="bg-zinc-600 py-1 text-white rounded-md"
            type="email"
            {...register("email", { required: true })}
            placeholder="Email"
          />
          {errors.email && <p className="text-purple-500">Email is required</p>}
          <input
            className="bg-zinc-600 py-1 text-white rounded-md"
            type="password"
            {...register("password", { required: true })}
            placeholder="Password"
          />
          {errors.password && <p className="text-purple-500">Password is required</p>}
          <button
            className="bg-purple-700 text-white py-2 rounded-md my-3 transition-all hover:bg-purple-800"
            type="submit"
          >
            Login
          </button>
          <p className="flex gap-x-2 justify-between text-white">
            Don't have an account?
            <Link
              className="text-sky-500 underline underline-offset-2 xl:no-underline xl:text-sky-500 transition-all hover:underline hover:underline-offset-4"
              to="/register"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
