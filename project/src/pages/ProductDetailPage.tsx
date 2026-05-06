import { useEffect, useState, useMemo, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Package, ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from 'lucide-react';
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
  const [showImageFrame, setShowImageFrame] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [zoomCursor, setZoomCursor] = useState<'default' | 'in' | 'out'>('default');
  const [showFullViewerDescription, setShowFullViewerDescription] = useState(false);
  const viewerImageWrapRef = useRef<HTMLDivElement | null>(null);
  const [viewerImageNatural, setViewerImageNatural] = useState({ w: 0, h: 0 });
  const [scan, setScan] = useState<{ active: boolean; x: number; y: number }>({ active: false, x: 0, y: 0 });

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

  const SCAN_LENS_SIZE_PX = 140;
  const SCAN_ZOOM = 2.5;

  useEffect(() => {
    if (!showImageFrame) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowImageFrame(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showImageFrame]);

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
              <div className="relative flex-1 min-w-0 rounded-2xl overflow-hidden shadow-lg bg-gray-100 aspect-square max-h-[600px] lg:max-h-none group sm:order-2 order-1">
                {/* Main image (hover scan) */}
                <div
                  ref={viewerImageWrapRef}
                  className="relative h-full w-full bg-gray-100 overflow-hidden cursor-pointer"
                  onMouseEnter={() => setScan((s) => ({ ...s, active: true }))}
                  onMouseLeave={() => setScan((s) => ({ ...s, active: false }))}
                  onMouseMove={(e) => {
                    const wrap = viewerImageWrapRef.current;
                    if (!wrap) return;
                    const rect = wrap.getBoundingClientRect();
                    const cx = e.clientX - rect.left;
                    const cy = e.clientY - rect.top;
                    const naturalW = viewerImageNatural.w;
                    const naturalH = viewerImageNatural.h;
                    if (!naturalW || !naturalH) return;

                    const containerW = rect.width;
                    const containerH = rect.height;
                    const imgRatio = naturalW / naturalH;
                    const containerRatio = containerW / containerH;

                    let dispW = containerW;
                    let dispH = containerH;
                    let dispLeft = 0;
                    let dispTop = 0;
                    if (imgRatio > containerRatio) {
                      dispW = containerW;
                      dispH = containerW / imgRatio;
                      dispTop = (containerH - dispH) / 2;
                    } else {
                      dispH = containerH;
                      dispW = containerH * imgRatio;
                      dispLeft = (containerW - dispW) / 2;
                    }

                    const xInImg = Math.min(Math.max(cx - dispLeft, 0), dispW);
                    const yInImg = Math.min(Math.max(cy - dispTop, 0), dispH);
                    setScan({ active: true, x: xInImg, y: yInImg });
                  }}
                  onClick={() => {
                    setZoom(1);
                    setZoomCursor('default');
                    setShowFullViewerDescription(false);
                    setShowImageFrame(true);
                  }}
                  title="Click to open image viewer"
                >
                  <img
                    src={mainImageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover transition-opacity duration-300"
                    draggable={false}
                    onLoad={(e) => {
                      const img = e.currentTarget;
                      setViewerImageNatural({ w: img.naturalWidth || 0, h: img.naturalHeight || 0 });
                    }}
                  />
                  {/* Lens */}
                  {scan.active && viewerImageNatural.w > 0 && viewerImageNatural.h > 0 ? (
                    (() => {
                      const wrap = viewerImageWrapRef.current;
                      if (!wrap) return null;
                      const rect = wrap.getBoundingClientRect();
                      const containerW = rect.width;
                      const containerH = rect.height;
                      const imgRatio = viewerImageNatural.w / viewerImageNatural.h;
                      const containerRatio = containerW / containerH;
                      let dispW = containerW;
                      let dispH = containerH;
                      let dispLeft = 0;
                      let dispTop = 0;
                      if (imgRatio > containerRatio) {
                        dispW = containerW;
                        dispH = containerW / imgRatio;
                        dispTop = (containerH - dispH) / 2;
                      } else {
                        dispH = containerH;
                        dispW = containerH * imgRatio;
                        dispLeft = (containerW - dispW) / 2;
                      }

                      const lensHalf = SCAN_LENS_SIZE_PX / 2;
                      const lensLeft = Math.min(
                        Math.max(dispLeft + scan.x - lensHalf, dispLeft),
                        dispLeft + dispW - SCAN_LENS_SIZE_PX
                      );
                      const lensTop = Math.min(
                        Math.max(dispTop + scan.y - lensHalf, dispTop),
                        dispTop + dispH - SCAN_LENS_SIZE_PX
                      );
                      return (
                        <div
                          className="absolute rounded border border-white/70 bg-white/15 shadow-[0_0_0_1px_rgba(0,0,0,0.25)] pointer-events-none"
                          style={{
                            width: SCAN_LENS_SIZE_PX,
                            height: SCAN_LENS_SIZE_PX,
                            left: lensLeft,
                            top: lensTop,
                            backdropFilter: 'blur(1px)',
                          }}
                        />
                      );
                    })()
                  ) : null}
                </div>
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
              {scan.active && viewerImageNatural.w > 0 && viewerImageNatural.h > 0 && viewerImageWrapRef.current ? (
                <div className="hidden lg:block w-full rounded-2xl overflow-hidden shadow-lg bg-black/90 border border-black/10">
                  <div className="relative h-[600px] w-full">
                    {(() => {
                      const wrap = viewerImageWrapRef.current!;
                      const rect = wrap.getBoundingClientRect();
                      const containerW = rect.width;
                      const containerH = rect.height;
                      const imgRatio = viewerImageNatural.w / viewerImageNatural.h;
                      const containerRatio = containerW / containerH;
                      let dispW = containerW;
                      let dispH = containerH;
                      let dispLeft = 0;
                      let dispTop = 0;
                      if (imgRatio > containerRatio) {
                        dispW = containerW;
                        dispH = containerW / imgRatio;
                        dispTop = (containerH - dispH) / 2;
                      } else {
                        dispH = containerH;
                        dispW = containerH * imgRatio;
                        dispLeft = (containerW - dispW) / 2;
                      }

                      // Map cursor position to percentage inside displayed image bounds.
                      const px = dispW > 0 ? (scan.x / dispW) * 100 : 50;
                      const py = dispH > 0 ? (scan.y / dispH) * 100 : 50;

                      return (
                        <div className="absolute inset-0">
                          <div
                            className="absolute inset-0"
                            style={{
                              backgroundImage: `url(${mainImageUrl})`,
                              backgroundRepeat: 'no-repeat',
                              // Fill the entire hover panel with the zoomed image (no letterboxing).
                              backgroundSize: `${SCAN_ZOOM * 100}% ${SCAN_ZOOM * 100}%`,
                              backgroundPosition: `${px}% ${py}%`,
                            }}
                          />
                          <div className="absolute inset-0 pointer-events-none" />
                        </div>
                      );
                    })()}
                  </div>
                </div>
              ) : null}

              <div className={scan.active ? 'lg:hidden' : ''}>
              <p className="text-sm font-medium uppercase tracking-wider mb-2" style={{ color: 'var(--beige-600)' }}>
                {product.category}
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'var(--heading-font)' }}>
                {product.name}
              </h1>

              {product.moq && (
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-700">
                    MOQ: {product.moq}
                  </span>
                </div>
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
        </div>
      </main>
      {showImageFrame && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/80">
          <div className="flex items-center justify-between px-4 py-3 sm:px-6 border-b border-black/40 bg-black/60">
            <div className="text-sm sm:text-base font-medium text-white/90">
              {product.name}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setZoomCursor('out');
                  setZoom((z) => Math.max(0.5, Math.round((z - 0.25) * 100) / 100));
                }}
                className="inline-flex items-center justify-center rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/20"
                aria-label="Zoom out"
              >
                <ZoomOut className="h-4 w-4 mr-1" />
                -
              </button>
              <span className="text-xs sm:text-sm font-semibold text-white/80 min-w-[3.5rem] text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                type="button"
                onClick={() => {
                  setZoomCursor('in');
                  setZoom((z) => Math.min(4, Math.round((z + 0.25) * 100) / 100));
                }}
                className="inline-flex items-center justify-center rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/20"
                aria-label="Zoom in"
              >
                <ZoomIn className="h-4 w-4 mr-1" />
                +
              </button>
              <button
                type="button"
                onClick={() => {
                  setZoom(1);
                  setZoomCursor('default');
                }}
                className="inline-flex items-center justify-center rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/20"
                aria-label="Reset view"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => {
                  setZoomCursor('default');
                  setShowImageFrame(false);
                }}
                className="ml-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30"
                aria-label="Close image view"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-hidden min-h-0">
            <div className="h-full w-full px-4 pt-2 pb-4 sm:px-6 sm:pt-3 sm:pb-6 flex items-stretch justify-center">
              <div className="h-full w-[96vw] max-w-7xl grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4">
                {/* Main viewer (left) */}
                <div className="min-w-0 h-full flex items-center justify-center">
                  <div
                    className={`h-full w-full rounded-xl border border-black/40 bg-black/90 flex items-center justify-center overflow-hidden ${
                      zoomCursor === 'in' ? 'cursor-zoom-in' : zoomCursor === 'out' ? 'cursor-zoom-out' : 'cursor-default'
                    }`}
                    role="application"
                    aria-label="Image viewer"
                    onClick={() => {
                      if (zoomCursor === 'in') {
                        setZoom((z) => Math.min(4, Math.round((z + 0.25) * 100) / 100));
                      } else if (zoomCursor === 'out') {
                        setZoom((z) => Math.max(0.5, Math.round((z - 0.25) * 100) / 100));
                      }
                    }}
                  >
                    <img
                      src={mainImageUrl}
                      alt={product.name}
                      className="h-full w-full object-contain select-none"
                      draggable={false}
                      style={{
                        transform: `scale(${zoom})`,
                        transformOrigin: 'center center',
                        transition: 'transform 120ms ease-out',
                      }}
                    />
                  </div>
                </div>

                {/* Thumbnails / info (right) */}
                <aside className="h-full rounded-xl border border-black/40 bg-white overflow-hidden flex flex-col">
                  <div className="px-4 py-3 border-b border-slate-200">
                    <p className="text-sm font-semibold text-slate-900 line-clamp-2">{product.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">Click a thumbnail to view</p>
                    {product.description ? (
                      <div className="mt-3 rounded-lg bg-slate-50 border border-slate-200 p-3">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-xs font-semibold text-slate-700">Description</p>
                          <button
                            type="button"
                            onClick={() => setShowFullViewerDescription((v) => !v)}
                            className="text-xs font-semibold text-emerald-700 hover:text-emerald-900"
                          >
                            {showFullViewerDescription ? 'Read less' : 'Read more'}
                          </button>
                        </div>
                        <p
                          className={`mt-2 text-sm leading-relaxed text-slate-700 whitespace-pre-wrap ${
                            showFullViewerDescription ? '' : 'line-clamp-5'
                          }`}
                        >
                          {product.description}
                        </p>
                      </div>
                    ) : null}
                  </div>
                  <div className="flex-1 overflow-auto p-4">
                    <div className="grid grid-cols-4 gap-2">
                      {imageList.map((url, i) => {
                        const active = i === selectedImageIndex;
                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={() => {
                              setSelectedImageIndex(i);
                              setZoom(1);
                              setZoomCursor('default');
                              setShowFullViewerDescription(false);
                            }}
                            className={`relative aspect-square rounded-lg overflow-hidden border ${
                              active ? 'border-slate-900 ring-2 ring-slate-900/30' : 'border-slate-200 hover:border-slate-400'
                            }`}
                            aria-label={`View image ${i + 1}`}
                          >
                            <img
                              src={resolveMediaUrl(url)}
                              alt={`${product.name} thumbnail ${i + 1}`}
                              className="h-full w-full object-cover"
                            />
                            {active ? (
                              <span className="absolute inset-x-0 bottom-0 bg-black/60 text-white text-[10px] font-semibold py-0.5 text-center">
                                Viewing
                              </span>
                            ) : null}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
