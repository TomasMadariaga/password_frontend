import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://password-backend-tomas-p2ij3etq9-tomas-projects-e1b665dc.vercel.app/",
  // baseURL: "http://localhost:3000",
});

export default instance;
