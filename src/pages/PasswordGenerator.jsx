import { useState, useEffect } from "react";
import {
  ButtonCheck,
  ButtonGenerate,
  ButtonMinus,
  ButtonPlus,
  ButtonSave,
} from "../components/Buttons";
import { generatePassword } from "../functions/generatePassword";
import { Input } from "../components/Input";
import { Modal } from "../components/ModalWindow";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export const PasswordGenerator = () => {
  const { isAuthenticated } = useAuth();
  const [configuracion, setConfiguracion] = useState({
    nroCaracteres: 7,
    simbolos: true,
    numeros: true,
    mayusculas: true,
  });

  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setPassword(generatePassword(configuracion));
  }, [configuracion]);

  const toggleSimbolos = () => {
    setConfiguracion((config) => {
      const newConfig = { ...config };
      newConfig.simbolos = !newConfig.simbolos;
      return newConfig;
    });
  };

  const toggleNumeros = () => {
    setConfiguracion((config) => {
      const newConfig = { ...config };
      newConfig.numeros = !newConfig.numeros;
      return newConfig;
    });
  };

  const toggleMayusculas = () => {
    setConfiguracion((config) => {
      const newConfig = { ...config };
      newConfig.mayusculas = !newConfig.mayusculas;
      return newConfig;
    });
  };

  const incrementarCaracter = () => {
    setConfiguracion((config) => {
      const newConfig = { ...config };
      newConfig.nroCaracteres += 1;
      return newConfig;
    });
  };

  const restarCaracter = () => {
    if (configuracion.nroCaracteres > 1) {
      setConfiguracion((config) => {
        const newConfig = { ...config };
        newConfig.nroCaracteres -= 1;
        return newConfig;
      });
    }
  };

  const openModal = () => {
    if (!isAuthenticated) {
      return toast.info("Create an account to save the password", {
        position: "top-center",
        pauseOnHover: false,
        autoClose: 3000,
        closeButton: false,
        className: "text-center",
      });
    }
    setIsModalOpen(!isModalOpen);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setPassword(generatePassword(configuracion));
  };

  useEffect(() => {
    document.title = "Password Generator"
  }, [])

  return (
    <div className="pb-10 min-h-96 flex-grow">
      <div className="mb-12 text-center">
        <h1 className="w-full align-top">Password Generator</h1>
      </div>
      <div className="grid justify-center">
        <form onSubmit={onSubmit} className="grid justify-center">
          <div className="mb-10 grid grid-cols-2 gap-10">
            <label>Numero de caracteres</label>
            <div className="flex justify-between text-center">
              <ButtonMinus restarCaracter={restarCaracter} />
              <span className="flex-1 leading-10 bg-purple-900">
                {configuracion.nroCaracteres}
              </span>
              <ButtonPlus incrementarCaracter={incrementarCaracter} />
            </div>
          </div>
          <div className="mb-10 grid grid-cols-2 gap-10">
            <label>¿Incluir Simbolos?</label>
            <ButtonCheck
              toggle={toggleSimbolos}
              select={configuracion.simbolos}
            />
          </div>
          <div className="mb-10 grid grid-cols-2 gap-10">
            <label>¿Incluir Numeros?</label>
            <ButtonCheck
              toggle={toggleNumeros}
              select={configuracion.numeros}
            />
          </div>
          <div className="mb-10 grid grid-cols-2 gap-10">
            <label>¿Incluir Mayusculas?</label>
            <ButtonCheck
              toggle={toggleMayusculas}
              select={configuracion.mayusculas}
            />
          </div>
          <div className="mb-10 grid grid-cols-2 gap-10">
            <ButtonGenerate />
            <Input type="text" value={password} />
          </div>
        </form>
        <ButtonSave onClick={openModal} />
      </div>
      {isModalOpen && <Modal value={password} toggle={openModal} />}
    </div>
  );
};
