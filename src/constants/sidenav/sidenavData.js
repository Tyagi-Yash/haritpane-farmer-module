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
import tutorialIcon from "../../assets/images/tutorial.svg";

export const mainMenu = [
  { to: "/dashboard", icon: dashboard, label: "Dashboard", translateKey: "nav.dashboard" },
  { to: "/service-tracking", icon: notepad, label: "Progress", translateKey: "nav.progress" },
  { to: "/service-category", icon: userRectangle, label: "Service Category", translateKey: "nav.serviceCategory" },
  { to: "/chats/message-chat", icon: chat, label: "Chats", translateKey: "nav.chats" },
  { to: "/tutorials", icon: tutorialIcon, label: "Tutorials", translateKey: "nav.tutorials" },
];

export const accountMenu = [
  { to: "/notification", icon: notification, label: "Notification", translateKey: "nav.notification" },
  { to: "/language", icon: language, label: "Language", translateKey: "nav.language" },
  { to: "/profile", icon: profile, label: "Profile", translateKey: "nav.profile" },
  { to: "/my-farms", icon: myFarm, label: "My Farm", translateKey: "nav.myFarm" },
  { to: "/contact-us", icon: call, label: "Contact Us", translateKey: "nav.contactUs" },
  { to: "/raise-a-complaint", icon: complaint, label: "Raise a Complaint", translateKey: "nav.raiseComplaint" },
];
