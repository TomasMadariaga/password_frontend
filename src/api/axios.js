import axios from "axios";

const instance = axios.create({
  // withCredentials: true,
  baseURL: "https://password-backend-6g1b.onrender.com/",
  // baseURL: "http://localhost:3000",
});

export default instance;
