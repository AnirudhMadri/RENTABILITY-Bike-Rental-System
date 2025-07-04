// LocationPicker.jsx
import React, { useState, useRef } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";

const libraries = ["places"]; // needed for autocomplete
const mapContainerStyle = {
  width: "100%",
  height: "400px",
};
const center = { lat: 19.076, lng: 72.8777 }; // Mumbai default

export default function LocationPicker({ onLocationSelect }) {
  const [selected, setSelected] = useState(null);
  const [address, setAddress] = useState("");
  const autoRef = useRef(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const handlePlaceChanged = () => {
    const place = autoRef.current.getPlace();
    if (place.geometry) {
      const location = place.geometry.location;
      const lat = location.lat();
      const lng = location.lng();
      setSelected({ lat, lng });
      setAddress(place.formatted_address || place.name);
      onLocationSelect({
        lat,
        lng,
        address: place.formatted_address || place.name,
      });
    }
  };

  const handleMapClick = async (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setSelected({ lat, lng });

    // Reverse geocoding
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results[0]) {
        const formatted = results[0].formatted_address;
        setAddress(formatted);
        onLocationSelect({ lat, lng, address: formatted });
      }
    });
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <Autocomplete
        onLoad={(ref) => (autoRef.current = ref)}
        onPlaceChanged={handlePlaceChanged}
      >
        <input
          type="text"
          value={address}
          placeholder="Search address"
          className="w-full p-2 border border-gray-300 rounded"
          onChange={(e) => setAddress(e.target.value)}
        />
      </Autocomplete>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={selected || center}
        zoom={selected ? 16 : 10}
        onClick={handleMapClick}
      >
        {selected && <Marker position={selected} />}
      </GoogleMap>
    </div>
  );
}
