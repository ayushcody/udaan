import { useState, useEffect } from 'react';
import { useProperty } from '../context/PropertyContext';
import UrbanForm from './UrbanForm';
import RuralForm from './RuralForm';
import { motion } from 'framer-motion';

const SearchForm = () => {
  const [searchType, setSearchType] = useState('property-id');
  const [propertyType, setPropertyType] = useState('urban');
  const [formData, setFormData] = useState({
    propertyId: '',
    propertyType: 'All Types',
    registrationDateFrom: '',
    registrationDateTo: '',
    district: '',
    city: '',
    pincode: '',
    village: '',
    tehsil: '',
    khasraNo: ''
  });
  
  const { searchProperties } = useProperty();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await searchProperties(formData);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="bg-primary p-8 rounded-large border border-accent shadow-xl">
        {/* Search Type Toggle */}
        <div className="flex justify-center mb-8">
          <motion.div 
            className="relative w-[442px] h-[54px] bg-lightGray rounded-[113.5px] border border-[#3B3333]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="absolute w-[186px] h-[42px] bg-secondary rounded-2xl"
              style={{ 
                left: propertyType === 'urban' ? '15px' : '241px',
                top: '6px'
              }}
              animate={{ 
                left: propertyType === 'urban' ? '15px' : '241px'
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
            <div className="absolute inset-0 flex items-center justify-between px-5">
              <button
                className={`w-[176px] h-[37px] rounded-[113.5px] border border-[#3B3333] flex items-center justify-center z-10 
                  ${propertyType === 'urban' ? 'text-black font-semibold' : 'text-gray-600'}`}
                onClick={() => setPropertyType('urban')}
              >
                Urban
              </button>
              <button
                className={`w-[176px] h-[37px] rounded-[113.5px] border border-[#3B3333] flex items-center justify-center z-10
                  ${propertyType === 'rural' ? 'text-black font-semibold' : 'text-gray-600'}`}
                onClick={() => setPropertyType('rural')}
              >
                Rural
              </button>
            </div>
          </motion.div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md">
          <div className="mb-4">
            <label className="block text-black mb-2">Select Search Type:</label>
            <select
              name="searchType"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="w-full bg-formBg p-2 rounded-xl border border-gray-400 shadow-custom"
            >
              <option value="property-id">Property ID</option>
              <option value="owner-name">Owner Name</option>
              <option value="address">Address</option>
            </select>
          </div>

          {searchType === 'property-id' && (
            <div className="mb-4">
              <label className="block text-black mb-2">Property ID:</label>
              <input
                type="text"
                name="propertyId"
                placeholder="Enter property ID"
                value={formData.propertyId}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-400 rounded-xl shadow-custom"
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-black mb-2">Property Type:</label>
            <select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleInputChange}
              className="w-full bg-formBg p-2 rounded-xl border border-gray-400 shadow-custom"
            >
              <option value="All Types">All Types</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Agricultural">Agricultural</option>
              <option value="Industrial">Industrial</option>
            </select>
          </div>

          <div className="border p-4 rounded-xl border-black mb-6">
            <div className="mb-4">
              <label className="block text-black mb-2">Registration Date From:</label>
              <div className="relative">
                <input
                  type="date"
                  name="registrationDateFrom"
                  value={formData.registrationDateFrom}
                  onChange={handleInputChange}
                  className="w-full bg-formBg p-2 rounded-xl border border-gray-400 shadow-custom"
                  placeholder="dd-mm-yyyy"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6C6A6A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </span>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-black mb-2">Registration Date To:</label>
              <div className="relative">
                <input
                  type="date"
                  name="registrationDateTo"
                  value={formData.registrationDateTo}
                  onChange={handleInputChange}
                  className="w-full bg-formBg p-2 rounded-xl border border-gray-400 shadow-custom"
                  placeholder="dd-mm-yyyy"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6C6A6A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </span>
              </div>
            </div>
          </div>

          {/* Dynamic Form Based on Property Type */}
          {propertyType === 'urban' ? (
            <UrbanForm formData={formData} handleInputChange={handleInputChange} />
          ) : (
            <RuralForm formData={formData} handleInputChange={handleInputChange} />
          )}

          <div className="mt-6 flex justify-center">
            <button 
              type="submit" 
              className="bg-secondary hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchForm;