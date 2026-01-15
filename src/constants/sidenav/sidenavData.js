import profile from "../../assets/images/profile.svg";
import dashboard from "../../assets/images/dashboard.svg";
import userRectangle from "../../assets/images/user-rectangle.svg";
import notepad from "../../assets/images/notepad.svg";
import chat from "../../assets/images/chat.svg";
import notification from "../../assets/images/notification.svg";
import language from "../../assets/images/language.svg";
import myFarm from "../../assets/images/my-farm.svg";
import complaint from "../../assets/images/complaint.svg";
import call from "../../assets/images/call.svg";
import gmail from "../../assets/images/gmail.svg";

export const mainMenu = [
  { to: "/dashboard", icon: dashboard, label: "Dashboard" },
  { to: "/service-tracking", icon: notepad, label: "Progress" },
  { to: "/service-category", icon: userRectangle, label: "Service Category" },
  { to: "/chats", icon: chat, label: "Chats" },
];

export const accountMenu = [
  { to: "/notification", icon: notification, label: "Notification" },
  { to: "/language", icon: language, label: "Language" },
  { to: "/profile", icon: profile, label: "Profile" },
  { to: "/farm-home", icon: myFarm, label: "My Farm" },
];

export const helpMenu = [
  { icon: complaint, label: "Raise a Complaint" },
  { icon: gmail, label: "Email Us" },
  { icon: call, label: "Call Us" },
  { icon: chat, label: "Chat with Us" },
];
