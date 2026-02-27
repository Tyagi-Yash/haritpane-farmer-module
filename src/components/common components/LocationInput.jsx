import { useRef, useState, useEffect } from "react";
import Modal from "react-modal";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import locationBlack from "../../assets/images/location-black.svg";

Modal.setAppElement("#root");

const libraries = ["places"];

export default function LocationInput({
  value = "",
  onChange = () => {},
  onSelectLocation = () => {},
  error = "",
  placeholder = "location*",
}) {
  const apiKey = "AIzaSyCg61BL0ZrrrlwgGk9F-239jx_xXFsI76Y";
  const { isLoaded, loadError } = useJsApiLoader({ googleMapsApiKey: apiKey, libraries });

  // input + suggestions
  const [internalInput, setInternalInput] = useState(value || "");
  const [suggestions, setSuggestions] = useState([]);
  const [suggestLoading, setSuggestLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  // modal/map state
  const [openMap, setOpenMap] = useState(false);
  const [marker, setMarker] = useState(null); // { lat: number, lng: number }
  const [selectedAddress, setSelectedAddress] = useState(null); // { address, lat, lng }

  const [mapCenter, setMapCenter] = useState({ lat: 20.5937, lng: 78.9629 });

  // refs
  const inputRef = useRef(null);
  const svcRef = useRef(null);
  const geocoderRef = useRef(null);
  const timerRef = useRef(null);
  const containerRef = useRef(null);
  const userTypingRef = useRef(false);
  const mapRef = useRef(null);

  function handleMapLoad(map) {
    mapRef.current = map;
    // map.setMapTypeId(window.google.maps.MapTypeId.HYBRID);
  }

  // flag to ignore the immediate prediction fetch triggered by programmatic input set
  const ignorePredictionsRef = useRef(false);
  // id to track query generation and ignore stale callbacks
  const queryIdRef = useRef(0);
  // flag to mark that internalInput was set by our selection logic (to ignore immediate parent prop echo)
  const lastSetBySelectionRef = useRef(false);

  // sync incoming prop -> internalInput, but ignore the immediate parent echo after selection
  useEffect(() => {
    if (lastSetBySelectionRef.current) {
      // ignore the immediate parent update that followed our programmatic set
      return;
    }
    setInternalInput(value || "");
  }, [value]);

  // init Google services
  useEffect(() => {
    if (isLoaded && !svcRef.current) {
      svcRef.current = new window.google.maps.places.AutocompleteService();
      geocoderRef.current = new window.google.maps.Geocoder();
    }
  }, [isLoaded]);

  // debounced predictions with query id to ignore stale callbacks
  useEffect(() => {
    if (!isLoaded) return;

    // ❌ DO NOT run if input was set programmatically
    if (!userTypingRef.current) return;

    // if we just set the input programmatically after selecting a prediction,
    // ignore the immediate re-run that would otherwise re-open suggestions
    if (ignorePredictionsRef.current) {
      setSuggestLoading(false);
      return;
    }

    if (!internalInput) {
      setSuggestions([]);
      setSuggestLoading(false);
      return;
    }

    setSuggestLoading(true);
    clearTimeout(timerRef.current);

    // create a new query id for this scheduled request
    queryIdRef.current += 1;
    const localId = queryIdRef.current;

    timerRef.current = setTimeout(() => {
      if (!svcRef.current) {
        setSuggestLoading(false);
        setSuggestions([]);
        return;
      }

      svcRef.current.getPlacePredictions(
        {
          input: internalInput,
          componentRestrictions: { country: "in" }, // 🇮🇳 India only
        },
        (predictions, status) => {
          userTypingRef.current = false;

          // ignore if a new query has been created since this one was scheduled
          if (queryIdRef.current !== localId) return;

          // also ignore if we set the ignore flag (selection happened)
          if (ignorePredictionsRef.current) {
            setSuggestLoading(false);
            return;
          }

          setSuggestLoading(false);
          if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
            setSuggestions(predictions);
            setActiveIndex(-1);
          } else {
            setSuggestions([]);
          }
        },
      );
    }, 250);

    return () => clearTimeout(timerRef.current);
  }, [internalInput, isLoaded]);

  // close suggestions when clicking outside
  useEffect(() => {
    function onDocClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) setSuggestions([]);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  useEffect(() => {
    if (marker) {
      setMapCenter({ lat: marker.lat, lng: marker.lng });
    }
  }, [marker]);

  // helpers: geocode placeId or lat/lng -> { address, lat, lng } strings
  function geocodeByPlaceId(placeId) {
    return new Promise((resolve) => {
      if (!geocoderRef.current) return resolve(null);
      geocoderRef.current.geocode({ placeId }, (results, status) => {
        if (status === "OK" && results && results[0]) {
          const r = results[0];
          const loc = r.geometry.location;
          resolve({ address: r.formatted_address, lat: String(loc.lat()), lng: String(loc.lng()) });
        } else resolve(null);
      });
    });
  }

  function geocodeByLatLng(lat, lng) {
    return new Promise((resolve) => {
      if (!geocoderRef.current) return resolve({ address: "", lat: String(lat), lng: String(lng) });
      geocoderRef.current.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === "OK" && results && results[0])
          resolve({ address: results[0].formatted_address, lat: String(lat), lng: String(lng) });
        else resolve({ address: "", lat: String(lat), lng: String(lng) });
      });
    });
  }

  // input handlers
  function handleInputChange(e) {
    const val = e.target.value;
    userTypingRef.current = true;

    // any user edit should re-enable predictions and clear selection flag
    ignorePredictionsRef.current = false;
    lastSetBySelectionRef.current = false;
    setInternalInput(val);
    onChange(val);
  }

  async function handleSelectPrediction(prediction) {
    // cancel pending scheduled query
    clearTimeout(timerRef.current);

    // bump query id so any in-flight callbacks are ignored
    queryIdRef.current += 1;

    // ignore prediction effect re-runs until we explicitly re-enable
    ignorePredictionsRef.current = true;

    setSuggestLoading(true);
    setSuggestions([]);
    setActiveIndex(-1);

    const res = await geocodeByPlaceId(prediction.place_id);
    setSuggestLoading(false);

    if (res) {
      setSelectedAddress(res);
      setMarker({ lat: Number(res.lat), lng: Number(res.lng) });

      // mark that we are programmatically setting the input to ignore parent echoes
      lastSetBySelectionRef.current = true;
      setInternalInput(res.address);
      onChange(res.address);
      onSelectLocation({ address: res.address, lat: res.lat, lng: res.lng });

      // ensure suggestions are closed and keyboard index reset
      setActiveIndex(-1);
      setSuggestions([]);

      // allow predictions again on the next user edit or after a short delay
      setTimeout(() => {
        ignorePredictionsRef.current = false;
        lastSetBySelectionRef.current = false;
      }, 50);
    } else {
      // fallback: set description
      lastSetBySelectionRef.current = true;
      setInternalInput(prediction.description);
      onChange(prediction.description);
      setTimeout(() => {
        ignorePredictionsRef.current = false;
        lastSetBySelectionRef.current = false;
      }, 50);
    }
  }

  function handleKeyDown(e) {
    if (!suggestions.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        e.preventDefault();
        handleSelectPrediction(suggestions[activeIndex]);
      }
    } else if (e.key === "Escape") {
      setSuggestions([]);
    }
  }

  // map handlers
  function openMapModal() {
    setOpenMap(true);
  }

  async function handleMapClick(e) {
    if (!e.latLng) return;
    const lat = e.latLng.lat(),
      lng = e.latLng.lng();
    const res = await geocodeByLatLng(lat, lng);
    setMarker({ lat: Number(res.lat), lng: Number(res.lng) });
    setSelectedAddress(res);

    // mark programmatic set
    lastSetBySelectionRef.current = true;
    setInternalInput(res.address);
    onChange(res.address);
    onSelectLocation({ address: res.address, lat: res.lat, lng: res.lng });

    setTimeout(() => {
      lastSetBySelectionRef.current = false;
    }, 50);
  }

  async function handleMarkerDragEnd(e) {
    if (!e.latLng) return;
    const lat = e.latLng.lat(),
      lng = e.latLng.lng();
    const res = await geocodeByLatLng(lat, lng);
    setMarker({ lat: Number(res.lat), lng: Number(res.lng) });
    setSelectedAddress(res);

    // mark programmatic set
    lastSetBySelectionRef.current = true;
    setInternalInput(res.address);
    onChange(res.address);
    onSelectLocation({ address: res.address, lat: res.lat, lng: res.lng });

    setTimeout(() => {
      lastSetBySelectionRef.current = false;
    }, 50);
  }

  function handleSaveFromMap() {
    setOpenMap(false);
  }

  // fallback
  if (loadError) {
    return (
      <div className="location-wrapper">
        <input
          className="form-control"
          value={internalInput}
          onChange={handleInputChange}
          placeholder={placeholder}
        />
        <img src={locationBlack} alt="" className="location-icon" />
        <p className="error-text">Error loading map services</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }} className="location-wrapper">
        <input
          ref={inputRef}
          className="form-control"
          value={internalInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          style={{ flex: 1 }}
          aria-autocomplete="list"
          aria-expanded={suggestions.length > 0}
        />

        <button
          type="button"
          onClick={openMapModal}
          title="Pick location on map"
          style={{
            height: 40,
            width: 40,
            borderRadius: 6,
            border: "1px solid #e5e7eb",
            background: "#fff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={locationBlack} alt="pin" style={{ width: 20, height: 20 }} />
        </button>
      </div>

      <div
        className="autocomplete-dropdown-container"
        style={{ position: "absolute", zIndex: 60, width: "100%", maxWidth: 600 }}
      >
        {suggestLoading && (
          <div style={{ padding: 8, background: "#fff", border: "1px solid #e5e7eb" }}>
            Loading...
          </div>
        )}
        {!suggestLoading &&
          suggestions.map((s, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div
                key={s.place_id || s.description}
                onMouseDown={(ev) => {
                  ev.preventDefault();
                  handleSelectPrediction(s);
                }}
                onMouseEnter={() => setActiveIndex(idx)}
                className={isActive ? "suggestion-item--active" : "suggestion-item"}
                style={{
                  padding: "8px 10px",
                  cursor: "pointer",
                  background: isActive ? "#f3f4f6" : "#fff",
                  border: "1px solid #e5e7eb",
                  borderTop: idx === 0 ? "1px solid #e5e7eb" : undefined,
                  borderRadius: "7px",
                }}
              >
                <span>{s.description}</span>
              </div>
            );
          })}
      </div>

      {error && (
        <p className="error-text" style={{ color: "#dc2626", marginTop: 6 }}>
          {error}
        </p>
      )}

      <Modal
        isOpen={openMap}
        onRequestClose={() => setOpenMap(false)}
        style={{
          content: {
            maxWidth: 900,
            maxHeight: 700,
            margin: "auto",
            padding: 0,
            overflow: "hidden",
            borderRadius: "18px",
            inset: "80px",
          },
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <div
            style={{
              padding: "10px 30px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #eee",
            }}
          >
            <strong>Select location</strong>
            <div>
              <button
                onClick={() => setOpenMap(false)}
                style={{
                  marginRight: "20px",
                  border: "1px solid #eeeeeeff",
                  borderRadius: "5px",
                  background: "white",
                  padding: "5px",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveFromMap}
                style={{
                  border: "1px solid #eeeeeeff",
                  borderRadius: "5px",
                  background: "white",
                  padding: "5px",
                }}
              >
                Save
              </button>
            </div>
          </div>

          <div style={{ flex: 1 }}>
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                defaultCenter={{ lat: 20.5937, lng: 78.9629 }}
                center={mapCenter}
                zoom={marker ? 14 : 5}
                onClick={handleMapClick}
                onLoad={handleMapLoad}
              >
                {marker && (
                  <Marker
                    position={{ lat: marker.lat, lng: marker.lng }}
                    draggable
                    onDragEnd={handleMarkerDragEnd}
                  />
                )}
              </GoogleMap>
            ) : (
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Loading map...
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}
