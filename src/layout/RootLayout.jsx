import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideNav from "../components/common components/Sidenav";
import { connectSocket, disconnectSocket } from "../utils/socket";

function RootLayout() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) connectSocket();

    return () => disconnectSocket();
  }, [token]);

  return (
    <div>
      <SideNav />
      <Outlet />
    </div>
  );
}

export default RootLayout;
