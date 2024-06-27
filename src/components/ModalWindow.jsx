import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { usePassword } from "../context/PasswordContext";
import { toast } from "react-toastify";

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
    const userdata = { ...values, userId: id };
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
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 h-full w-full">
      <div className="relative flex top-36 mx-auto px-3 py-1 border w-72 shadow-lg rounded-md bg-slate-800">
        <div className="mt-3">
          <form onSubmit={onSubmit}>
            <div className="flex justify-center">
              <div className="flex-grow">
                <h3 className="text-lg leading-6 font-medium text-white text-center">
                  Password
                </h3>
              </div>
              <div className="flex-shrink-0">
                <button
                  onClick={toggle}
                  className="px-2 bg-red-600 rounded-md transition-all hover:bg-red-700"
                >
                  X
                </button>
              </div>
            </div>
            <div className="mt-2 items-center px-4 py-3">
              <label>Account</label>
              <input
                type="text"
                {...register("account", { required: true })}
                className="rounded-md bg-gray-500 text-gray-800 w-full py-1"
              />
              {errors.account && (
                <p className="bg-red-600 text-white rounded-md my-1 text-center">
                  Account is required
                </p>
              )}
              <label>Password</label>
              <input
                type="text"
                {...register("password", { required: true })}
                className="rounded-md bg-gray-500 text-gray-800 w-full py-1"
                readOnly={true}
                value={value}
              ></input>
            </div>
            <div className="items-center px-4 py-3">
              <button
                type="submit"
                className="w-full flex-1 bg-purple-600 text-white inline-flex items-center justify-center h-10 align-top text-lg text-center rounded-md cursor-pointer transition-all hover:bg-purple-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
