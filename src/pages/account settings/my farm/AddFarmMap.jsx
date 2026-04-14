import { useState, useCallback, useMemo } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import TopbarModal from "../../../components/common components/TopbarModal";

const center = {
  lat: 20.5937,
  lng: 78.9629,
};

const libraries = ["places"];

function AddFarmMap() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const location = useLocation();
  const navigate = useNavigate();

  const editData = location.state?.farm;
  const restoredLocation = location.state?.locationDetails;

  const initialLat = restoredLocation?.lat || editData?.location?.coordinates?.[1] || 20.5937;
  const initialLng = restoredLocation?.lng || editData?.location?.coordinates?.[0] || 78.9629;

  const [markerPosition, setMarkerPosition] = useState(
    restoredLocation
      ? { lat: restoredLocation.lat, lng: restoredLocation.lng }
      : editData?.location?.coordinates
        ? { lat: initialLat, lng: initialLng }
        : null,
  );
  const [selectedAddress, setSelectedAddress] = useState(
    restoredLocation?.address || editData?.postalAddress || "",
  );
  const [selectedVillage, setSelectedVillage] = useState(
    restoredLocation?.village || editData?.village || "",
  );
  const [selectedPincode, setSelectedPincode] = useState(
    restoredLocation?.pincode || editData?.pincode || "",
  );
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: initialLat, lng: initialLng });

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
      gestureHandling: "cooperative",
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
          const result = results[0];
          setSelectedAddress(result.formatted_address);

          // Extract village and pincode from address_components
          const components = result.address_components || [];
          let village = "";
          let pincode = "";

          for (const comp of components) {
            const types = comp.types || [];
            if (
              !village &&
              (types.includes("sublocality_level_1") ||
                types.includes("locality") ||
                types.includes("administrative_area_level_3"))
            ) {
              village = comp.long_name;
            }
            if (!pincode && types.includes("postal_code")) {
              pincode = comp.long_name;
            }
          }

          setSelectedVillage(village);
          setSelectedPincode(pincode);
        } else {
          setSelectedAddress("Address not found");
          setSelectedVillage("");
          setSelectedPincode("");
        }
      });
    } catch (error) {
      setIsLoadingAddress(false);
      setSelectedAddress("Unable to fetch address");
      setSelectedVillage("");
      setSelectedPincode("");
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
        farm: editData,
        locationDetails: {
          lat: markerPosition.lat,
          lng: markerPosition.lng,
          address: selectedAddress,
          village: selectedVillage,
          pincode: selectedPincode,
        },
      },
    });
  };

  const handleReset = () => {
    setMarkerPosition(null);
    setSelectedAddress("");
    setSelectedVillage("");
    setSelectedPincode("");
  };

  return (
    <div className="WrapperArea afm-wrapper">
      <div className="WrapperBox">
        <TopbarModal titleBox title="My Farm" navigate="/my-farms" />

        <div className="dashboard px-3 pb-3">
          <div className="afm-container">
            <div className="afm-header">
              <h4>{editData ? "Edit Farm Location" : "Add Farm Location"}</h4>
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
                    center={mapCenter}
                    zoom={editData || restoredLocation ? 15 : 5}
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
