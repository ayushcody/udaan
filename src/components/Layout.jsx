import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Layout({ children }) {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-800 text-white">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-8">UDAAN 2.0</h1>
          <nav className="space-y-2">
            <Link
              to="/"
              className={`flex items-center p-2 rounded-lg ${
                isActive('/') ? 'bg-indigo-700' : 'hover:bg-indigo-700'
              }`}
            >
              <span className="ml-3">Home</span>
            </Link>
            <Link
              to="/about"
              className={`flex items-center p-2 rounded-lg ${
                isActive('/about') ? 'bg-indigo-700' : 'hover:bg-indigo-700'
              }`}
            >
              <span className="ml-3">About</span>
            </Link>
            <Link
              to="/services"
              className={`flex items-center p-2 rounded-lg ${
                isActive('/services') ? 'bg-indigo-700' : 'hover:bg-indigo-700'
              }`}
            >
              <span className="ml-3">Services</span>
            </Link>
            <Link
              to="/contact"
              className={`flex items-center p-2 rounded-lg ${
                isActive('/contact') ? 'bg-indigo-700' : 'hover:bg-indigo-700'
              }`}
            >
              <span className="ml-3">Contact</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
} 