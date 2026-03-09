import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import TopbarModal from "../../../components/common components/TopbarModal";
import { editFarmerProfile } from "../../../reduxtoolkit/slices/account settings/profile";

function LanguagePage() {
  const { t, i18n } = useTranslation();
  const storedProfile = JSON.parse(localStorage.getItem("farmerProfile") || {});
  const [language, setLanguage] = useState(storedProfile.languageSelector || "");
  const [disable, setDisable] = useState(false);
  const [errors, setErrors] = useState("");
  const loader = useSelector((state) => state.langMgmtSlice?.loader) || false;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (language === "") {
      setErrors(t("languagePage.requiredError"));
      return;
    }

    if (language === (storedProfile.languageSelector || "")) {
      setErrors(t("languagePage.alreadySelectedError"));
      return;
    }
    setDisable(true);
    try {
      const res = await dispatch(editFarmerProfile({ languageSelector: language }));
      const status = res?.payload?.status;
      const message = res?.payload?.data?.message;

      if (status === 200) {
        const storedProfile = JSON.parse(localStorage.getItem("farmerProfile")) || {};
        storedProfile.languageSelector = language;
        localStorage.setItem("farmerProfile", JSON.stringify(storedProfile));

        const langMap = { "Hindi": "hi", "English": "en", "Marathi": "mr" };
        if (langMap[language]) {
          i18n.changeLanguage(langMap[language]);
        }

        navigate("/dashboard");
        toast.success(message || t("languagePage.successToast"));
      } else {
        toast.error(message || t("languagePage.failToast"));
      }
    } catch (error) {
      toast.error(t("languagePage.errorToast"));
    } finally {
      setDisable(false);
    }
  };

  const languages = [
    { value: "Hindi", label: "हिंदी", sub: "Hindi" },
    { value: "English", label: "अंग्रेज़ी", sub: "English" },
    { value: "Marathi", label: "मराठी", sub: "Marathi" },
  ];

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <TopbarModal titleBox={true} title={t("languagePage.title")} navigate="/dashboard" />
        <div className="dashboard">
          <div className="language-page option-wrapper mt-4">
            <div className="row">
              {languages.map((lang) => (
                <div className="col-md-6" key={lang.value}>
                  <div
                    className={`language-box ${language === lang.value ? "active" : ""}`}
                    onClick={() => {
                      setLanguage(lang.value);
                      setErrors("");
                    }}
                  >
                    <div className="lang-label fw-bold">{lang.label}</div>
                    <div className="lang-sub text-muted">{lang.sub}</div>
                    {language === lang.value && (
                      <div className="checkmark">
                        <i className="fas fa-check-circle" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {errors && <p style={{ color: "red", paddingLeft: "20px" }}>{errors}</p>}

            <div className="available-service-btn">
              <button className="LangButton" onClick={handleSubmit} disabled={disable}>
                {loader ? t("languagePage.saving") : t("languagePage.saveButton")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LanguagePage;
