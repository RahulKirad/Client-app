import React, { useState, useEffect } from 'react';
import { FileText, Edit, Save, X, ExternalLink } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

interface ContentSection {
  id: string;
  section_key: string;
  title: string;
  content: any;
  is_active: boolean;
  updated_at: string;
}

export default function ContentManager() {
  const { token } = useAuth();
  const [sections, setSections] = useState<ContentSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>({});
  const [dashboardPreviewHash, setDashboardPreviewHash] = useState<string | null>(null);

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
  const authHeaders = () => {
    const t = token ?? (typeof localStorage !== 'undefined' ? localStorage.getItem('admin_token') : null);
    return t ? { Authorization: `Bearer ${t}` } : {};
  };

  useEffect(() => {
    const t = token ?? (typeof localStorage !== 'undefined' ? localStorage.getItem('admin_token') : null);
    if (t) fetchContent();
    else setLoading(false);
  }, [token]);

  const fetchContent = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/content`, { headers: authHeaders() });
      setSections(response.data);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (section: ContentSection) => {
    setEditingSection(section.id);
    setEditData({
      title: section.title,
      content: section.content,
      is_active: section.is_active
    });
  };

  const saveSection = async (sectionId: string) => {
    try {
      await axios.put(`${API_BASE_URL}/admin/content/${sectionId}`, editData, { headers: authHeaders() });
      fetchContent();
      setEditingSection(null);
      setEditData({});
    } catch (error) {
      console.error('Error updating content:', error);
    }
  };

  const cancelEditing = () => {
    setEditingSection(null);
    setEditData({});
  };

  const renderContentEditor = (content: any, onChange: (newContent: any) => void) => {
    if (typeof content === 'string') {
      return (
        <textarea
          value={content}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          rows={4}
        />
      );
    }

    if (Array.isArray(content)) {
      return (
        <div className="space-y-2">
          {content.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={item}
                onChange={(e) => {
                  const newContent = [...content];
                  newContent[index] = e.target.value;
                  onChange(newContent);
                }}
                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <button
                onClick={() => {
                  const newContent = content.filter((_, i) => i !== index);
                  onChange(newContent);
                }}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                <X size={16} />
              </button>
            </div>
          ))}
          <button
            onClick={() => onChange([...content, ''])}
            className="px-3 py-1 text-sm bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200"
          >
            Add Item
          </button>
        </div>
      );
    }

    if (typeof content === 'object' && content !== null) {
      return (
        <div className="space-y-3">
          {Object.entries(content).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </label>
              {typeof value === 'string' ? (
                <input
                  type="text"
                  value={value}
                  onChange={(e) => onChange({ ...content, [key]: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              ) : Array.isArray(value) ? (
                renderContentEditor(value, (newValue) => onChange({ ...content, [key]: newValue }))
              ) : (
                <textarea
                  value={JSON.stringify(value, null, 2)}
                  onChange={(e) => {
                    try {
                      const parsed = JSON.parse(e.target.value);
                      onChange({ ...content, [key]: parsed });
                    } catch (err) {
                      // Invalid JSON, don't update
                    }
                  }}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-mono text-sm"
                  rows={3}
                />
              )}
            </div>
          ))}
        </div>
      );
    }

    return (
      <textarea
        value={JSON.stringify(content, null, 2)}
        onChange={(e) => {
          try {
            const parsed = JSON.parse(e.target.value);
            onChange(parsed);
          } catch (err) {
            // Invalid JSON, don't update
          }
        }}
        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-mono text-sm"
        rows={6}
      />
    );
  };

  const renderContentPreview = (content: any) => {
    if (typeof content === 'string') {
      return <p className="text-slate-700">{content}</p>;
    }

    if (Array.isArray(content)) {
      return (
        <ul className="list-disc list-inside space-y-1">
          {content.map((item, index) => (
            <li key={index} className="text-slate-700">{item}</li>
          ))}
        </ul>
      );
    }

    if (typeof content === 'object' && content !== null) {
      return (
        <div className="space-y-2">
          {Object.entries(content).map(([key, value]) => (
            <div key={key}>
              <span className="font-medium text-slate-900">
                {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:
              </span>
              <span className="ml-2 text-slate-700">
                {typeof value === 'string' ? value : JSON.stringify(value)}
              </span>
            </div>
          ))}
        </div>
      );
    }

    return <pre className="text-sm text-slate-700 bg-slate-50 p-2 rounded">{JSON.stringify(content, null, 2)}</pre>;
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
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Content Management</h1>
          <p className="text-slate-600">Manage website content sections</p>
        </div>
        <button
          type="button"
          onClick={() => setDashboardPreviewHash('')}
          className="flex items-center px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <ExternalLink size={18} className="mr-2" />
          Preview on dashboard
        </button>
      </div>

      {/* Dashboard preview modal (iframe) */}
      {dashboardPreviewHash !== null && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 shrink-0">
              <h2 className="text-lg font-semibold text-slate-900">
                Dashboard preview — how content appears to users
              </h2>
              <button
                type="button"
                onClick={() => setDashboardPreviewHash(null)}
                className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Close preview"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 min-h-0 p-4">
              <iframe
                title="Dashboard preview"
                src={`${window.location.origin}/${dashboardPreviewHash ? `#${dashboardPreviewHash}` : ''}`}
                className="w-full h-full min-h-[70vh] rounded-lg border border-slate-200 bg-white"
              />
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.id} className="bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">{section.title}</h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Section: {section.section_key} • 
                    Last updated: {new Date(section.updated_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setDashboardPreviewHash(section.section_key?.startsWith('about') ? 'about' : '')}
                    className="flex items-center px-3 py-1 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
                    title="Preview how this section looks on the dashboard"
                  >
                    <ExternalLink size={14} className="mr-1" />
                    Preview
                  </button>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    section.is_active 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {section.is_active ? 'Active' : 'Inactive'}
                  </span>
                  {editingSection === section.id ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => saveSection(section.id)}
                        className="flex items-center px-3 py-1 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                      >
                        <Save size={16} className="mr-1" />
                        Save
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="flex items-center px-3 py-1 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
                      >
                        <X size={16} className="mr-1" />
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => startEditing(section)}
                      className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Edit size={16} className="mr-1" />
                      Edit
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6">
              {editingSection === section.id ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={editData.title}
                      onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Content
                    </label>
                    {renderContentEditor(editData.content, (newContent) => 
                      setEditData({ ...editData, content: newContent })
                    )}
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`active-${section.id}`}
                      checked={editData.is_active}
                      onChange={(e) => setEditData({ ...editData, is_active: e.target.checked })}
                      className="mr-2"
                    />
                    <label htmlFor={`active-${section.id}`} className="text-sm font-medium text-slate-700">
                      Active
                    </label>
                  </div>
                </div>
              ) : (
                <div>
                  {renderContentPreview(section.content)}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}