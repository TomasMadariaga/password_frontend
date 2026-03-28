export const getStrength = (password, config) => {
    if (!password) return { text: "", color: "", width: "0%" };
    let score = 0;
    if (password.length >= 12) score++;
    if (password.length >= 8) score++;
    if (config.mayusculas) score++;
    if (config.numeros) score++;
    if (config.simbolos) score++;

    if (score <= 2) return { text: "Weak", color: "bg-red-500", width: "33%" };
    if (score <= 4)
      return { text: "Medium", color: "bg-yellow-500", width: "66%" };
    return { text: "Strong", color: "bg-green-500", width: "100%" };
  };