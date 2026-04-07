import { useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { isProfileComplete } from "../../utils/profileValidator";

function ProfileGuard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    if (!isProfileComplete()) {
      toast.error(t("common.profileIncompleteGuard"));

      navigate("/profile", {
        replace: true,
        state: { from: location.pathname },
      });
    }
  }, [navigate, location, t]);

  if (!isProfileComplete()) return null;

  return <Outlet />;
}

export default ProfileGuard;
