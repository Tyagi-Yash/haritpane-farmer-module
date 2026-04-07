import { useState, useCallback, useMemo } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import TopbarModal from "../../../components/common components/TopbarModal";

const center = {
  lat: 20.5937,
  lng: 78.9629,
};

const libraries = ["places"];

function AddFarmMap() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCg61BL0ZrrrlwgGk9F-239jx_xXFsI76Y",
    libraries,
  });

  const [markerPosition, setMarkerPosition] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);

  const navigate = useNavigate();

  const mapContainerStyle = useMemo(
    () => ({
      width: "100%",
      height: "100%",
    }),
    [],
  );

  const mapOptions = useMemo(
    () => ({
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
      rotateControl: false,
      clickableIcons: false,
      zoomControl: true,
      gestureHandling: "greedy",
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

  const reverseGeocode = useCallback((lat, lng) => {
    try {
      setIsLoadingAddress(true);

      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        setIsLoadingAddress(false);

        if (status === "OK" && results?.[0]) {
          setSelectedAddress(results[0].formatted_address);
        } else {
          setSelectedAddress("Address not found");
        }
      });
    } catch (error) {
      setIsLoadingAddress(false);
      setSelectedAddress("Unable to fetch address");
    }
  }, []);

  const onMapClick = useCallback(
    (e) => {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();

      setMarkerPosition({ lat, lng });
      reverseGeocode(lat, lng);
    },
    [reverseGeocode],
  );

  const handleNext = () => {
    if (!markerPosition) {
      toast.error("Please select a location on the map first");
      return;
    }

    navigate("/my-farms/form", {
      state: {
        locationDetails: {
          lat: markerPosition.lat,
          lng: markerPosition.lng,
          address: selectedAddress,
        },
      },
    });
  };

  const handleReset = () => {
    setMarkerPosition(null);
    setSelectedAddress("");
  };

  return (
    <div className="WrapperArea afm-wrapper">
      <div className="WrapperBox">
        <TopbarModal titleBox title="My Farm" navigate="/my-farms" />

        <div className="dashboard px-3 pb-3">
          <div className="afm-container">
            <div className="afm-header">
              <h4>Add Farm Location</h4>
              <p>Choose the exact location of your farm on the map</p>
            </div>

            <div className="afm-card">
              <div className="afm-card-header">
                <div className="afm-title">Pick exact farm location</div>

                <button
                  onClick={handleReset}
                  disabled={!markerPosition}
                  className={`afm-clear-btn ${!markerPosition ? "disabled" : ""}`}
                >
                  Clear
                </button>
              </div>

              <div className="afm-map">
                {isLoaded ? (
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={5}
                    onClick={onMapClick}
                    options={mapOptions}
                  >
                    {markerPosition && <Marker position={markerPosition} />}
                  </GoogleMap>
                ) : (
                  <div className="afm-loading">Loading map...</div>
                )}

                {!markerPosition && isLoaded && (
                  <div className="afm-map-overlay">
                    Tap anywhere on the map to select your farm location
                  </div>
                )}
              </div>

              <div className="afm-bottom">
                <div className="afm-grid">
                  <div className="afm-location-card">
                    <div className="afm-label">Selected Location</div>

                    {markerPosition ? (
                      <>
                        <div className="afm-address">
                          {isLoadingAddress ? (
                            <span className="afm-loading-text">Fetching address...</span>
                          ) : (
                            selectedAddress
                          )}
                        </div>

                        <div className="afm-coords">
                          {markerPosition.lat.toFixed(5)}, {markerPosition.lng.toFixed(5)}
                        </div>
                      </>
                    ) : (
                      <div className="afm-empty">No location selected</div>
                    )}
                  </div>

                  <button
                    onClick={handleNext}
                    disabled={!markerPosition}
                    className={`afm-continue-btn ${!markerPosition ? "disabled" : ""}`}
                  >
                    Continue →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddFarmMap;
