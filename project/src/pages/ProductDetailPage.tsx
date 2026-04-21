import { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Package, ChevronLeft, ChevronRight } from 'lucide-react';
import { apiClient, Product, resolveMediaUrl } from '../lib/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (!id) {
      setError('Invalid product');
      setLoading(false);
      return;
    }
    let cancelled = false;
    apiClient
      .getProduct(id)
      .then((data) => {
        if (!cancelled) {
          setProduct(data);
          setError(null);
          setSelectedImageIndex(0);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err?.message || 'Failed to load product');
          setProduct(null);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  const imageList = useMemo(() => {
    if (!product) return [];
    const gallery = Array.isArray(product.gallery_images) && product.gallery_images.length > 0
      ? product.gallery_images
      : product.image_url
        ? [product.image_url]
        : [];
    return gallery.length > 0 ? gallery : ['/images/placeholder-product.jpg'];
  }, [product]);

  const mainImageUrl = resolveMediaUrl(imageList[selectedImageIndex] || imageList[0] || '');

  const scrollToContact = () => {
    navigate('/#contact');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-20 min-h-[60vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-transparent" style={{ borderColor: 'var(--beige-600)' }} />
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-20 min-h-[60vh] flex flex-col items-center justify-center px-4">
          <Package className="mb-4 text-slate-400" size={64} />
          <h1 className="text-xl font-bold text-slate-800 mb-2">Product not found</h1>
          <p className="text-slate-600 mb-6">{error || 'This product may no longer be available.'}</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-white transition-colors"
            style={{ backgroundColor: 'var(--beige-600)' }}
          >
            <ArrowLeft size={18} />
            Back to products
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const specs = product.specifications && typeof product.specifications === 'object' ? product.specifications : {};
  const specEntries = Object.entries(specs).filter(([k, v]) => k !== 'pricing' && v != null && String(v).trim() !== '');

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold mb-8 transition-colors hover:opacity-80"
            style={{ color: 'var(--beige-700)' }}
          >
            <ArrowLeft size={18} />
            Back to products
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
            {/* Thumbnails on left (desktop) / below (mobile) + main image */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {imageList.length > 1 && (
                <div className="flex flex-row sm:flex-col gap-2 flex-shrink-0 sm:order-1 order-2 justify-center sm:justify-start">
                  {imageList.map((url, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedImageIndex(i)}
                      className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 bg-gray-100 flex-shrink-0 transition-all ${
                        selectedImageIndex === i
                          ? 'border-slate-800 ring-2 ring-slate-400 ring-offset-2'
                          : 'border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      <img
                        src={resolveMediaUrl(url)}
                        alt={`${product.name} view ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
              <div className="relative flex-1 min-w-0 rounded-2xl overflow-hidden shadow-lg bg-gray-100 aspect-square max-h-[500px] lg:max-h-none group sm:order-2 order-1">
                <img
                  src={mainImageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
                {imageList.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => setSelectedImageIndex((i) => (i <= 0 ? imageList.length - 1 : i - 1))}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center text-slate-700 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedImageIndex((i) => (i >= imageList.length - 1 ? 0 : i + 1))}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center text-slate-700 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Next image"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Details */}
            <div>
              <p className="text-sm font-medium uppercase tracking-wider mb-2" style={{ color: 'var(--beige-600)' }}>
                {product.category}
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'var(--heading-font)' }}>
                {product.name}
              </h1>

              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1.5 text-amber-600">
                  <span className="font-bold">4.5</span>
                  <span>★★★★★</span>
                </div>
                {product.moq && (
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-700">
                    MOQ: {product.moq}
                  </span>
                )}
              </div>

              {product.price > 0 && (
                <p className="text-2xl font-bold text-slate-900 mb-6">
                  From ₹{product.price.toLocaleString()}
                </p>
              )}

              {/* Full description */}
              <div className="prose prose-slate max-w-none mb-8">
                <h2 className="text-lg font-semibold text-slate-900 mb-2">Description</h2>
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {product.description}
                </p>
              </div>

              {/* Attributes */}
              <div className="space-y-3 mb-8">
                {product.material && (
                  <p className="text-slate-700">
                    <span className="font-semibold text-slate-900">Material:</span> {product.material}
                  </p>
                )}
                {product.print_type && (
                  <p className="text-slate-700">
                    <span className="font-semibold text-slate-900">Print type:</span> {product.print_type}
                  </p>
                )}
                {product.packaging && (
                  <p className="text-slate-700">
                    <span className="font-semibold text-slate-900">Packaging:</span> {product.packaging}
                  </p>
                )}
              </div>

              {/* Specifications */}
              {specEntries.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-slate-900 mb-3">Specifications</h2>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {specEntries.map(([key, value]) => (
                      <div key={key} className="flex justify-between gap-4 py-2 border-b border-slate-100">
                        <dt className="font-medium text-slate-700 capitalize">
                          {key.replace(/_/g, ' ')}
                        </dt>
                        <dd className="text-slate-600 text-right">
                          {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              <button
                onClick={scrollToContact}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-white shadow-lg hover:shadow-xl transition-all"
                style={{ backgroundColor: 'var(--beige-600)' }}
              >
                <ShoppingBag size={20} />
                Request Sample
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
