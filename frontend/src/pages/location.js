import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import LocationSelector with SSR disabled
const LocationSelector = dynamic(
  () => import("../components/LocationSelector"),
  { ssr: false }
);

const LocationPage = () => {
  const [email, setEmail] = useState(""); // Get this from authentication or local storage
  const [location, setLocation] = useState(null);

  const handleEmailChange = (e) => setEmail(e.target.value);

  return (
    <div>
      <h1>Update Location</h1>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={handleEmailChange}
      />
      {/* Pass email and location to the LocationSelector component */}
      <LocationSelector email={email} setLocation={setLocation} />
      <div>
        {location && (
          <p>
            Selected Location: Latitude: {location.lat}, Longitude:{" "}
            {location.lng}
          </p>
        )}
      </div>
    </div>
  );
};

export default LocationPage;
