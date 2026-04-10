import { Carousel } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getAllAdsForFarmer, trackAdClick } from "../../reduxtoolkit/slices/dashboard/carouselAds";
import { useDispatch } from "react-redux";
import CarouselAdsSkeleton from "../skeletons/CarouselAdsSkeleton";
import { toast } from "react-toastify";

const DashboardCarousel = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const loadAds = async () => {
    setLoading(true);
    try {
      const res = await dispatch(getAllAdsForFarmer({ deviceOptions: "website" }));

      if (getAllAdsForFarmer.fulfilled.match(res)) {
        const adsList = res.payload?.data?.data?.data || [];

        const filteredAds = adsList.filter(
          (ad) =>
            ad.status === "active" &&
            (ad.deviceOptions === "website" || ad.deviceOptions === "website_mobile"),
        );

        setAds(filteredAds);
      } else {
        toast(res.payload?.data?.message || "Failed to load Ads");
      }
    } catch (error) {
      toast("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAds();
  }, []);

  const getValidImage = (ad) => {
    if (Array.isArray(ad?.adsImage) && ad.adsImage.length > 0) {
      const img = ad.adsImage.find((i) => i && i.trim() !== "");
      return img || "/default-ad.png";
    }
    return "/default-ad.png";
  };

  const handleAdClick = async (ad) => {
    try {
      await dispatch(trackAdClick(ad._id));
      if (ad.addsLink) {
        window.open(ad.addsLink, "_blank");
      }
    } catch (err) {
      if (ad.addsLink) {
        window.open(ad.addsLink, "_blank");
      }
    }
  };

  return (
    <section className="dashboard-carousel-section">
      <h3 className="heading text-center mb-4">Featured for you</h3>

      {loading ? (
        <div className="custom-carousel">
          <CarouselAdsSkeleton />
        </div>
      ) : ads.length > 0 ? (
        <Carousel
          className="custom-carousel"
          indicators={false}
          controls={false}
          pause="hover"
          interval={3000}
          touch={true}
        >
          {ads.map((ad) => (
            <Carousel.Item key={ad._id}>
              <div className="carousel-card" onClick={() => handleAdClick(ad)}>
                <div className="carousel-image-wrapper">
                  <img src={getValidImage(ad)} alt={ad.addsTitle || "Advertisement"} />
                </div>

                {ad.addsTitle && <div className="carousel-title">{ad.addsTitle}</div>}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <p className="text-center text-muted">No ads available</p>
      )}
    </section>
  );
};

export default DashboardCarousel;
