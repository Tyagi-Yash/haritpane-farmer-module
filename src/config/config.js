import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://15.206.16.230:8085/api/v1/farmer",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
