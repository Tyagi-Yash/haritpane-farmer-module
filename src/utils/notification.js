// import { getToken } from "firebase/messaging";
// import { messaging } from "../firebase/firebase";

// export const requestNotificationPermission = async () => {
//   try {
//     if (!("Notification" in window)) return null;

//     const permission = await Notification.requestPermission();
//     if (permission !== "granted") return null;

//     if (!("serviceWorker" in navigator)) return null;

//     const registration = await navigator.serviceWorker.register(
//       "/Haritpane_Farmer/firebase-messaging-sw.js",
//       { scope: "/Haritpane_Farmer/" },
//     );
//     await navigator.serviceWorker.ready;
//     await registration.update();

//     const token = await getToken(messaging, {
//       vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
//       serviceWorkerRegistration: registration,
//     });

//     return token || null;
//   } catch (error) {
//     console.error("FCM token error:", error);
//     return null;
//   }
// };
