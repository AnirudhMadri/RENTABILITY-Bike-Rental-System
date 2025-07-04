import React, { useEffect, useRef, useState } from "react";

const MapWithLocation = () => {
  const mapRef = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const location = { lat: 19.234203776141882, lng: 72.99106752299544 };
  const address =
    "Lodha Amara, Casa Celeste, W-34, Kolshet Road, Thane(West), Mumbai, Maharashtra, India";
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (window.google && window.google.maps) {
        setIsMapLoaded(true);
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
      script.async = true;
      script.defer = true;
      script.onload = () => setIsMapLoaded(true);
      document.body.appendChild(script);
    };

    loadGoogleMapsScript();
  }, [apiKey]);

  useEffect(() => {
    if (!isMapLoaded || !window.google || !window.google.maps) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: location,
      zoom: 14,
    });

    new window.google.maps.Marker({
      position: location,
      map,
      title: "Selected Location",
    });
  }, [isMapLoaded]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address);
    alert("Address copied!");
  };

  return (
    <div style={{ width: "100%", maxWidth: "600px", margin: "auto" }}>
      <div
        style={{ marginBottom: "8px", display: "flex", alignItems: "center" }}
      >
        <span style={{ marginRight: "8px", fontWeight: "bold" }}>
          {address}
        </span>
        <button
          onClick={copyToClipboard}
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            padding: "5px 10px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Copy
        </button>
      </div>
      <div
        ref={mapRef}
        style={{ width: "100%", height: "400px", borderRadius: "8px" }}
      />
    </div>
  );
};

export default MapWithLocation;
