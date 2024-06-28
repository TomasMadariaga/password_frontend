import axios from "axios";

const instance = axios.create({
  baseURL: "https://password-backend-6g1b.onrender.com",
  withCredentials: true,
});

export default instance;
