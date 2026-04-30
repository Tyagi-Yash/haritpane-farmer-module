import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import TopbarModal from "../../components/common components/TopbarModal";
import { getAllTutorials } from "../../reduxtoolkit/slices/tutorials/tutorialSlice";
import TutorialCard from "../../components/tutorials/TutorialCard";
import VideoModal from "../../components/tutorials/VideoModal";

const Tutorials = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { tutorialsList = [], loader } = useSelector((state) => state.services.tutorialSlice);

  const [selectedTutorial, setSelectedTutorial] = useState(null);

  useEffect(() => {
    dispatch(getAllTutorials({tutorialFor: "Farmer"}));
  }, [dispatch]);

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <TopbarModal title={t("tutorials.title") || "Tutorials"} />

        <div className="tutorials-page">
          <div className="tutorials-hero">
            <div>
              <h4 className="heading">{t("tutorials.heading") || "Learn How to Use Haritpane"}</h4>
              <p className="tutorials-subtitle">
                {t("tutorials.subtitle") ||
                  "Watch short guides, product walkthroughs, and feature explainers in one place."}
              </p>
            </div>
          </div>

          {loader ? (
            <div className="loader-container">
              <div className="loader"></div>
            </div>
          ) : tutorialsList?.length > 0 ? (
            <div className="tutorials-grid">
              {tutorialsList.map((tutorial) => (
                <TutorialCard key={tutorial._id} tutorial={tutorial} onPlay={setSelectedTutorial} />
              ))}
            </div>
          ) : (
            <div className="no-tutorials">
              <h3>{t("tutorials.noDataTitle") || "No tutorials found"}</h3>
              <p>{t("tutorials.noDataSubtitle") || "Check back later for new content."}</p>
            </div>
          )}
        </div>
      </div>

      {selectedTutorial && (
        <VideoModal tutorial={selectedTutorial} onClose={() => setSelectedTutorial(null)} />
      )}
    </div>
  );
};

export default Tutorials;
