import axios from "axios";

const api = axios.create({
  baseURL: "https://react-backend-ten.vercel.app/",
});

export default api;
