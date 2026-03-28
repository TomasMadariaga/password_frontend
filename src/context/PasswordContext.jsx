import { createContext, useContext } from "react";
import { createPassword, getPasswords, deletePassword } from "../api/password";

export const PasswordContext = createContext();

export const usePassword = () => {
  const context = useContext(PasswordContext);
  if (!context) {
    throw new Error("usePassword must be used within a PasswordProvider");
  }
  return context;
};

export const PasswordProvider = ({ children }) => {
  async function getPasswordsByUserId(id) {
    try {
      const data = await getPasswords(id);
      return data;
    } catch (error) {
      console.error("Error fetching passwords:", error);
      throw error;
    }
  }

  async function savePassword(password) {
    try {
      const data = await createPassword(password);
      return data;
    } catch (error) {
      console.error("Error saving password:", error);
      throw error;
    }
  }

  async function deletePasswordByUserId(id) {
    try {
      await deletePassword(id);
    } catch (error) {
      console.error("Error deleting password:", error);
      throw error;
    }
  }

  return (
    <PasswordContext.Provider 
      value={{ 
        savePassword, 
        getPasswordsByUserId, 
        deletePasswordByUserId 
      }}
    >
      {children}
    </PasswordContext.Provider>
  );
};