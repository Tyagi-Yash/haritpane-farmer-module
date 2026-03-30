import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllAdsForFarmer, trackAdClick } from "../../reduxtoolkit/slices/dashboard/carouselAds";
import { toast } from "react-toastify";

const SideAds = () => {
  const [ads, setAds] = useState([]);
  const [visibleAds, setVisibleAds] = useState([]);
  const dispatch = useDispatch();

  const loadAds = async () => {
    try {
      const res = await dispatch(getAllAdsForFarmer({ isSideAds: true, deviceOptions: "website" }));

      if (getAllAdsForFarmer.fulfilled.match(res)) {
        const adsList = res.payload?.data?.data?.data || [];

        const filteredAds = adsList.filter(
          (ad) =>
            ad.status === "active" &&
            ad.paymentStatus === "completed" &&
            (ad.deviceOptions === "website" || ad.deviceOptions === "website_mobile") &&
            ad.isSideAds === true,
        );

        setAds(filteredAds);
      } else {
        toast(res.payload?.data?.message || "Failed to load Ads");
      }
    } catch (err) {
      toast("Something went wrong");
    }
  };

  useEffect(() => {
    loadAds();
  }, []);

  useEffect(() => {
    if (ads.length === 0) return;
    if (ads.length <= 3) {
      setVisibleAds(ads);
      return;
    }

    let index = 0;

    const updateVisibleAds = () => {
      const nextAds = [];
      for (let i = 0; i < 3; i++) {
        nextAds.push(ads[(index + i) % ads.length]);
      }
      setVisibleAds(nextAds);
      index = (index + 1) % ads.length;
    };

    updateVisibleAds();
    const interval = setInterval(updateVisibleAds, 3000);
    return () => clearInterval(interval);
  }, [ads]);

  const getValidImage = (ad) => {
    if (Array.isArray(ad?.adsImage) && ad.adsImage.length > 0) {
      const img = ad.adsImage.find((i) => i && i.trim() !== "");
      return img || "/default-ad.png";
    }
    return "/default-ad.png";
  };

  const handleClick = (ad) => {
    if (ad.addsLink) {
      window.open(ad.addsLink, "_blank");
    }
    dispatch(trackAdClick(ad._id));
  };

  if (ads.length === 0) return null;

  return (
    <div className="col-md-3">
      <div className="row">
        <div className="col-md-12 mb-3">
          <div className="recent-activity">
            {(visibleAds.length > 0 ? visibleAds : ads.slice(0, 4)).map((ad) => (
              <div
                key={ad._id}
                className="product-card"
                style={{ cursor: "pointer" }}
                onClick={() => handleClick(ad)}
              >
                <div className="image-part">
                  <img
                    src={getValidImage(ad)}
                    alt={ad.addsTitle}
                    onError={(e) => (e.target.src = "/default-ad.png")}
                  />
                </div>

                <div className="card-text-part">
                  <h6 className="normal-heading mb-1">{ad.addsTitle || "Advertisement"}</h6>
                  {/* <p className="normal-text m-0">{ad.addsTitle || "Advertisement"}</p>
                  <p className="grey-para m-0">{ad.addsTitle || "Advertisement"}</p> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideAds;
