import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Package, ShoppingBag, Filter, Grid, List } from 'lucide-react';
import { apiClient, Product } from '../lib/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<string>('name');

  const categories = ['All', 'Classic Cotton Totes', 'Foldable Travel Totes', 'Branded Corporate Totes', 'Seasonal Gift Editions'];
  const sortOptions = [
    { value: 'name', label: 'Name A-Z' },
    { value: 'name_desc', label: 'Name Z-A' },
    { value: 'price', label: 'Price Low-High' },
    { value: 'price_desc', label: 'Price High-Low' },
    { value: 'featured', label: 'Featured First' }
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await apiClient.getProducts();
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredAndSortedProducts = React.useMemo(() => {
    let filtered = selectedCategory === 'All'
      ? products
      : products.filter(p => p.category === selectedCategory);

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'name_desc':
          return b.name.localeCompare(a.name);
        case 'price':
          return a.price - b.price;
        case 'price_desc':
          return b.price - a.price;
        case 'featured':
          return b.is_featured ? 1 : -1;
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, selectedCategory, sortBy]); 
 return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center mb-6">
              <Link
                to="/"
                className="flex items-center text-[#6B8E23] hover:text-[#5A7A1F] transition-colors mr-4 font-semibold text-sm bg-white px-4 py-2 rounded-full border-2 border-[#6B8E23] shadow-md hover:shadow-lg"
              >
                <ArrowLeft size={20} className="mr-2" />
                Back to Home
              </Link>
            </div>
            
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-[#2C3E50] mb-4">
                Our Complete Product Range
              </h1>
              <p className="text-xl text-[#5A6C7D] max-w-3xl mx-auto">
                Discover our full collection of premium sustainable tote bags designed for global commerce
              </p>
            </div>
          </div>
        </section>

        {/* Filters and Controls */}
        <section className="py-8 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Category Filter */}
              <div className="flex items-center space-x-4">
                <Filter size={20} className="text-[#6B8E23]" />
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 text-sm ${
                        selectedCategory === category
                          ? 'bg-[#6B8E23] text-white shadow-lg'
                          : 'bg-gray-100 text-[#2C3E50] hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort and View Controls */}
              <div className="flex items-center space-x-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B8E23] focus:border-[#6B8E23] font-medium text-sm bg-white text-[#2C3E50]"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-[#6B8E23] text-white' : 'bg-white text-[#2C3E50] hover:bg-gray-50'}`}
                  >
                    <Grid size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 border-l border-gray-300 ${viewMode === 'list' ? 'bg-[#6B8E23] text-white' : 'bg-white text-[#2C3E50] hover:bg-gray-50'}`}
                  >
                    <List size={20} />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4 text-sm text-[#5A6C7D] font-medium">
              Showing {filteredAndSortedProducts.length} products
            </div>
          </div>
        </section>      
  {/* Products Section */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#6B8E23] border-t-transparent"></div>
              </div>
            ) : filteredAndSortedProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
                <Package className="mx-auto text-[#6B8E23] mb-4" size={64} />
                <h3 className="text-xl font-bold text-[#2C3E50] mb-2">No products found</h3>
                <p className="text-[#5A6C7D]">Try adjusting your filters to see more products.</p>
              </div>
            ) : (
              <div className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 auto-rows-fr'
                  : 'space-y-6'
              }>
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-[#6B8E23]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Place Your Order?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Contact us for samples, custom branding, or bulk orders
            </p>
            <Link
              to="/#contact"
              className="inline-flex items-center space-x-2 bg-white text-[#6B8E23] px-8 py-3 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
            >
              <ShoppingBag size={20} />
              <span>Get in Touch</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// Helper function to format specification values

function formatSpecificationValue(value: string): string {
  // Add spaces before units and format common patterns
  return value
    .replace(/(\d+)([a-zA-Z])/g, '$1 $2') // Add space between numbers and letters
    .replace(/inches/g, '"') // Replace inches with quote symbol
    .replace(/(\d+)\s*x\s*(\d+)/g, '$1" × $2') // Format dimensions
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between camelCase
    .trim();
}

// Currency data for display
const currencies = [
  { code: 'inr', symbol: '₹', name: 'Indian Rupee', flag: '🇮🇳' },
  { code: 'usd', symbol: '$', name: 'US Dollar', flag: '🇺🇸' },
  { code: 'eur', symbol: '€', name: 'Euro', flag: '🇪🇺' },
  { code: 'gbp', symbol: '£', name: 'British Pound', flag: '🇬🇧' },
  { code: 'aed', symbol: 'د.إ', name: 'UAE Dirham', flag: '🇦🇪' },
  { code: 'sar', symbol: '﷼', name: 'Saudi Riyal', flag: '🇸🇦' },
  { code: 'qar', symbol: 'ر.ق', name: 'Qatari Riyal', flag: '🇶🇦' },
  { code: 'kwd', symbol: 'د.ك', name: 'Kuwaiti Dinar', flag: '🇰🇼' }
];

// Enhanced Product Card Component with More Details
function ProductCard({ product }: { product: Product }) {
  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Get pricing data
  const pricing = product.specifications?.pricing;
  const activePrices = pricing ? Object.entries(pricing).filter(([_, data]: [string, any]) => data.enabled && data.amount > 0) : [];

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col border border-gray-200">
      <div className="relative h-64 bg-gray-100 overflow-hidden group">
        <img
          src={product.image_url ? `http://localhost:3001${product.image_url}` : '/images/placeholder-product.jpg'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.is_featured && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-[#A7C957] to-[#6B8E23] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
            ⭐ Featured
          </div>
        )}
        
        {/* Display first available price as main price badge */}
        {activePrices.length > 0 ? (
          <div className="absolute top-4 left-4 glass px-3 py-2 rounded-2xl text-sm font-bold shadow-lg border-2 border-[#A7C957]">
            {(() => {
              const [code, data] = activePrices[0];
              const curr = currencies.find(c => c.code === code);
              return curr ? (
                <div className="flex items-center space-x-1">
                  <span className="text-lg">{curr.flag}</span>
                  <span className="text-[#2C3E50]">{curr.symbol}{(data as any).amount}</span>
                </div>
              ) : null;
            })()}
          </div>
        ) : product.price > 0 && (
          <div className="absolute top-4 left-4 bg-white text-[#2C3E50] px-3 py-1 rounded-full text-sm font-bold shadow-md">
            ${product.price}
          </div>
        )}
        
        <div className="absolute bottom-4 left-4 bg-[#2C3E50] bg-opacity-90 text-white px-3 py-1 rounded-full text-xs font-medium">
          {product.category}
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-[#2C3E50] mb-2">{product.name}</h3>
          <p className="text-[#5A6C7D] text-sm mb-4 line-clamp-3">{product.description}</p>

          {/* Product Details Grid */}
          <div className="grid grid-cols-1 gap-3 mb-4">
            <div className="flex items-center text-sm text-[#5A6C7D]">
              <Package size={16} className="mr-2 text-[#6B8E23] flex-shrink-0" />
              <span><strong className="text-[#2C3E50]">Material:</strong> {product.material}</span>
            </div>
            
            <div className="flex items-center text-sm text-[#5A6C7D]">
              <ShoppingBag size={16} className="mr-2 text-[#6B8E23] flex-shrink-0" />
              <span><strong className="text-[#2C3E50]">Print Type:</strong> {product.print_type}</span>
            </div>

            {product.specifications?.dimensions && (
              <div className="flex items-center text-sm text-[#5A6C7D]">
                <svg className="w-4 h-4 mr-2 text-[#6B8E23] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                <span><strong className="text-[#2C3E50]">Size:</strong> {formatSpecificationValue(product.specifications.dimensions)}</span>
              </div>
            )}

            {product.specifications?.weight && (
              <div className="flex items-center text-sm text-[#5A6C7D]">
                <svg className="w-4 h-4 mr-2 text-[#6B8E23] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
                <span><strong className="text-[#2C3E50]">Weight:</strong> {formatSpecificationValue(product.specifications.weight)}</span>
              </div>
            )}

            <div className="flex items-center text-sm text-[#5A6C7D]">
              <svg className="w-4 h-4 mr-2 text-[#6B8E23] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span><strong className="text-[#2C3E50]">Packaging:</strong> {product.packaging}</span>
            </div>
          </div>


        </div>

        {/* Footer with MOQ and Button */}
        <div className="border-t border-gray-200 pt-4 mt-auto">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-[#5A6C7D]">
              <span className="font-semibold">MOQ:</span> {product.moq}
            </p>
            {product.price > 0 && (
              <p className="text-lg font-bold text-[#6B8E23]">
                ${product.price}
              </p>
            )}
          </div>
          <button
            onClick={scrollToContact}
            className="w-full bg-[#6B8E23] text-white py-2.5 rounded-full hover:bg-[#5A7A1F] transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
          >
            Request Sample
          </button>
        </div>
      </div>
    </div>
  );
}