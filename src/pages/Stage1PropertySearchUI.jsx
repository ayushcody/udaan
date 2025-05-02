import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function Stage1PropertySearchUI() {
  const [searchMode, setSearchMode] = useState("normal");
  const [searchType, setSearchType] = useState("property-id");
  const [inputValue, setInputValue] = useState("");
  const [locationType, setLocationType] = useState("urban");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapLoading, setMapLoading] = useState(false);
  const [mapError, setMapError] = useState(null);
  const [propertyType, setPropertyType] = useState("");
  const [registrationDateFrom, setRegistrationDateFrom] = useState("");
  const [registrationDateTo, setRegistrationDateTo] = useState("");

  const getLabel = (type = searchType) => {
    switch (type) {
      case "registration":
        return "Registration Number";
      case "owner":
        return "Owner Details";
      case "address":
        return "Address";
      default:
        return "Property ID";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchMode === "normal") {
      console.log({
        searchMode,
        searchType,
        inputValue,
        locationType,
        propertyType,
        registrationDateFrom,
        registrationDateTo,
      });
    } else {
      console.log({
        searchMode,
        locationType,
        selectedLocation,
      });
    }
  };

  const handleClear = () => {
    setSearchType("property-id");
    setInputValue("");
    setLocationType("urban");
    setSelectedLocation(null);
    setPropertyType("");
    setRegistrationDateFrom("");
    setRegistrationDateTo("");
  };

  function LocationMarker() {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
      click(e) {
        setPosition(e.latlng);
        setSelectedLocation({
          lat: e.latlng.lat,
          lng: e.latlng.lng,
          address: "Selected Location"
        });
      },
    });

    return position === null ? null : (
      <Marker position={position}>
        <Popup>You clicked here</Popup>
      </Marker>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 font-sans">
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4">
          <span className="text-lg font-medium">Search Mode:</span>
          <div
            onClick={() => setSearchMode(searchMode === "normal" ? "location" : "normal")}
            className="relative inline-flex items-center w-64 h-14 bg-gray-100 rounded-full cursor-pointer border border-gray-300 shadow-inner transition-all duration-300 ease-in-out"
          >
            <div
              className={`absolute top-1 left-1 h-12 w-30 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 shadow-md transform transition-transform duration-300 ease-in-out ${
                searchMode === "location" ? "translate-x-[120px]" : "translate-x-0"
              }`}
            ></div>
            <div className="flex justify-between items-center w-full px-6 z-10 font-semibold text-base">
              <span className={searchMode === "normal" ? "text-white" : "text-gray-600"}>🔍 Normal Search</span>
              <span className={searchMode === "location" ? "text-white" : "text-gray-600"}>📍 Location-Based</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-8 mt-16">
        <div className="flex items-center space-x-4">
          <span className="text-lg font-medium">Location Type:</span>
          <div
            onClick={() => setLocationType(locationType === "urban" ? "rural" : "urban")}
            className="relative inline-flex items-center w-48 h-12 bg-gray-200 rounded-full cursor-pointer border border-gray-300 shadow-md"
          >
            <div
              className="absolute top-1 left-1 w-24 h-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-transform duration-300 ease-in-out shadow-md"
              style={{ transform: locationType === "urban" ? "translateX(92px)" : "translateX(0)" }}
            ></div>
            <div className="flex justify-between w-full px-4 text-base font-semibold text-gray-700 z-10">
              <span className={locationType === "rural" ? "text-white" : "text-gray-500"}>Rural</span>
              <span className={locationType === "urban" ? "text-white" : "text-gray-500"}>Urban</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
        <form onSubmit={handleSubmit}>
          {searchMode === "normal" ? (
            <>
              <div className="mb-10">
                <h2 className="text-xl font-semibold mb-4 text-indigo-700">Select Search Type</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {["property-id", "registration", "owner", "address"].map((type) => {
                    const isSelected = searchType === type;
                    const descriptionMap = {
                      "property-id": "Search by unique property ID (e.g., MH-PUN-KOT-12345)",
                      registration: "Search by registration number (e.g., REG-2025-001)",
                      owner: "Search by owner's name or ID (e.g., John Doe)",
                      address: "Search by property address (e.g., 123 Main St, Sydney)",
                    };
                    return (
                      <div
                        key={type}
                        onClick={() => setSearchType(type)}
                        className={`p-5 border rounded-xl shadow-md cursor-pointer transition-all duration-200 ${
                          isSelected ? "bg-indigo-50 border-indigo-500" : "bg-white hover:bg-gray-50"
                        }`}
                      >
                        <h3 className="text-lg font-medium">{getLabel(type)}</h3>
                        <p className="text-sm text-gray-500 mt-1">{descriptionMap[type]}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mb-10">
                <label className="block text-lg font-medium mb-2">{getLabel()}</label>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder={`Enter ${getLabel()}`}
                />
                {searchType === "property-id" && (
                  <p className="text-sm text-gray-500 mt-1">
                    Format: STATE-DISTRICT-BLOCK-NUMBER (e.g., MH-PUN-KOT-12345)
                  </p>
                )}
              </div>

              <div className="mb-10">
                <label className="block text-lg font-medium mb-2">Property Type</label>
                <input
                  type="text"
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="Enter property type (e.g., Residential, Commercial)"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div>
                  <label className="block text-lg font-medium mb-2">Registration Date From</label>
                  <input
                    type="date"
                    value={registrationDateFrom}
                    onChange={(e) => setRegistrationDateFrom(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium mb-2">Registration Date To</label>
                  <input
                    type="date"
                    value={registrationDateTo}
                    onChange={(e) => setRegistrationDateTo(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="mb-10">
                <h2 className="text-xl font-semibold mb-4 text-indigo-700">Select Location</h2>
                <div style={{ height: "400px", width: "100%", borderRadius: "1rem" }}>
                  <MapContainer
                    center={[20.5937, 78.9629]} // Center of India
                    zoom={5}
                    style={{ height: "100%", width: "100%", borderRadius: "1rem" }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker />
                  </MapContainer>
                </div>
                {selectedLocation && (
                  <div className="mt-4 text-center">
                    <h3 className="text-lg font-semibold">Selected Location</h3>
                    <p className="text-gray-600">{selectedLocation.address}</p>
                    <p className="text-gray-500">
                      Latitude: {selectedLocation.lat}, Longitude: {selectedLocation.lng}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}

          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              onClick={handleClear}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl shadow-md hover:bg-gray-300 transition-colors duration-200"
            >
              Clear
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 transition-colors duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 