import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Package, ShoppingBag, Filter, Grid, List } from 'lucide-react';
import { apiClient, Product } from '../lib/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Demo products using local images
const demoProducts: Product[] = [
  {
    id: 'demo-1',
    name: 'Floral Elegance Tote Bag',
    category: 'Classic Cotton Totes',
    description: 'Beautiful cream canvas tote bag featuring vibrant floral designs. Perfect blend of style and sustainability for your everyday needs.',
    material: '100% Organic Cotton',
    print_type: 'Screen Print',
    packaging: 'Eco-Friendly Packaging',
    moq: '500 units',
    price: 12.99,
    image_url: '/images/products/product1.jpeg',
    gallery_images: ['/images/products/product1.jpeg'],
    specifications: {
      size: '15" x 16" x 6"',
      weight: '8 oz',
      handles: 'Double reinforced handles',
      capacity: '20L'
    },
    is_featured: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'demo-2',
    name: 'Bee Joy Tote Bag',
    category: 'Classic Cotton Totes',
    description: 'Light beige canvas tote with cheerful bee design. Spread positivity and joy with our beautifully crafted, eco-friendly tote bags.',
    material: '100% Organic Cotton',
    print_type: 'Digital Print',
    packaging: 'Eco-Friendly Packaging',
    moq: '500 units',
    price: 13.99,
    image_url: '/images/products/product2.jpeg',
    gallery_images: ['/images/products/product2.jpeg'],
    specifications: {
      size: '15" x 16" x 6"',
      weight: '8 oz',
      handles: 'Double reinforced handles',
      capacity: '20L'
    },
    is_featured: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'demo-3',
    name: 'Watercolor Floral Tote',
    category: 'Classic Cotton Totes',
    description: 'Stunning watercolor floral prints on premium canvas. Each tote is a work of art, combining functionality with beautiful aesthetics.',
    material: '100% Organic Cotton',
    print_type: 'Screen Print',
    packaging: 'Eco-Friendly Packaging',
    moq: '500 units',
    price: 14.99,
    image_url: '/images/products/product3.jpeg',
    gallery_images: ['/images/products/product3.jpeg'],
    specifications: {
      size: '15" x 16" x 6"',
      weight: '8 oz',
      handles: 'Double reinforced handles',
      capacity: '20L'
    },
    is_featured: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'demo-4',
    name: 'Sunflower Embroidered Tote',
    category: 'Classic Cotton Totes',
    description: 'Exquisite embroidered sunflower design on natural canvas. Handcrafted with attention to detail for a truly special tote bag.',
    material: '100% Organic Cotton',
    print_type: 'Embroidered',
    packaging: 'Eco-Friendly Packaging',
    moq: '500 units',
    price: 16.99,
    image_url: '/images/products/product4.jpeg',
    gallery_images: ['/images/products/product4.jpeg'],
    specifications: {
      size: '15" x 16" x 6"',
      weight: '8 oz',
      handles: 'Double reinforced handles',
      capacity: '20L'
    },
    is_featured: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'demo-5',
    name: 'Premium Canvas Tote Bag',
    category: 'Classic Cotton Totes',
    description: 'Elegant and versatile canvas tote bag perfect for everyday use. Durable construction with stylish design elements.',
    material: '100% Organic Cotton',
    print_type: 'Screen Print',
    packaging: 'Eco-Friendly Packaging',
    moq: '500 units',
    price: 15.99,
    image_url: '/images/products/product5.jpeg',
    gallery_images: ['/images/products/product5.jpeg'],
    specifications: {
      size: '15" x 16" x 6"',
      weight: '8 oz',
      handles: 'Double reinforced handles',
      capacity: '20L'
    },
    is_featured: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'demo-6',
    name: 'Designer Collection Tote',
    category: 'Classic Cotton Totes',
    description: 'Stylish designer tote bag with modern aesthetics. Perfect for fashion-forward individuals who value sustainability.',
    material: '100% Organic Cotton',
    print_type: 'Digital Print',
    packaging: 'Eco-Friendly Packaging',
    moq: '500 units',
    price: 17.99,
    image_url: '/images/products/product6.jpeg',
    gallery_images: ['/images/products/product6.jpeg'],
    specifications: {
      size: '15" x 16" x 6"',
      weight: '8 oz',
      handles: 'Double reinforced handles',
      capacity: '20L'
    },
    is_featured: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'demo-7',
    name: 'Artistic Print Tote Bag',
    category: 'Classic Cotton Totes',
    description: 'Unique artistic print design on premium canvas. A statement piece that combines art and functionality seamlessly.',
    material: '100% Organic Cotton',
    print_type: 'Screen Print',
    packaging: 'Eco-Friendly Packaging',
    moq: '500 units',
    price: 18.99,
    image_url: '/images/products/product7.jpeg',
    gallery_images: ['/images/products/product7.jpeg'],
    specifications: {
      size: '15" x 16" x 6"',
      weight: '8 oz',
      handles: 'Double reinforced handles',
      capacity: '20L'
    },
    is_featured: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(demoProducts);
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
    
    // Scroll to products section if hash is present in URL
    if (window.location.hash === '#products-list') {
      setTimeout(() => {
        const element = document.getElementById('products-list');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, []);

  const fetchProducts = async () => {
    try {
      // Temporarily always use demo products
      setProducts(demoProducts);
      // const data = await apiClient.getProducts();
      // // If API returns products, use them; otherwise keep demo products
      // if (data && data.length > 0) {
      //   setProducts(data);
      // }
    } catch (error) {
      console.error('Error fetching products:', error);
      // Keep demo products on error
      setProducts(demoProducts);
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
                className="flex items-center transition-colors mr-4 font-semibold text-sm bg-white px-4 py-2 rounded-full border-2 shadow-md hover:shadow-lg"
                style={{color: 'var(--beige-700)', borderColor: 'var(--beige-600)', borderColorHover: 'var(--beige-700)'}}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--beige-800)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--beige-700)'}
              >
                <ArrowLeft size={20} className="mr-2" />
                Back to Home
              </Link>
            </div>
            
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-[#2C3E50] mb-4" style={{fontFamily: 'var(--heading-font)'}}>
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
                <Filter size={20} style={{color: 'var(--beige-700)'}} />
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 text-sm ${
                        selectedCategory === category
                          ? 'text-white shadow-lg'
                          : 'bg-gray-100 text-[#2C3E50] hover:bg-gray-200'
                      }`}
                      style={selectedCategory === category ? {backgroundColor: 'var(--beige-600)'} : {}}
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
                  className="px-3 py-2 border border-gray-300 rounded-lg font-medium text-sm bg-white text-[#2C3E50] transition-all duration-200"
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--beige-600)';
                    e.currentTarget.style.boxShadow = '0 0 0 2px rgba(232, 212, 184, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#d1d5db';
                    e.currentTarget.style.boxShadow = '';
                  }}
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
                    className={`p-2 ${viewMode === 'grid' ? 'text-white' : 'bg-white text-[#2C3E50] hover:bg-gray-50'}`}
                    style={viewMode === 'grid' ? {backgroundColor: 'var(--beige-600)'} : {}}
                  >
                    <Grid size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 border-l border-gray-300 ${viewMode === 'list' ? 'text-white' : 'bg-white text-[#2C3E50] hover:bg-gray-50'}`}
                    style={viewMode === 'list' ? {backgroundColor: 'var(--beige-600)'} : {}}
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
        <section id="products-list" className="py-12 bg-gray-50 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-transparent" style={{borderColor: 'var(--beige-600)'}}></div>
              </div>
            ) : filteredAndSortedProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
                <Package className="mx-auto mb-4" size={64} style={{color: 'var(--beige-700)'}} />
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
        <section className="py-16" style={{backgroundColor: 'var(--beige-600)'}}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Place Your Order?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Contact us for samples, custom branding, or bulk orders
            </p>
            <Link
              to="/#contact"
              className="inline-flex items-center space-x-2 bg-white px-8 py-3 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
              style={{color: 'var(--beige-700)'}}
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

// Enhanced Product Card Component with Image Background Style
function ProductCard({ product }: { product: Product }) {
  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-[500px] flex flex-col group">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={product.image_url 
            ? (product.image_url.startsWith('http') || product.image_url.startsWith('/images') 
                ? product.image_url 
                : `http://localhost:3001${product.image_url}`)
            : '/images/placeholder-product.jpg'}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Dark Gradient Overlay - Lighter by default, darker on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent group-hover:from-black/85 group-hover:via-black/70 group-hover:to-transparent transition-all duration-500 pointer-events-none" 
        style={{
          background: 'linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 30%, rgba(0, 0, 0, 0.1) 50%, transparent 100%)'
        }}
      />
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.7) 40%, rgba(0, 0, 0, 0.3) 60%, transparent 100%)'
        }}
      />

      {/* Featured Badge */}
      {product.is_featured && (
        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg border border-white/30 z-20">
          ⭐ Featured
        </div>
      )}

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col h-full justify-end p-6">
        {/* Title - Always Visible */}
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 drop-shadow-lg">
          {product.name}
        </h3>

        {/* Description - Hidden by default, appears on hover */}
        <div className="overflow-hidden">
          <p className="text-white/90 text-sm sm:text-base mb-4 drop-shadow-md leading-relaxed transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 max-h-0 group-hover:max-h-32">
            {product.description}
          </p>
        </div>

        {/* Info Pills - Always Visible but more prominent on hover */}
        <div className="flex items-center gap-3 mb-5 opacity-70 group-hover:opacity-100 transition-opacity duration-500">
          {/* Rating Pill */}
          <div className="bg-gray-800/60 backdrop-blur-sm group-hover:bg-gray-800/80 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1.5 transition-all duration-500">
            <span className="font-bold">4.5</span>
            <div className="flex">
              {[...Array(4)].map((_, i) => (
                <span key={i} className="text-yellow-400">★</span>
              ))}
              <span className="text-yellow-400/50">★</span>
            </div>
          </div>

          {/* MOQ Pill */}
          <div className="bg-gray-800/60 backdrop-blur-sm group-hover:bg-gray-800/80 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-500">
            {product.moq}
          </div>
        </div>

        {/* Call to Action Button - Always Visible */}
        <button
          onClick={scrollToContact}
          className="w-full btn-cta-primary"
          style={{backgroundColor: 'rgba(255, 255, 255, 0.95)', color: '#78350F'}}
          onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.transform = 'translateY(-2px)';}}
          onMouseLeave={(e) => {e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.95)'; e.currentTarget.style.transform = 'translateY(0)';}}
          aria-label="Request Sample"
        >
          Request Sample
        </button>
      </div>
    </div>
  );
}