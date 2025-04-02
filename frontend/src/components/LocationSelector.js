"use client"; // Ensure this runs only on the client-side in Next.js

import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import L from "leaflet";

const customMarkerIcon = new L.Icon({
  iconUrl: "/marker.svg", // Load from public folder
  shadowUrl: "/marker-shadow.svg",
  iconSize: [25, 41], // Default Leaflet icon size
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const LocationSelector = ({ email }) => {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);

  // Fetch user's current location
  useEffect(() => {
    if (typeof window !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => {
          console.error("Geolocation error:", err);
          setError("Location access denied or unavailable.");
        },
        { enableHighAccuracy: true }
      );
    }
  }, []);

  // Handle map click to update position
  function LocationMarker() {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
      },
    });
    return position ? (
      <Marker position={position} icon={customMarkerIcon}>
        <Popup>Selected Location</Popup>
      </Marker>
    ) : null;
  }

  // Save the selected location to Django backend
  const saveLocation = async () => {
    if (position && email) {
      try {
        const response = await axios.post(
          "http://localhost:8000/user/location/",
          {
            email: email,
            latitude: position[0],
            longitude: position[1],
          }
        );
        if (response.status === 200) {
          alert("Location saved successfully!");
        } else {
          throw new Error("Unexpected response from server");
        }
      } catch (error) {
        console.error("Error saving location:", error);
        alert("Failed to save location. Please try again.");
      }
    } else {
      alert("Please select a valid location.");
    }
  };

  return (
    <div>
      <h2>Select Your Location</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {position ? (
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationMarker />
        </MapContainer>
      ) : (
        <p>Fetching location...</p>
      )}
      <button
        onClick={saveLocation}
        style={{
          marginTop: "10px",
          padding: "10px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Save Location
      </button>
    </div>
  );
};

export default LocationSelector;
