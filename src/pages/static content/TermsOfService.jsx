import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import "../../assets/css/StaticPage.css";
import { getStaticFarmerContent } from "../../reduxtoolkit/slices/static content/staticContent";

function TermsOfService() {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      try {
        const res = await dispatch(getStaticFarmerContent({ title: "Terms & Conditions" }));
        const { status, data } = res?.payload || {};
        if (status === 200) {
          setContent(data?.data[0] || {});
        } else {
          toast(data?.message || "Failed to load Content");
        }
      } catch (error) {
        toast("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, []);

  return (
    <div className="StaticPage">
      <main>
        <header>
          <h1>TERMS OF USE &amp; END USER LICENSE AGREEMENT</h1>
          <p>(For the Haritpane Agro® India)</p>
          <p>
            <small>
              Effective Date: 1st August 2025 |
              {content.updatedAt &&
                ` Last Updated: ${new Date(content.updatedAt).toLocaleDateString()}`}
            </small>
          </p>
        </header>

        {!loading && content.description && (
          <div className="description"> {content.description}</div>
        )}
      </main>
    </div>
  );
}

export default TermsOfService;
