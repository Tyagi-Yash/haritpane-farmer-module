import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { isProfileComplete } from "../../utils/profileValidator";

function ProfileGuard({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isProfileComplete()) {
      toast.error("Profile incomplete. Please update your profile to proceed.");

      navigate("/profile", {
        replace: true,
        state: { from: location.pathname },
      });
    }
  }, [navigate, location]);

  if (!isProfileComplete()) return null;

  return children;
}

export default ProfileGuard;
