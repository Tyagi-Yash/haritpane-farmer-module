import { useState } from "react";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { toast } from "react-toastify";
import locationBlack from "../../assets/images/location-black.svg";

function LocationInput({ value, onChange, onSelectLocation, error, placeholder = "Job location*" }) {
  const [loading, setLoading] = useState(false);

  const handleSelect = async (value) => {
    try {
      setLoading(true);
      const results = await geocodeByAddress(value);
      const { lat, lng } = await getLatLng(results[0]);
      onSelectLocation({
        address: value,
        lat: lat.toString(),
        lng: lng.toString(),
      });
    } catch (error) {
      toast.error("Failed to fetch location coordinates");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="location-wrapper">
      <PlacesAutocomplete value={value} onChange={onChange} onSelect={handleSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading: suggestLoading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder,
                className: "form-control",
              })}
            />
            <div className="autocomplete-dropdown-container">
              {(suggestLoading || loading) && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                    })}
                    key={suggestion.placeId}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
            {error && <p className="error-text">{error}</p>}
          </div>
        )}
      </PlacesAutocomplete>
      <img src={locationBlack} alt="" className="location-icon" />
    </div>
  );
}

export default LocationInput;
