import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://15.206.16.230:8085/api/v1/farmer",
  // withCredentials: true,
});

export default axiosInstance;
