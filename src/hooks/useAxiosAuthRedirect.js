import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../config/config";

export default function useAxiosAuthRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/signup");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  return axios;
}
