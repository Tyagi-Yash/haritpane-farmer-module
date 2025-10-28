import { Navigate, Outlet } from "react-router-dom";
import useAxiosAuthRedirect from "../../hooks/useAxiosAuthRedirect";

const ProtectedRoute = () => {
  useAxiosAuthRedirect();

  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
