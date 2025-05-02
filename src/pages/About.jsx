import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-4xl font-bold text-indigo-700 mb-6">About UDAAN</h1>
        <p className="text-gray-700 mb-4">
          UDAAN is a comprehensive property search portal designed to simplify the process of finding and managing properties.
        </p>
        <p className="text-gray-700 mb-4">
          Our platform provides advanced search capabilities, including location-based search, property ID search, and detailed property information.
        </p>
        <h2 className="text-2xl font-semibold text-indigo-600 mt-8 mb-4">Our Mission</h2>
        <p className="text-gray-700">
          To make property search and management more accessible, efficient, and user-friendly for everyone.
        </p>
      </div>
    </div>
  );
}
