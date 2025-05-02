import React from 'react';

export default function Services() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-4xl font-bold text-indigo-700 mb-6">Our Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-indigo-50 p-6 rounded-xl">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Property Search</h2>
            <p className="text-gray-700">
              Advanced search capabilities to find properties based on various criteria including location, ID, and owner details.
            </p>
          </div>
          <div className="bg-indigo-50 p-6 rounded-xl">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Location-Based Search</h2>
            <p className="text-gray-700">
              Interactive map interface to search and select properties based on geographical location.
            </p>
          </div>
          <div className="bg-indigo-50 p-6 rounded-xl">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Property Management</h2>
            <p className="text-gray-700">
              Tools and features to manage property information, documents, and related data.
            </p>
          </div>
          <div className="bg-indigo-50 p-6 rounded-xl">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Data Analytics</h2>
            <p className="text-gray-700">
              Comprehensive property data analysis and reporting capabilities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 