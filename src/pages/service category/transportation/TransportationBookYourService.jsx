import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import { useTransportationForm } from "../../../hooks/useTransportationForm";
import { createTransportationJobOrder } from "../../../reduxtoolkit/slices/service category/transportationService";
import TransportItemFields from "../../../components/service category/transportation/TransportItemFields";
import TransportItemSelect from "../../../components/service category/transportation/TransportItemSelect";
import LocationSection from "../../../components/service category/transportation/LocationSection";
import VehicleSection from "../../../components/service category/transportation/VehicleSection";
import DateTimeSection from "../../../components/service category/transportation/DateTimeSection";
import SuccessModal from "../../../components/service category/transportation/SuccessModal";
import TopbarModal from "../../../components/common components/TopbarModal";
import TransportationIcon from "../../../assets/images/Transportation-icon.png";
import { buildPayload } from "../../../utils/buildPayload";

function TransportationBookYourService() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { formState, setFormState, errors, handleChange, validateForm, setErrors } =
    useTransportationForm();

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await dispatch(createTransportationJobOrder(buildPayload(formState)));
      const { status, data } = res?.payload || {};

      if (status === 200) {
        toast.success(data?.message || t("transportation.bookingSuccess"));
        setShowSuccess(true);
      } else {
        toast.error(data?.message || t("transportation.bookingFailed"));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <TopbarModal
          titleBox={true}
          title={t("transportation.transportation")}
          secImage={TransportationIcon}
          navigate="/service-category"
        />
        <div className="dashboard">
          <form onSubmit={handleSubmit}>
            <div className="option-wrapper">
              <div className="form-section">
                <h5 className="book-heading">{t("common.bookYourService")}</h5>
                <div className="row g-3">
                  <TransportItemSelect
                    value={formState.transportItem}
                    error={errors.transportItem}
                    onChange={(v) => handleChange("transportItem", v)}
                  />

                  <TransportItemFields {...formState} errors={errors} onChange={handleChange} />

                  <LocationSection
                    formState={formState}
                    setFormState={setFormState}
                    errors={errors}
                    setErrors={setErrors}
                  />

                  <VehicleSection
                    value={formState.typeOfVehicle}
                    error={errors.typeOfVehicle}
                    onChange={(v) => handleChange("typeOfVehicle", v)}
                  />
                </div>
                <h5 className="book-heading">{t("common.bookServicesDateTime")}</h5>
                <div className="row g-3">
                  <DateTimeSection formState={formState} errors={errors} onChange={handleChange} />
                </div>
              </div>
            </div>
            <div className="available-service-btn">
              <button disabled={loading}>
                {loading ? t("common.generating") : t("common.generateRequest")}
              </button>
            </div>
          </form>
        </div>
        {showSuccess && <SuccessModal onClose={() => navigate("/dashboard")} />}
      </div>
    </div>
  );
}

export default TransportationBookYourService;
