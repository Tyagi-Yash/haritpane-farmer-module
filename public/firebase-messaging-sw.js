// importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js");
// importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js");

// self.addEventListener("activate", (event) => {
//   event.waitUntil(self.clients.claim());
// });

// firebase.initializeApp({
//   apiKey: "AIzaSyC0PH88wVsOX2Rgp5gyUz1Lzd2gvh9Wm98",
//   authDomain: "haritpane-79cda.firebaseapp.com",
//   projectId: "haritpane-79cda",
//   messagingSenderId: "984571720285",
//   appId: "1:984571720285:web:0969015b657b976d3353b4",
// });

// const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   const data = payload?.data || payload?.notification?.data || {};
//   const title = data?.title || payload?.notification?.title || "New Notification";
//   const body = data?.body || payload?.notification?.body || "";

//   const notificationType = data?.NotificationType || data?.notificationType || "";
//   const roomId =
//     data?.roomId ||
//     data?.roomID ||
//     data?.room_id ||
//     "";

//   const url =
//     String(notificationType).toLowerCase() === "chat" && roomId
//       ? `/Haritpane_Farmer/chats?roomId=${encodeURIComponent(roomId)}`
//       : "/Haritpane_Farmer/";

//   self.registration.showNotification(title, {
//     body,
//     icon: "/Haritpane_Farmer/vite.svg",
//     data: { url },
//   });
// });

// self.addEventListener("notificationclick", (event) => {
//   event.notification.close();

//   const targetUrl = event.notification?.data?.url || "/Haritpane_Farmer/";
//   const absoluteTargetUrl = new URL(targetUrl, self.location.origin).toString();

//   event.waitUntil(
//     (async () => {
//       const allClients = await clients.matchAll({ type: "window", includeUncontrolled: true });

//       const preferredClient = allClients.find((c) =>
//         typeof c?.url === "string" ? c.url.includes("/Haritpane_Farmer/") : false,
//       );

//       const clientToUse = preferredClient || allClients[0];
//       if (clientToUse && "focus" in clientToUse) {
//         await clientToUse.focus();
//         if ("navigate" in clientToUse) return clientToUse.navigate(absoluteTargetUrl);
//         return;
//       }

//       return clients.openWindow(absoluteTargetUrl);
//     })(),
//   );
// });
