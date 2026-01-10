import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideNav from "../components/common components/Sidenav";

function RootLayout() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <div>
      <SideNav />
      <Outlet />
    </div>
  );
}

export default RootLayout;
