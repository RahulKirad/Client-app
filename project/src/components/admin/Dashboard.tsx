import React, { useState, useEffect } from 'react';
import { Package, MessageSquare, FileText, TrendingUp } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

interface Stats {
  totalProducts: number;
  totalInquiries: number;
  pendingInquiries: number;
  featuredProducts: number;
}

export default function Dashboard() {
  const { token } = useAuth();
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    totalInquiries: 0,
    pendingInquiries: 0,
    featuredProducts: 0
  });
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
  const authHeaders = () => {
    const t = token ?? (typeof localStorage !== 'undefined' ? localStorage.getItem('admin_token') : null);
    return t ? { Authorization: `Bearer ${t}` } : {};
  };

  useEffect(() => {
    const t = token ?? (typeof localStorage !== 'undefined' ? localStorage.getItem('admin_token') : null);
    if (t) fetchStats();
    else setLoading(false);
  }, [token]);

  const fetchStats = async () => {
    try {
      const [productsRes, inquiriesRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/admin/products`, { headers: authHeaders() }),
        axios.get(`${API_BASE_URL}/admin/inquiries`, { headers: authHeaders() })
      ]);

      const products = productsRes.data;
      const inquiries = inquiriesRes.data;

      setStats({
        totalProducts: products.length,
        totalInquiries: inquiries.length,
        pendingInquiries: inquiries.filter((i: any) => i.status === 'new').length,
        featuredProducts: products.filter((p: any) => p.is_featured).length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Total Inquiries',
      value: stats.totalInquiries,
      icon: MessageSquare,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Pending Inquiries',
      value: stats.pendingInquiries,
      icon: TrendingUp,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    },
    {
      title: 'Featured Products',
      value: stats.featuredProducts,
      icon: FileText,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    }
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
        <p className="text-slate-600">Overview of your Cottonunique admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">{card.title}</p>
                  <p className="text-3xl font-bold text-slate-900">{card.value}</p>
                </div>
                <div className={`${card.bgColor} p-3 rounded-lg`}>
                  <Icon className={card.textColor} size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/admin/products"
            className="flex items-center p-4 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
          >
            <Package className="text-emerald-600 mr-3" size={20} />
            <div>
              <p className="font-medium text-slate-900">Manage Products</p>
              <p className="text-sm text-slate-600">Add, edit, or remove products</p>
            </div>
          </a>
          <a
            href="/admin/inquiries"
            className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <MessageSquare className="text-blue-600 mr-3" size={20} />
            <div>
              <p className="font-medium text-slate-900">View Inquiries</p>
              <p className="text-sm text-slate-600">Respond to customer inquiries</p>
            </div>
          </a>
          <a
            href="/admin/content"
            className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <FileText className="text-purple-600 mr-3" size={20} />
            <div>
              <p className="font-medium text-slate-900">Edit Content</p>
              <p className="text-sm text-slate-600">Update website content</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}