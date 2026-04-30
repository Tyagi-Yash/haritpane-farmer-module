import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import defaultThumbnail from "../../assets/images/defaultThumbnail.jpg";

const TutorialCard = ({ tutorial, onPlay }) => {
  const { t } = useTranslation();

  const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /(?:youtube\.com\/.*v=|youtu\.be\/)([^#&?]{11})/;
    const match = url.match(regExp);
    return match && match[1].length === 11 ? match[1] : null;
  };

  const videoId = getYouTubeId(tutorial?.videoUrl);

  const thumbnailSrc = useMemo(() => {
    return (
      tutorial?.thumbnailUrl ||
      (videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : defaultThumbnail)
    );
  }, [tutorial?.thumbnailUrl, videoId]);

  const handlePlay = () => {
    if (tutorial?.videoUrl) {
      onPlay?.(tutorial);
    }
  };

  return (
    <article className="tutorial-card">
      <div className="tutorial-thumbnail-wrapper">
        <img
          src={thumbnailSrc}
          alt={tutorial?.title || "Tutorial thumbnail"}
          className="tutorial-thumbnail"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = defaultThumbnail;
          }}
        />

        <div className="tutorial-overlay">
          <button className="play-btn" onClick={handlePlay}>
            <span className="play-icon">▶</span>
          </button>
        </div>

        <div className="tutorial-badge">{t("tutorials.badge") || "Video"}</div>
      </div>

      <div className="tutorial-info">
        <h3 className="tutorial-title">{tutorial?.title || t("common.untitled") || "Untitled"}</h3>

        <div className="tutorial-footer">
          <button className="watch-link" onClick={handlePlay}>
            {t("tutorials.watchNow") || "Watch now"}
          </button>
        </div>
      </div>
    </article>
  );
};

export default TutorialCard;
