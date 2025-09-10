import React from "react";
import { Outlet } from "react-router-dom";
import SideNav from "../components/common components/SideNav";

function RootLayout() {
  return (
    <div>
      <SideNav />
      <Outlet />
    </div>
  );
}

export default RootLayout;
