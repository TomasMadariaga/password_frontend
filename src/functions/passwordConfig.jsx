import { useState } from "react";

export const usePasswordConfig = (initialConfig = {
  nroCaracteres: 7,
  simbolos: true,
  numeros: true,
  mayusculas: true,
}) => {
  const [config, setConfig] = useState(initialConfig);

  const toggleSimbolos = () => {
    setConfig((prev) => ({ ...prev, simbolos: !prev.simbolos }));
  };

  const toggleNumeros = () => {
    setConfig((prev) => ({ ...prev, numeros: !prev.numeros }));
  };

  const toggleMayusculas = () => {
    setConfig((prev) => ({ ...prev, mayusculas: !prev.mayusculas }));
  };

  const incrementarCaracter = () => {
    setConfig((prev) => ({ ...prev, nroCaracteres: prev.nroCaracteres + 1 }));
  };

  const restarCaracter = () => {
    if (config.nroCaracteres > 1) {
      setConfig((prev) => ({ ...prev, nroCaracteres: prev.nroCaracteres - 1 }));
    }
  };

  return {
    config,
    toggleSimbolos,
    toggleNumeros,
    toggleMayusculas,
    incrementarCaracter,
    restarCaracter,
  };
};