import { useLocation } from "react-router-dom";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useMemo } from "react";

import TopbarModal from "../../../components/common components/TopbarModal";

const libraries = ["places"];

function FarmDetails() {
  const location = useLocation();
  const farm = location.state?.farm;

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const mapOptions = useMemo(
    () => ({
      disableDefaultUI: true,
      keyboardShortcuts: false,
      draggable: false,
      scrollwheel: false,
      disableDoubleClickZoom: true,
      clickableIcons: false,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }],
        },
      ],
    }),
    [],
  );

  const lat = farm?.location?.coordinates?.[1] ?? 20.5937;
  const lng = farm?.location?.coordinates?.[0] ?? 78.9629;

  if (!farm) {
    return (
      <div className="WrapperArea">
        <div className="WrapperBox">
          <TopbarModal titleBox={true} title="My Farm" navigate="/my-farms" />
          <div className="dashboard p-4 text-center">
            <h5>No farm data selected.</h5>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <TopbarModal titleBox={true} title="My Farm" navigate="/my-farms" />
          <div className="dashboard my-farms-details">
            <div>
              <div className="mb-4">
                <h4 className="main-heading mb-1">{farm.farmName}</h4>
                <div className="metadata text-muted" style={{ fontSize: "0.9rem" }}>
                  <span>
                    📍 {lat.toFixed(5)}, {lng.toFixed(5)}
                  </span>
                </div>
              </div>

              <div className="row g-4 mb-5">
                {/* Map Preview (Left Half) */}
                <div className="col-md-6">
                  <div
                    className="card shadow-sm border-0 h-100"
                    style={{ borderRadius: "12px", overflow: "hidden" }}
                  >
                    <div style={{ position: "relative", height: "100%", minHeight: "250px" }}>
                      {isLoaded ? (
                        <GoogleMap
                          mapContainerStyle={{ width: "100%", height: "100%" }}
                          center={{ lat, lng }}
                          zoom={15}
                          options={mapOptions}
                        >
                          <Marker position={{ lat, lng }} />
                        </GoogleMap>
                      ) : (
                        <div className="d-flex align-items-center justify-content-center h-100 bg-light">
                          Loading Map...
                        </div>
                      )}
                      {/* Transparent overlay to block interaction */}
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          zIndex: 10,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Text Details (Right Half) */}
                <div className="col-md-6">
                  <div
                    className="card shadow-sm border-0 h-100 p-4"
                    style={{ borderRadius: "12px" }}
                  >
                    <h5 className="mb-4" style={{ fontWeight: "600", fontSize: "1.2rem" }}>
                      Farm Information
                    </h5>
                    <div className="row g-4">
                      <div className="col-sm-6">
                        <small className="text-muted d-block mb-1">Tehsil</small>
                        <span style={{ fontWeight: "500", fontSize: "1.05rem" }}>
                          {farm.tehsil || "N/A"}
                        </span>
                      </div>
                      <div className="col-sm-6">
                        <small className="text-muted d-block mb-1">Village</small>
                        <span style={{ fontWeight: "500", fontSize: "1.05rem" }}>
                          {farm.village || "N/A"}
                        </span>
                      </div>
                      <div className="col-sm-6">
                        <small className="text-muted d-block mb-1">Pincode</small>
                        <span style={{ fontWeight: "500", fontSize: "1.05rem" }}>
                          {farm.pincode || "N/A"}
                        </span>
                      </div>
                      <div className="col-12 mt-4">
                        <small className="text-muted d-block mb-1">Postal Address</small>
                        <span style={{ fontWeight: "500", fontSize: "1.05rem" }}>
                          {farm.postalAddress || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Weather API Placeholders (Temporarily commented out) */}
              {/* 
              <h5 className="mb-3 mt-4" style={{ fontWeight: "600", fontSize: "1.1rem" }}>Forecast Predictions</h5>
              <div className="row g-4 mb-4">
                <div className="col-md-4">
                  <div className="card-box bg-light border-0 text-center py-4" style={{ borderRadius: "12px" }}>
                    <div className="card-title-text fw-bold text-muted">
                      Shows Next 6 Hour<br />Prediction Area
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="card-box bg-light border-0 text-center py-4" style={{ borderRadius: "12px" }}>
                    <div className="card-title-text fw-bold text-muted">Show Weather Graph Area</div>
                  </div>
                </div>
              </div>
              <p className="info-text text-center text-muted">
                <small>This section will be dynamic once Weather APIs are implemented.</small>
              </p>
              */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FarmDetails;
