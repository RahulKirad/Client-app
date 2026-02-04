import { useEffect, useState } from 'react';
import { ShoppingBag, Download, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { apiClient, Product } from '../../lib/api';
import ProductCarousel from '../ui/ProductCarousel';

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

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Temporarily always use demo products
      setProducts(demoProducts);
      // const data = await apiClient.getFeaturedProducts();
      // // If API returns products, use them; otherwise use demo products
      // if (data && data.length > 0) {
      //   setProducts(data.slice(0, 8));
      // } else {
      //   setProducts(demoProducts);
      // }
    } catch (error) {
      console.error('Error fetching products:', error);
      // Use demo products as fallback
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

  return (
    <section id="products" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="heading-h2 mb-4 text-center" style={{color: 'var(--heading-color)'}}>
            Eco Totes for Every Market
          </h2>
          <p className="body-text-lg max-w-3xl mx-auto text-center" style={{color: 'var(--text-primary)'}}>
            Premium sustainable bags designed for global commerce
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-transparent" style={{borderColor: 'var(--beige-600)'}}></div>
          </div>
        ) : (
          <>
            {/* Product Carousel */}
            <div className="mb-12">
              <ProductCarousel 
                products={products} 
                onRequestSample={scrollToContact}
              />
            </div>

          </>
        )}

        {/* All Buttons in Single Line */}
        <div className="flex flex-wrap justify-center gap-4 mt-12">
          <Link
            to="/products#products-list"
            className="inline-flex items-center space-x-2 px-8 py-3 rounded-lg transition-all duration-300 soft-shadow group font-medium"
            style={{backgroundColor: 'var(--beige-300)', color: 'var(--text-color)', border: '2px solid var(--beige-600)', borderColor: 'var(--beige-600)'}}
            onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = 'var(--beige-400)'; e.currentTarget.style.borderColor = 'var(--beige-700)'}}
            onMouseLeave={(e) => {e.currentTarget.style.backgroundColor = 'var(--beige-300)'; e.currentTarget.style.borderColor = 'var(--beige-600)'}}
          >
            <span>View All Products</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="flex items-center justify-center space-x-2 px-8 py-3 rounded-lg transition-all duration-300 soft-shadow font-medium"
            style={{backgroundColor: 'var(--beige-200)', color: 'var(--text-color)', border: '2px solid var(--beige-500)', borderColor: 'var(--beige-500)'}}
            onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = 'var(--beige-500)'; e.currentTarget.style.borderColor = 'var(--beige-700)'}}
            onMouseLeave={(e) => {e.currentTarget.style.backgroundColor = 'var(--beige-200)'; e.currentTarget.style.borderColor = 'var(--beige-500)'}}
          >
            <Download size={20} />
            <span>Download Product Catalog</span>
          </button>
          <button
            onClick={scrollToContact}
            className="btn-cta-primary flex items-center justify-center space-x-2"
            style={{backgroundColor: 'var(--beige-700)', color: 'white', border: '2px solid var(--beige-800)', borderColor: 'var(--beige-800)'}}
            aria-label="Request Samples"
            onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = 'var(--beige-800)'; e.currentTarget.style.borderColor = 'var(--beige-900)'}}
            onMouseLeave={(e) => {e.currentTarget.style.backgroundColor = 'var(--beige-700)'; e.currentTarget.style.borderColor = 'var(--beige-800)'}}
          >
            <ShoppingBag size={20} />
            <span>Request Samples</span>
          </button>
        </div>
      </div>
    </section>
  );
}
