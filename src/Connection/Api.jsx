import axios from "axios";

const axiosinstance = await axios.create({
    baseURL:"http://localhost:3000/api",
    withCredentials:true
})
export default axiosinstance