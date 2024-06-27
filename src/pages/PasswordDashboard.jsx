import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Pagination } from "../components/Pagination";
import { usePassword } from "../context/PasswordContext";
import { ButtonDelete } from "../components/Buttons";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const PasswordDashboard = () => {
  const [passwords, setPasswords] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(5);
  const maximo = Math.ceil(passwords.length / porPagina);

  const { getPasswordsByUserId, deletePasswordByUserId } = usePassword();

  const { user } = useAuth();

  const handleDelete = async (id) => {
    confirmAlert({
      title: "Delete confirmation",
      message: "Are you sure you want to delete this password?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            await deletePasswordByUserId(id);
            toast.success("Password deleted", {
              position: "top-center",
              pauseOnHover: false,
              autoClose: 3000,
              closeButton: false,
              className: "text-center",
            });
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  useEffect(() => {
    const get = async () => {
      if (user.id) {
        const { data } = await getPasswordsByUserId(user.id);
        console.log(data);
        setPasswords(data);
      }
    };
    get();
  }, [passwords, user]);
  return (
    <div className="flex-grow flex justify-center items-center">
      <div className="flex flex-col items-center">
        {!passwords || passwords.length === 0 ? (
          <h2 className="">You don't have passwords</h2>
        ) : (
          <div className="flex flex-col gap-5 justify-center items-center w-fit">
            {passwords &&
              passwords
                .slice(
                  (pagina - 1) * porPagina,
                  (pagina - 1) * porPagina + porPagina
                )
                .map((password, i) => (
                  <div
                    className="flex gap-7 items-center rounded-md border-gray-700 p-2 border"
                    key={password.id}
                  >
                    <div className="flex flex-col">
                      <label>Account</label>
                      <input
                        className="py-1 rounded-md bg-purple-800"
                        type="text"
                        defaultValue={password.account}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label>Password</label>
                      <input
                        className="py-1 rounded-md bg-purple-800"
                        type="text"
                        defaultValue={password.password}
                      />
                    </div>
                    <ButtonDelete id={password.id} onClick={handleDelete} />
                  </div>
                ))}
            <Pagination pagina={pagina} setPagina={setPagina} maximo={maximo} />
          </div>
        )}
      </div>
    </div>
  );
};
