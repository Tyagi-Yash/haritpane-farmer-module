import { Carousel } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getAllAdsForFarmer } from "../../reduxtoolkit/slices/dashboard/carouselAds";
import { useDispatch } from "react-redux";
import CarouselAdsSkeleton from "../skeletons/CarouselAdsSkeleton";
import { toast } from "react-toastify";

const DashboardCarousel = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const loadProducts = async () => {
    setLoading(true);

    try {
      const res = await dispatch(getAllAdsForFarmer());
      const { status, data } = res?.payload || {};
      if (status === 200) {
        setAds(data?.data || []);
      } else {
        toast(data?.message || "Failed to load Ads");
      }
    } catch (error) {
      toast("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <section >
      <div>
        <h3 className="heading text-center mb-5">Feature for you</h3>
      </div>
      {loading ? (
        <CarouselAdsSkeleton />
      ) : ads.length > 0 ? (
        <Carousel className="mb-4 ads-height" pause="hover" data-bs-theme="dark">
          {ads.map((ad) => (
            <Carousel.Item key={ad.ads_id}>
              <img className="d-block w-100" src={ad.adsImage[0]} alt="Advertisement" />
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
