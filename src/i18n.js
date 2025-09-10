import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: "en",
    debug: true,
    resources: {
      en: {
        translation: {
          bookInstantlyTitle: "📅 Book Appointments Instantly",
          bookInstantlyDesc:
            "Find trusted doctors and schedule visits in seconds—no phone calls, no waiting.",
          accessRecordsTitle: "📁 Access Medical Records Anytime",
          accessRecordsDesc:
            "View prescriptions, test results, and visit history from anywhere, whenever you need them.",
          consultExpertsTitle: "💬 Consult Online with Experts",
          consultExpertsDesc:
            "Get quality medical advice through secure video consultations—ideal for follow-ups and remote care.",
          healthRemindersTitle: "⏰ Health Reminders & Notifications",
          healthRemindersDesc:
            "Stay on top of your medications, appointments, and health goals with timely alerts.",
          secureTitle: "🔒 Private & Secure",
        },
      },
      te: {
        translation: {
          bookInstantlyTitle: "📅 తక్షణమే అపాయింట్‌మెంట్లు బుక్ చేయండి",
          whyDownloadTitle: "ఎందుకు EasyHealth యాప్ డౌన్‌లోడ్ చేయాలి?",
          accessRecordsTitle: "📁 ఎప్పుడైనా మెడికల్ రికార్డ్స్ యాక్సెస్ చేయండి",
          accessRecordsDesc:
            "ప్రిస్క్రిప్షన్లు, పరీక్షా ఫలితాలు మరియు విజిట్ హిస్టరీని ఎక్కడి నుండైనా, మీకు అవసరమైనప్పుడు వీక్షించండి.",
          consultExpertsTitle: "💬 నిపుణులతో ఆన్‌లైన్‌లో సంప్రదించండి",
          consultExpertsDesc:
            "సురక్షిత వీడియో కన్సల్టేషన్ ద్వారా నాణ్యమైన వైద్య సలహాలు పొందండి—ఫాలోఅప్స్ మరియు రిమోట్ కేర్‌కి అనువైనది.",
          healthRemindersTitle: "⏰ ఆరోగ్య రిమైండర్లు & నోటిఫికేషన్లు",
          healthRemindersDesc:
            "మందులు, అపాయింట్‌మెంట్లు మరియు ఆరోగ్య లక్ష్యాలపై సకాలంలో అలర్ట్స్‌తో అప్రమత్తంగా ఉండండి.",
          secureTitle: "🔒 ప్రైవేట్ & సురక్షితంగా",
        },
      },
    },
    // interpolation: {
    //     escapeValue: false // React already escapes values
    // },
    detection: {
      order: ["localStorage", "navigator"], // Determines the language detection order
      caches: ["localStorage"], // Cache the detected language in localStorage
    },
  });

export default i18n;
