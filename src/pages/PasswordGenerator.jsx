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
import { getStrength } from "../functions/getPasswordStrength";
import { usePasswordConfig } from "../functions/passwordConfig";
import { usePageTitle } from "../hooks/usePageTitle";

export const PasswordGenerator = () => {
  const { isAuthenticated } = useAuth();
  const {
    config,
    toggleSimbolos,
    toggleNumeros,
    toggleMayusculas,
    incrementarCaracter,
    restarCaracter,
  } = usePasswordConfig();

  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setPassword(generatePassword(config));
  }, [config]);

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
    setPassword(generatePassword(config));
  };

  usePageTitle()

  const strength = getStrength(password, config);

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="text-center mb-8">
        <h1 className="font-sans text-3xl sm:text-4xl font-bold text-text-h mb-2">
          Password Generator
        </h1>
        <p className="font-sans text-text max-w-md mx-auto">
          Generate strong, secure passwords instantly
        </p>
      </div>

      <div className="bg-card/30 border border-border rounded-2xl p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl">
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <label className="font-sans text-text font-medium text-center sm:text-left">
              Password length
            </label>
            <div className="flex sm:scale-100 scale-125 items-center justify-center sm:justify-end gap-3">
              <ButtonMinus restarCaracter={restarCaracter} />
              <span className="font-mono w-12 text-center text-text-h text-lg font-semibold">
                {config.nroCaracteres}
              </span>
              <ButtonPlus incrementarCaracter={incrementarCaracter} />
            </div>
          </div>

          <div className="space-y-4 bg-card/20 rounded-xl p-4">
            <div className="flex justify-between items-center">
              <label className="font-sans text-text">
                Include special characters?
              </label>
              <ButtonCheck
                toggle={toggleSimbolos}
                select={config.simbolos}
              />
            </div>
            <div className="flex justify-between items-center">
              <label className="font-sans text-text">Include numbers?</label>
              <ButtonCheck
                toggle={toggleNumeros}
                select={config.numeros}
              />
            </div>
            <div className="flex justify-between items-center">
              <label className="font-sans text-text">Include uppercase?</label>
              <ButtonCheck
                toggle={toggleMayusculas}
                select={config.mayusculas}
              />
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <div className="flex flex-col sm:flex-row gap-3">
              <ButtonGenerate />
              <Input type="text" value={password} readOnly />
            </div>
          </div>
        </form>

        {password && (
          <div className="mt-6 animate-in fade-in duration-300">
            <div className="flex justify-between items-center mb-2">
              <span className="font-sans text-text text-sm">
                Password strength
              </span>
              <span
                className={`font-mono text-xs font-medium px-2 py-0.5 rounded-full ${
                  strength.text === "Weak"
                    ? "bg-red-500/20 text-red-400"
                    : strength.text === "Medium"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-green-500/20 text-green-400"
                }`}
              >
                {strength.text}
              </span>
            </div>
            <div className="h-1.5 bg-border rounded-full overflow-hidden">
              <div
                className={`h-full ${strength.color} transition-all duration-500 ease-out rounded-full`}
                style={{ width: strength.width }}
              />
            </div>
            <div className="flex justify-between mt-1 text-text/40 text-xs">
              <span>Weak</span>
              <span>Medium</span>
              <span>Strong</span>
            </div>
          </div>
        )}

        <div className="mt-6">
          <ButtonSave onClick={openModal} />
        </div>
      </div>

      {isModalOpen && <Modal value={password} toggle={openModal} />}
    </div>
  );
};
