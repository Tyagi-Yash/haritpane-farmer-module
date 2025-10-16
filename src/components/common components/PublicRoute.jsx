import { Outlet } from "react-router-dom";

const PublicRoute = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("farmerProfile");
  return <Outlet />;
};

export default PublicRoute;
