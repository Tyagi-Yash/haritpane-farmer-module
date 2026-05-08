import { useTranslation } from "react-i18next";
import TopbarModal from "../../../components/common components/TopbarModal";
import call from "../../../assets/images/call.svg";
import chat from "../../../assets/images/chat.svg";
import gmail from "../../../assets/images/gmail.svg";

const contactOptions = [
  {
    id: "call-us",
    icon: call,
    titleKey: "contact.callUs",
    title: "Call Us",
    descKey: "contact.callUsDesc",
    desc: "Speak directly with our support team",
    actionKey: "contact.callUsAction",
    action: "1800-XXX-XXXX",
    href: "tel:1800XXXXXXX",
    colorClass: "contact-card--call",
  },
  {
    id: "chat-with-us",
    icon: chat,
    titleKey: "contact.chatWithUs",
    title: "Chat With Us",
    descKey: "contact.chatWithUsDesc",
    desc: "Get instant help from our support team",
    actionKey: "contact.chatWithUsAction",
    action: "Start Chat",
    href: null,
    colorClass: "contact-card--chat",
  },
  {
    id: "email-us",
    icon: gmail,
    titleKey: "contact.emailUs",
    title: "Email Us",
    descKey: "contact.emailUsDesc",
    desc: "Send us an email and we'll get back to you",
    actionKey: "contact.emailUsAction",
    action: "support@haritpane.com",
    href: "mailto:support@haritpane.com",
    colorClass: "contact-card--email",
  },
];

function ContactUs() {
  const { t } = useTranslation();

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <TopbarModal
          titleBox={true}
          title={t("contact.pageTitle") || "Contact Us"}
          navigate="/dashboard"
        />

        <div className="dashboard">
          <div className="contact-us-page">
            <div className="contact-cards-grid">
              {contactOptions.map((opt) => (
                <div key={opt.id} className={`contact-card ${opt.colorClass}`}>
                  <div className="contact-card__icon-wrap">
                    <img src={opt.icon} alt={opt.title} />
                  </div>
                  <h3 className="contact-card__title">{t(opt.titleKey) || opt.title}</h3>
                  <p className="contact-card__desc">{t(opt.descKey) || opt.desc}</p>
                  <div className="contact-card__action">
                    {opt.href ? (
                      <a id={opt.id} href={opt.href} className="contact-card__btn">
                        {t(opt.actionKey) || opt.action}
                      </a>
                    ) : (
                      <button id={opt.id} className="contact-card__btn" onClick={() => {}}>
                        {t(opt.actionKey) || opt.action}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
