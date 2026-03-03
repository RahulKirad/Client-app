import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Image, Star, Eye } from 'lucide-react';
import axios from 'axios';

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  material: string;
  print_type: string;
  packaging: string;
  moq: string;
  price: number;
  image_url: string;
  specifications: any;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
}

export default function ProductsManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    material: '100% GOTS-certified cotton',
    print_type: 'Water-based inks',
    packaging: 'FSC-certified hangtags and labels',
    moq: 'Flexible for pilot programs',
    price: 0,
    specifications: '{}',
    is_featured: false
  });
  
  // Multi-currency pricing state
  const [pricing, setPricing] = useState({
    inr: { amount: 0, enabled: true },
    usd: { amount: 0, enabled: false },
    eur: { amount: 0, enabled: false },
    gbp: { amount: 0, enabled: false },
    aed: { amount: 0, enabled: false },
    sar: { amount: 0, enabled: false },
    qar: { amount: 0, enabled: false },
    kwd: { amount: 0, enabled: false }
  });
  
  const [selectedCurrency, setSelectedCurrency] = useState<'inr' | 'usd' | 'eur' | 'gbp' | 'aed' | 'sar' | 'qar' | 'kwd'>('inr');
  
  const currencies = [
    { code: 'inr', symbol: '₹', name: 'Indian Rupee', flag: '🇮🇳', region: 'Asia' },
    { code: 'usd', symbol: '$', name: 'US Dollar', flag: '🇺🇸', region: 'Americas' },
    { code: 'eur', symbol: '€', name: 'Euro', flag: '🇪🇺', region: 'Europe' },
    { code: 'gbp', symbol: '£', name: 'British Pound', flag: '🇬🇧', region: 'Europe' },
    { code: 'aed', symbol: 'د.إ', name: 'UAE Dirham', flag: '🇦🇪', region: 'Middle East' },
    { code: 'sar', symbol: '﷼', name: 'Saudi Riyal', flag: '🇸🇦', region: 'Middle East' },
    { code: 'qar', symbol: 'ر.ق', name: 'Qatari Riyal', flag: '🇶🇦', region: 'Middle East' },
    { code: 'kwd', symbol: 'د.ك', name: 'Kuwaiti Dinar', flag: '🇰🇼', region: 'Middle East' }
  ];
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitting(true);

    let specs: Record<string, unknown> = {};
    try {
      specs = formData.specifications ? JSON.parse(formData.specifications) : {};
    } catch {
      setSubmitError('Specifications must be valid JSON.');
      setSubmitting(false);
      return;
    }
    specs.pricing = pricing;

    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'specifications') {
        submitData.append(key, JSON.stringify(specs));
      } else {
        submitData.append(key, value.toString());
      }
    });

    if (imageFile) {
      submitData.append('image', imageFile);
    }

    try {
      if (editingProduct) {
        await axios.put(`${API_BASE_URL}/admin/products/${editingProduct.id}`, submitData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await axios.post(`${API_BASE_URL}/admin/products`, submitData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      fetchProducts();
      resetForm();
      setShowModal(false);
    } catch (err: unknown) {
      const ax = err && typeof err === 'object' && 'response' in err ? (err as { response?: { data?: { error?: string }; status?: number } }).response : null;
      const message = ax?.data?.error || (ax?.status === 401 ? 'Please log in again.' : 'Failed to save product. Check console for details.');
      setSubmitError(message);
      console.error('Error saving product:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      description: product.description,
      material: product.material,
      print_type: product.print_type,
      packaging: product.packaging,
      moq: product.moq,
      price: product.price,
      specifications: JSON.stringify(product.specifications),
      is_featured: product.is_featured
    });
    
    // Load pricing data if available
    const specs = product.specifications;
    if (specs && specs.pricing) {
      setPricing(specs.pricing);
    }
    
    setSubmitError(null);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`${API_BASE_URL}/admin/products/${id}`);
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      description: '',
      material: '100% GOTS-certified cotton',
      print_type: 'Water-based inks',
      packaging: 'FSC-certified hangtags and labels',
      moq: 'Flexible for pilot programs',
      price: 0,
      specifications: '{}',
      is_featured: false
    });
    setPricing({
      inr: { amount: 0, enabled: true },
      usd: { amount: 0, enabled: false },
      eur: { amount: 0, enabled: false },
      gbp: { amount: 0, enabled: false },
      aed: { amount: 0, enabled: false },
      sar: { amount: 0, enabled: false },
      qar: { amount: 0, enabled: false },
      kwd: { amount: 0, enabled: false }
    });
    setSelectedCurrency('inr');
    setImageFile(null);
    setEditingProduct(null);
  };

  const categories = [
    'Classic Cotton Totes',
    'Foldable Travel Totes',
    'Branded Corporate Totes',
    'Seasonal Gift Editions'
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Products</h1>
          <p className="text-slate-600">Manage your product catalog</p>
        </div>
        <button
          onClick={() => { setSubmitError(null); setShowModal(true); }}
          className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <Plus size={20} className="mr-2" />
          Add Product
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="relative h-48 bg-slate-100">
              {product.image_url ? (
                <img
                  src={`http://localhost:3001${product.image_url}`}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <Image className="text-slate-400" size={48} />
                </div>
              )}
              {product.is_featured && (
                <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                  <Star size={12} className="mr-1" />
                  Featured
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-slate-900 mb-1">{product.name}</h3>
              <p className="text-sm text-slate-600 mb-2">{product.category}</p>
              <p className="text-xs text-slate-500 mb-3 line-clamp-2">{product.description}</p>
              
              {/* Display multi-currency prices */}
              <div className="mb-3">
                {product.specifications?.pricing ? (
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(product.specifications.pricing).map(([code, data]: [string, any]) => {
                      const curr = currencies.find(c => c.code === code);
                      return data.enabled && data.amount > 0 && curr ? (
                        <span key={code} className="inline-flex items-center space-x-1 px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold">
                          <span>{curr.symbol}{data.amount}</span>
                        </span>
                      ) : null;
                    })}
                  </div>
                ) : (
                  <p className="text-lg font-bold text-emerald-600">${product.price}</p>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="flex items-center text-xs text-slate-500">
                  <Eye size={12} className="mr-1" />
                  {product.is_active ? 'Active' : 'Inactive'}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-xl font-semibold text-slate-900">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {submitError && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm" role="alert">
                  {submitError}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>

              {/* Multi-Currency Pricing Section */}
              <div className="border-2 border-emerald-100 rounded-lg p-4 bg-emerald-50/30">
                <label className="block text-sm font-bold text-slate-900 mb-3">
                  💰 Multi-Currency Pricing (Global Markets)
                </label>
                
                {/* Currency Selector Tabs - Organized by Region */}
                <div className="space-y-3 mb-4">
                  {/* Asia */}
                  <div>
                    <p className="text-xs font-semibold text-slate-600 mb-2">🌏 Asia</p>
                    <div className="flex flex-wrap gap-2">
                      {currencies.filter(c => c.region === 'Asia').map((currency) => (
                        <button
                          key={currency.code}
                          type="button"
                          onClick={() => setSelectedCurrency(currency.code as any)}
                          className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all ${
                            selectedCurrency === currency.code
                              ? 'bg-emerald-600 text-white shadow-lg scale-105'
                              : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                          }`}
                        >
                          <span className="text-lg">{currency.flag}</span>
                          <span>{currency.symbol}</span>
                          <span className="text-xs uppercase font-bold">{currency.code}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Americas */}
                  <div>
                    <p className="text-xs font-semibold text-slate-600 mb-2">🌎 Americas</p>
                    <div className="flex flex-wrap gap-2">
                      {currencies.filter(c => c.region === 'Americas').map((currency) => (
                        <button
                          key={currency.code}
                          type="button"
                          onClick={() => setSelectedCurrency(currency.code as any)}
                          className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all ${
                            selectedCurrency === currency.code
                              ? 'bg-emerald-600 text-white shadow-lg scale-105'
                              : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                          }`}
                        >
                          <span className="text-lg">{currency.flag}</span>
                          <span>{currency.symbol}</span>
                          <span className="text-xs uppercase font-bold">{currency.code}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Europe */}
                  <div>
                    <p className="text-xs font-semibold text-slate-600 mb-2">🌍 Europe</p>
                    <div className="flex flex-wrap gap-2">
                      {currencies.filter(c => c.region === 'Europe').map((currency) => (
                        <button
                          key={currency.code}
                          type="button"
                          onClick={() => setSelectedCurrency(currency.code as any)}
                          className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all ${
                            selectedCurrency === currency.code
                              ? 'bg-emerald-600 text-white shadow-lg scale-105'
                              : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                          }`}
                        >
                          <span className="text-lg">{currency.flag}</span>
                          <span>{currency.symbol}</span>
                          <span className="text-xs uppercase font-bold">{currency.code}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Middle East */}
                  <div>
                    <p className="text-xs font-semibold text-slate-600 mb-2">🕌 Middle East</p>
                    <div className="flex flex-wrap gap-2">
                      {currencies.filter(c => c.region === 'Middle East').map((currency) => (
                        <button
                          key={currency.code}
                          type="button"
                          onClick={() => setSelectedCurrency(currency.code as any)}
                          className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all ${
                            selectedCurrency === currency.code
                              ? 'bg-emerald-600 text-white shadow-lg scale-105'
                              : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                          }`}
                        >
                          <span className="text-lg">{currency.flag}</span>
                          <span className="text-sm">{currency.symbol}</span>
                          <span className="text-xs uppercase font-bold">{currency.code}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Selected Currency Input */}
                {currencies.map((currency) => (
                  selectedCurrency === currency.code && (
                    <div key={currency.code} className="space-y-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <input
                          type="checkbox"
                          id={`enable-${currency.code}`}
                          checked={pricing[currency.code as keyof typeof pricing].enabled}
                          onChange={(e) => setPricing({
                            ...pricing,
                            [currency.code]: { ...pricing[currency.code as keyof typeof pricing], enabled: e.target.checked }
                          })}
                          className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                        />
                        <label htmlFor={`enable-${currency.code}`} className="text-sm font-medium text-slate-700">
                          Enable {currency.name} pricing
                        </label>
                      </div>
                      
                      {pricing[currency.code as keyof typeof pricing].enabled && (
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">{currency.symbol}</span>
                          <input
                            type="number"
                            step="0.01"
                            value={pricing[currency.code as keyof typeof pricing].amount}
                            onChange={(e) => setPricing({
                              ...pricing,
                              [currency.code]: { ...pricing[currency.code as keyof typeof pricing], amount: parseFloat(e.target.value) || 0 }
                            })}
                            placeholder={`Enter price in ${currency.name}`}
                            className="flex-1 px-4 py-3 border-2 border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg font-semibold"
                          />
                          <span className="text-sm text-slate-600 font-medium">{currency.code.toUpperCase()}</span>
                        </div>
                      )}
                      
                      {/* Display all enabled prices */}
                      <div className="mt-3 p-3 bg-white rounded-lg border border-slate-200">
                        <p className="text-xs font-semibold text-slate-600 mb-2">Active Prices:</p>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(pricing).map(([code, data]) => {
                            const curr = currencies.find(c => c.code === code);
                            return data.enabled && data.amount > 0 && curr ? (
                              <span key={code} className="inline-flex items-center space-x-1 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
                                <span>{curr.flag}</span>
                                <span>{curr.symbol}{data.amount.toFixed(2)}</span>
                              </span>
                            ) : null;
                          })}
                        </div>
                      </div>
                    </div>
                  )
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">MOQ (Minimum Order Quantity)</label>
                <input
                  type="text"
                  value={formData.moq}
                  onChange={(e) => setFormData({ ...formData, moq: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="e.g., 100 units, Flexible for pilot programs"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Product Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_featured"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                  className="mr-2"
                />
                <label htmlFor="is_featured" className="text-sm font-medium text-slate-700">
                  Featured Product
                </label>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitError(null);
                    setShowModal(false);
                    resetForm();
                  }}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Saving…' : editingProduct ? 'Update' : 'Create'} Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}