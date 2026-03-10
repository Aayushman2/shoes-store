import React from 'react';

const stores = [
  { id: 1, name: "Shoe Galaxy", location: "Tinkune, Kathmandu, Nepal" },
  { id: 2, name: "Kick Palace", location: "Baneshwor, Kathmandu, Nepal" },
  { id: 3, name: "Sneaker Hub", location: "Chabel, Kathmandu, Nepal" },
  { id: 4, name: "Footwear Central", location: "Purano-Baneshwor, Kathmandu, Nepal" },
  { id: 5, name: "Sole Station", location: "Koteswor, Kathmandu, Nepal" },
  { id: 6, name: "Urban Kicks", location: "Kalanki, Kathmandu, Nepal" },
  { id: 7, name: "Step Up Shoes", location: "Balkhu, Kathmandu, Nepal" },
  { id: 8, name: "The Sneaker Spot", location: "Lokanthali, Bhaktapur, Nepal" },
  { id: 9, name: "Stride & Style", location: "Maitighar, Kathmandu, Nepal" },
  { id: 10, name: "Elite Footwear", location: "New Road, Kathmandu, Nepal" },
];

const PublicStore = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Multi-Store Showcase
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Explore our 10 top shoe stores
          </p>
        </div>

        {/* Stores Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {stores.map((store) => (
            <div
              key={store.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full border border-gray-100"
            >
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl shadow-inner">
                      {store.name.charAt(0)}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{store.name}</h3>
                  <div className="flex items-start text-gray-500">
                    <svg className="h-5 w-5 mr-1.5 flex-shrink-0 text-gray-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm leading-relaxed">{store.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PublicStore;