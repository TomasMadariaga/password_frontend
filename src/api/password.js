import axios from "./axios";

export const createPassword = (password) =>
  axios.post(`password/create/`, password);

export const getPasswords = (id) => axios.get(`password/user/passwords/${id}`);

export const deletePassword = (id) => axios.delete(`password/${id}`);
