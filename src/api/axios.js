import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://password-backend-tomas.vercel.app",
  // baseURL: "http://localhost:3000",
});

export default instance;
