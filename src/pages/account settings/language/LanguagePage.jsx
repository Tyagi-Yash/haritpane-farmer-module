import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

import TopbarModal from "../../../components/common components/TopbarModal";
import { editFarmerProfile } from "../../../reduxtoolkit/slices/account settings/profile";

function LanguagePage() {
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
      setErrors("*Language is required. You must Select one language.");
      return;
    }

    if (language === (storedProfile.languageSelector || "")) {
      setErrors("*You have already selected this language.");
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
        navigate("/dashboard");
        toast.success(message || "Language Updated sucessfully");
      } else {
        toast.error(message || "Failed to update Language");
      }
    } catch (error) {
      toast.error("Something went wrong");
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
        <TopbarModal titleBox={false} />
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
                {loader ? "saving..." : "Save Language"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LanguagePage;
