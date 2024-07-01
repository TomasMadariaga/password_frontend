import axios from "axios";

const instance = axios.create({
  baseURL: "https://password-backend-6g1b.onrender.com/",
  // baseURL: "http://localhost:3000",
  withCredentials: true,
});

export default instance;
