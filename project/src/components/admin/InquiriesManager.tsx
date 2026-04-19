import React, { useState, useEffect } from 'react';
import { MessageSquare, Mail, Building, MapPin, Clock, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

interface Inquiry {
  id: string;
  name: string;
  company: string;
  email: string;
  region: string;
  order_type: string;
  message: string;
  status: string;
  created_at: string;
}

export default function InquiriesManager() {
  const { token } = useAuth();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
  const authHeaders = () => {
    const t = token ?? (typeof localStorage !== 'undefined' ? localStorage.getItem('admin_token') : null);
    return t ? { Authorization: `Bearer ${t}` } : {};
  };

  useEffect(() => {
    const t = token ?? (typeof localStorage !== 'undefined' ? localStorage.getItem('admin_token') : null);
    if (t) fetchInquiries();
    else setLoading(false);
  }, [token]);

  const fetchInquiries = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/inquiries`, { headers: authHeaders() });
      setInquiries(response.data);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await axios.put(`${API_BASE_URL}/admin/inquiries/${id}`, { status }, { headers: authHeaders() });
      fetchInquiries();
      if (selectedInquiry?.id === id) {
        setSelectedInquiry({ ...selectedInquiry, status });
      }
    } catch (error) {
      console.error('Error updating inquiry status:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredInquiries = inquiries.filter(inquiry => 
    statusFilter === 'all' || inquiry.status === statusFilter
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Inquiries</h1>
          <p className="text-slate-600">Manage customer inquiries and requests</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inquiries List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="p-4 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">
                Inquiries ({filteredInquiries.length})
              </h2>
            </div>
            <div className="divide-y divide-slate-200">
              {filteredInquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  className={`p-4 cursor-pointer hover:bg-slate-50 transition-colors ${
                    selectedInquiry?.id === inquiry.id ? 'bg-emerald-50' : ''
                  }`}
                  onClick={() => setSelectedInquiry(inquiry)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-slate-900">{inquiry.name}</h3>
                      {inquiry.company && (
                        <p className="text-sm text-slate-600 flex items-center mt-1">
                          <Building size={14} className="mr-1" />
                          {inquiry.company}
                        </p>
                      )}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(inquiry.status)}`}>
                      {inquiry.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-sm text-slate-500 space-x-4 mb-2">
                    <span className="flex items-center">
                      <Mail size={14} className="mr-1" />
                      {inquiry.email}
                    </span>
                    {inquiry.region && (
                      <span className="flex items-center">
                        <MapPin size={14} className="mr-1" />
                        {inquiry.region}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-slate-600 line-clamp-2 mb-2">
                    {inquiry.message}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center">
                      <Clock size={12} className="mr-1" />
                      {formatDate(inquiry.created_at)}
                    </span>
                    {inquiry.order_type && (
                      <span className="bg-slate-100 px-2 py-1 rounded">
                        {inquiry.order_type}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Inquiry Details */}
        <div className="lg:col-span-1">
          {selectedInquiry ? (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="p-4 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900">Inquiry Details</h2>
              </div>
              
              <div className="p-4 space-y-4">
                <div>
                  <h3 className="font-medium text-slate-900 mb-2">{selectedInquiry.name}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-slate-600">
                      <Mail size={16} className="mr-2" />
                      <a href={`mailto:${selectedInquiry.email}`} className="hover:text-emerald-600">
                        {selectedInquiry.email}
                      </a>
                    </div>
                    {selectedInquiry.company && (
                      <div className="flex items-center text-slate-600">
                        <Building size={16} className="mr-2" />
                        {selectedInquiry.company}
                      </div>
                    )}
                    {selectedInquiry.region && (
                      <div className="flex items-center text-slate-600">
                        <MapPin size={16} className="mr-2" />
                        {selectedInquiry.region}
                      </div>
                    )}
                    <div className="flex items-center text-slate-600">
                      <Clock size={16} className="mr-2" />
                      {formatDate(selectedInquiry.created_at)}
                    </div>
                  </div>
                </div>

                {selectedInquiry.order_type && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Order Type
                    </label>
                    <span className="inline-block bg-slate-100 px-3 py-1 rounded-lg text-sm">
                      {selectedInquiry.order_type}
                    </span>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Message
                  </label>
                  <div className="bg-slate-50 p-3 rounded-lg text-sm text-slate-700">
                    {selectedInquiry.message}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Status
                  </label>
                  <div className="flex space-x-2">
                    {['new', 'contacted', 'completed'].map((status) => (
                      <button
                        key={status}
                        onClick={() => updateStatus(selectedInquiry.id, status)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                          selectedInquiry.status === status
                            ? getStatusColor(status)
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {status === 'new' && <MessageSquare size={14} className="inline mr-1" />}
                        {status === 'contacted' && <Mail size={14} className="inline mr-1" />}
                        {status === 'completed' && <CheckCircle size={14} className="inline mr-1" />}
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
              <MessageSquare className="mx-auto text-slate-400 mb-4" size={48} />
              <p className="text-slate-600">Select an inquiry to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}