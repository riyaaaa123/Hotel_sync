"use client";
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
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const customMarkerIcon = new L.Icon({
  iconUrl: "/marker.svg",
  shadowUrl: "/marker-shadow.svg",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const LocationSelector = ({ email }) => {
  const router = useRouter();
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => {
          console.error("Geolocation error:", err);
          setError("Location access denied or unavailable.");
          toast.error(
            "Location access denied. Please enable location services or select a location manually."
          );
        },
        { enableHighAccuracy: true }
      );
    }
  }, []);

  function LocationMarker() {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        setError(null); // Clear any previous errors when user selects manually
      },
    });
    return position ? (
      <Marker position={position} icon={customMarkerIcon}>
        <Popup>Selected Location</Popup>
      </Marker>
    ) : null;
  }

  const saveLocation = async () => {
    if (!position) {
      toast.warning("Please select a location on the map");
      return;
    }
    if (!email) {
      toast.error("User email not found. Please try again.");
      return;
    }

    setIsSubmitting(true);

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
        toast.success("Location saved successfully!");
        setTimeout(() => router.push("/upload"), 1500); // Small delay to show success message
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error) {
      console.error("Error saving location:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to save location. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {error && (
        <div className="mb-4 p-3 bg-error-50 text-error-600 rounded-md">
          {error}
        </div>
      )}

      {position ? (
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "400px", width: "100%", borderRadius: "8px" }}
          className="border border-neutral-200"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocationMarker />
        </MapContainer>
      ) : (
        <div className="flex items-center justify-center h-64 bg-neutral-50 rounded-md">
          <p className="text-neutral-500">Fetching your location...</p>
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <Button
          onClick={saveLocation}
          loading={isSubmitting}
          disabled={!position || isSubmitting}
          className="min-w-[120px]"
        >
          Save & Continue
        </Button>
      </div>
    </div>
  );
};

// Reuse your existing Button component
const Button = ({ children, onClick, loading, disabled, className }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`text-sm flex h-10 cursor-pointer items-center justify-center gap-2 rounded-md border-none bg-brand-600 px-5 hover:bg-brand-500 active:bg-brand-600 disabled:cursor-default disabled:bg-neutral-200 hover:disabled:cursor-default hover:disabled:bg-neutral-200 active:disabled:cursor-default active:disabled:bg-neutral-200 text-white ${className}`}
  >
    {loading ? (
      <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
    ) : (
      children
    )}
  </button>
);

export default LocationSelector;
