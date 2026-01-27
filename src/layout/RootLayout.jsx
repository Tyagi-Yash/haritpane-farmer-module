import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideNav from "../components/common components/Sidenav";
import { connectSocket, disconnectSocket } from "../socket/socket";
// import { onMessage } from "firebase/messaging";
// import { messaging } from "../firebase/firebase";
// import { toast } from "react-toastify";

function RootLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  useEffect(() => {
    connectSocket();
    return () => disconnectSocket();
  }, []);

  // useEffect(() => {
  //   const unsubscribe = onMessage(messaging, (payload) => {
  //     console.log("Foreground message:", payload);

  //     toast.success(payload?.notification?.title || "New Notification");
  //   });

  //   return unsubscribe;
  // }, []);

  return (
    <div>
      <SideNav />
      <Outlet />
    </div>
  );
}

export default RootLayout;
