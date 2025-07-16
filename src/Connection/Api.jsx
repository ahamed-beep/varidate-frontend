import axios from "axios";

const isProduction = window.location.hostname !== "localhost";

const axiosinstance = axios.create({
  baseURL: isProduction 
    ? "https://varidate-backend-production-ae3e.up.railway.app/api" 
    : "http://localhost:3000/api",
    
  withCredentials: true
});

export default axiosinstance;