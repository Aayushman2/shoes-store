import React, { useEffect, useState } from 'react';
import ProductCard from '../components/product/ProductCard';
import { useProducts } from '../context/ProductContext';

export default function Shop() {
  const { products, loading } = useProducts();
  
  // Filter States
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Derive available filter options from data
  const categories = ['All', ...new Set(products.map(p => p.category))];
  const ageGroups = ['All', 'Men', 'Women', 'Kids', 'Unisex'];
  
  const priceRanges = [
    { label: 'All Prices', value: 'All' },
    { label: 'Under Rs. 100', value: '0-100' },
    { label: 'Rs. 100 - Rs. 150', value: '100-150' },
    { label: 'Over Rs. 150', value: '150-plus' }
  ];

  // Complex multi-filter logic
  const filteredProducts = products.filter(product => {
    // 1. Category Filter
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    
    // 2. Age Group Filter
    const matchesAgeGroup = selectedAgeGroup === 'All' || product.ageGroup === selectedAgeGroup;
    
    // 3. Price Filter
    let matchesPrice = true;
    if (priceRange !== 'All') {
      if (priceRange === '0-100') matchesPrice = product.price < 100;
      else if (priceRange === '100-150') matchesPrice = product.price >= 100 && product.price <= 150;
      else if (priceRange === '150-plus') matchesPrice = product.price > 150;
    }

    // Must match ALL active filters to be displayed
    return matchesCategory && matchesAgeGroup && matchesPrice;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 mb-8 mt-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Shoe Catalog</h1>
          
          <div className="flex items-center">
             <button
              type="button"
              className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
              onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            >
              <span className="sr-only">Filters</span>
              <svg className="w-5 h-5" aria-hidden="true" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        <section aria-labelledby="products-heading" className="pt-6 pb-24">
          <h2 id="products-heading" className="sr-only">Products</h2>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
            {/* Filters Sidebar */}
            <form className={`lg:block ${isMobileFiltersOpen ? 'block' : 'hidden'}`}>
              <h3 className="sr-only">Categories</h3>
              
              {/* Category Filter */}
              <div className="border-b border-gray-200 py-6">
                <h3 className="-my-3 flow-root">
                  <span className="font-medium text-gray-900">Category</span>
                </h3>
                <div className="pt-6">
                  <div className="space-y-4">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center">
                        <input
                          id={`filter-category-${category}`}
                          name="category"
                          value={category}
                          type="radio"
                          checked={selectedCategory === category}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor={`filter-category-${category}`} className="ml-3 text-sm text-gray-600">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Age Group Filter */}
              <div className="border-b border-gray-200 py-6">
                <h3 className="-my-3 flow-root">
                  <span className="font-medium text-gray-900">Demographic</span>
                </h3>
                <div className="pt-6">
                  <div className="space-y-4">
                    {ageGroups.map((group) => (
                      <div key={group} className="flex items-center">
                        <input
                          id={`filter-age-${group}`}
                          name="ageGroup"
                          value={group}
                          type="radio"
                          checked={selectedAgeGroup === group}
                          onChange={(e) => setSelectedAgeGroup(e.target.value)}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor={`filter-age-${group}`} className="ml-3 text-sm text-gray-600">
                          {group}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="border-b border-gray-200 py-6">
                <h3 className="-my-3 flow-root">
                  <span className="font-medium text-gray-900">Price</span>
                </h3>
                <div className="pt-6">
                  <div className="space-y-4">
                    {priceRanges.map((range) => (
                      <div key={range.value} className="flex items-center">
                        <input
                          id={`filter-price-${range.value}`}
                          name="priceRange"
                          value={range.value}
                          type="radio"
                          checked={priceRange === range.value}
                          onChange={(e) => setPriceRange(e.target.value)}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor={`filter-price-${range.value}`} className="ml-3 text-sm text-gray-600">
                          {range.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </form>

            {/* Product grid */}
            <div className="lg:col-span-3">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
              ) : (
                <div className="bg-white p-6 shadow-sm border border-gray-100 rounded-lg">
                  <p className="text-sm text-gray-500 mb-6 pb-4 border-b border-gray-100">
                      Showing {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-6">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                  
                  {filteredProducts.length === 0 && (
                    <div className="text-center py-20 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
                      <p className="mt-1 text-sm text-gray-500">Try adjusting your filters to find what you're looking for.</p>
                      <button
                        onClick={() => {
                          setSelectedCategory('All');
                          setSelectedAgeGroup('All');
                          setPriceRange('All');
                        }}
                        className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                      >
                        Clear All Filters
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
