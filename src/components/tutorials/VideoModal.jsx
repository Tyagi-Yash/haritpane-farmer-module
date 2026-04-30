import { useTranslation } from "react-i18next";

const VideoModal = ({ tutorial, onClose }) => {
  const { t } = useTranslation();

  const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /(?:youtube\.com\/.*v=|youtu\.be\/)([^#&?]{11})/;
    const match = url.match(regExp);
    return match && match[1].length === 11 ? match[1] : null;
  };

  const videoId = getYouTubeId(tutorial?.videoUrl);

  return (
    <div className="video-modal-backdrop" onClick={onClose}>
      <div className="video-modal" onClick={(e) => e.stopPropagation()}>
        <div className="video-modal-header">
          <div>
            <p className="video-modal-label">{t("tutorials.nowPlaying") || "Now playing"}</p>
            <h3>{tutorial?.title}</h3>
          </div>

          <button className="video-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="video-modal-body">
          {videoId ? (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              className="video-modal-iframe"
              allowFullScreen
              title={tutorial?.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          ) : (
            <button
              className="primary-btn"
              onClick={() => window.open(tutorial?.videoUrl, "_blank", "noopener,noreferrer")}
            >
              {t("tutorials.openVideo") || "Open Video"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
