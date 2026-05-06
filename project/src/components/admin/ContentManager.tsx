import { useState, useEffect, useRef } from 'react';
import { ExternalLink, Edit2, Check, X, Eye, RefreshCw } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { resolveMediaUrl } from '../../lib/api';

interface ContentSection {
  id: string;
  section_key: string;
  title: string;
  content: any;
  is_active: boolean;
  updated_at: string;
}

function normalizeSectionContent(raw: unknown): unknown {
  let parsed: unknown = raw;
  while (typeof parsed === 'string') {
    try { parsed = JSON.parse(parsed); } catch { break; }
  }
  return parsed;
}

function isImageKey(key: string): boolean {
  return key === 'image' || key.startsWith('image_') || key.endsWith('_image');
}

function fmtKey(key: string) {
  return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

export default function ContentManager() {
  const { token } = useAuth();
  const [sections, setSections] = useState<ContentSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [dashboardPreviewHash, setDashboardPreviewHash] = useState<string | null>(null);

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
  const authHeaders = () => {
    const t = token ?? (typeof localStorage !== 'undefined' ? localStorage.getItem('admin_token') : null);
    return t ? { Authorization: `Bearer ${t}` } : {};
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  };

  useEffect(() => {
    const t = token ?? (typeof localStorage !== 'undefined' ? localStorage.getItem('admin_token') : null);
    if (t) fetchContent(); else setLoading(false);
  }, [token]);

  const fetchContent = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/admin/content`, { headers: authHeaders() });
      setSections((res.data as ContentSection[]).map(s => ({ ...s, content: normalizeSectionContent(s.content) })));
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const startEditing = (s: ContentSection) => {
    setEditingSection(s.id);
    setEditData({ title: s.title, content: normalizeSectionContent(s.content), is_active: s.is_active });
  };

  const saveSection = async (sectionId: string) => {
    setSaving(true);
    try {
      await axios.put(`${API_BASE_URL}/admin/content/${sectionId}`, editData, { headers: authHeaders() });
      showToast('✓ Section saved successfully');
      await fetchContent();
      setEditingSection(null);
      setEditData({});
    } catch (e) { console.error(e); showToast('✗ Failed to save'); }
    finally { setSaving(false); }
  };

  const cancelEditing = () => { setEditingSection(null); setEditData({}); };

  const uploadImage = async (file: File): Promise<string> => {
    const fd = new FormData();
    fd.append('image', file);
    const t = token ?? localStorage.getItem('admin_token');
    const res = await axios.post(`${API_BASE_URL}/admin/content/upload-image`, fd, {
      headers: { ...(t ? { Authorization: `Bearer ${t}` } : {}), 'Content-Type': 'multipart/form-data' },
    });
    return res.data.url as string;
  };

  // ── Image upload field ──────────────────────────────────────────────
  const ImageUploadField = ({ value, onChange }: { value: string; onChange: (url: string) => void }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const handleFile = async (file: File) => {
      setUploading(true);
      try { onChange(await uploadImage(file)); }
      catch (e) { console.error(e); }
      finally { setUploading(false); }
    };
    return (
      <div>
        <input
          type="text" value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="/images/example.jpg"
          style={{ width:'100%', fontFamily:'inherit', fontSize:15, color:'#1a1d23', background:'#f9fafb', border:'1px solid #e2e5ea', borderRadius:6, padding:'10px 14px', outline:'none', marginBottom:10 }}
        />
        <div style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 12px', background:'#f4f5f7', border:'1px solid #e2e5ea', borderRadius:6 }}>
          {value
            ? <img src={resolveMediaUrl(value)} alt="preview" style={{ width:52, height:52, borderRadius:4, objectFit:'cover', border:'1px solid #e2e5ea', flexShrink:0 }} />
            : <div style={{ width:52, height:52, borderRadius:4, background:'#e5e7eb', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <svg width="22" height="22" fill="none" stroke="#9ca3af" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              </div>
          }
          <span style={{ fontSize:14, color:'#6b7280', wordBreak:'break-all', flex:1 }}>{value || 'No image set'}</span>
          <button type="button" onClick={() => inputRef.current?.click()} disabled={uploading}
            style={{ marginLeft:'auto', flexShrink:0, display:'inline-flex', alignItems:'center', gap:6, background:'#1c2b4a', color:'#fff', border:'none', borderRadius:6, padding:'9px 15px', fontSize:14, fontWeight:500, cursor:'pointer', opacity: uploading ? 0.6 : 1 }}>
            <RefreshCw size={14} />
            {uploading ? 'Uploading…' : 'Replace Image'}
          </button>
          <input ref={inputRef} type="file" accept="image/*" style={{ display:'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
        </div>
      </div>
    );
  };

  // ── Content editor (edit mode) ──────────────────────────────────────
  const renderEditor = (content: any, onChange: (v: any) => void): React.ReactNode => {
    if (typeof content === 'string') {
      return <textarea value={content} onChange={e => onChange(e.target.value)} rows={3}
        style={{ width:'100%', fontFamily:'inherit', fontSize:15, color:'#1a1d23', background:'#f9fafb', border:'1px solid #e2e5ea', borderRadius:6, padding:'10px 14px', outline:'none', resize:'vertical' }} />;
    }

    if (Array.isArray(content)) {
      if (content.length > 0 && typeof content[0] === 'object' && content[0] !== null) {
        return (
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            {content.map((item, idx) => (
              <div key={idx} style={{ border:'1px solid #e2e5ea', borderRadius:8, padding:18, background:'#fafbfc' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
                  <span style={{ fontSize:14, fontWeight:700, color:'#6b7280', textTransform:'uppercase', letterSpacing:'.5px' }}>Item {idx + 1}</span>
                  <button type="button" onClick={() => onChange(content.filter((_:any, i:number) => i !== idx))}
                    style={{ background:'none', border:'none', cursor:'pointer', color:'#dc2626', padding:5 }}><X size={15}/></button>
                </div>
                {Object.entries(item).map(([k, v]) => (
                  <div key={k} style={{ marginBottom:12 }}>
                    <label style={{ display:'block', fontSize:13, fontWeight:700, color:'#9ca3af', textTransform:'uppercase', letterSpacing:'.5px', marginBottom:5 }}>{fmtKey(k)}</label>
                    {isImageKey(k)
                      ? <ImageUploadField value={String(v ?? '')} onChange={url => { const u=[...content]; u[idx]={...item,[k]:url}; onChange(u); }} />
                      : <input type="text" value={String(v ?? '')} onChange={e => { const u=[...content]; u[idx]={...item,[k]:e.target.value}; onChange(u); }}
                          style={{ width:'100%', fontFamily:'inherit', fontSize:15, color:'#1a1d23', background:'#f9fafb', border:'1px solid #e2e5ea', borderRadius:6, padding:'9px 13px', outline:'none' }} />
                    }
                  </div>
                ))}
              </div>
            ))}
          </div>
        );
      }
      return (
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {content.map((item: string, idx: number) => (
            <div key={idx} style={{ display:'flex', gap:10 }}>
              <input type="text" value={item} onChange={e => { const n=[...content]; n[idx]=e.target.value; onChange(n); }}
                style={{ flex:1, fontFamily:'inherit', fontSize:15, color:'#1a1d23', background:'#f9fafb', border:'1px solid #e2e5ea', borderRadius:6, padding:'9px 13px', outline:'none' }} />
              <button type="button" onClick={() => onChange(content.filter((_:any,i:number)=>i!==idx))}
                style={{ background:'none', border:'1px solid #e2e5ea', borderRadius:6, cursor:'pointer', color:'#dc2626', padding:'0 12px' }}><X size={15}/></button>
            </div>
          ))}
          <button type="button" onClick={() => onChange([...content,''])}
            style={{ alignSelf:'flex-start', background:'#eef1f7', color:'#1c2b4a', border:'none', borderRadius:6, padding:'8px 16px', fontSize:14, fontWeight:600, cursor:'pointer' }}>+ Add Item</button>
        </div>
      );
    }

    if (typeof content === 'object' && content !== null) {
      return (
        <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
          {Object.entries(content).map(([k, v]) => {
            const isLong = typeof v === 'string' && v.length > 80;
            const isArr = Array.isArray(v);
            const isNestedObj = typeof v === 'object' && v !== null && !Array.isArray(v);
            
            return (
              <div key={k} style={{ display:'flex', flexDirection:'column', gap:10 }}>
                <label style={{ fontSize:14, fontWeight:700, color:'#1c2b4a', textTransform:'uppercase', letterSpacing:'.5px', borderBottom:'1px solid #e2e5ea', paddingBottom:5 }}>{fmtKey(k)}</label>
                
                {isNestedObj ? (
                  // Nested object (like main_banner: { title, image, etc })
                  <div style={{ border:'1px solid #e2e5ea', borderRadius:8, padding:16, background:'#fafbfc' }}>
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px 18px' }}>
                      {Object.entries(v as Record<string,any>).map(([nk, nv]) => {
                        const nestedIsLong = typeof nv === 'string' && nv.length > 60;
                        const spanAll = nestedIsLong || isImageKey(nk);
                        return (
                          <div key={nk} style={{ gridColumn: spanAll ? 'span 2' : 'span 1', display:'flex', flexDirection:'column', gap:5 }}>
                            <label style={{ fontSize:12, fontWeight:600, color:'#9ca3af', textTransform:'uppercase', letterSpacing:'.4px' }}>{fmtKey(nk)}</label>
                            {isImageKey(nk) ? (
                              <ImageUploadField value={String(nv ?? '')} onChange={url => onChange({ ...content, [k]: { ...v, [nk]: url } })} />
                            ) : nestedIsLong ? (
                              <textarea value={String(nv ?? '')} rows={2} onChange={e => onChange({ ...content, [k]: { ...v, [nk]: e.target.value } })}
                                style={{ width:'100%', fontFamily:'inherit', fontSize:14, color:'#1a1d23', background:'#fff', border:'1px solid #e2e5ea', borderRadius:6, padding:'8px 12px', outline:'none', resize:'vertical' }} />
                            ) : (
                              <input type="text" value={String(nv ?? '')} onChange={e => onChange({ ...content, [k]: { ...v, [nk]: e.target.value } })}
                                style={{ width:'100%', fontFamily:'inherit', fontSize:14, color:'#1a1d23', background:'#fff', border:'1px solid #e2e5ea', borderRadius:6, padding:'8px 12px', outline:'none' }} />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : isImageKey(k) ? (
                  <ImageUploadField value={String(v ?? '')} onChange={url => onChange({ ...content, [k]: url })} />
                ) : isArr ? (
                  renderEditor(v, nv => onChange({ ...content, [k]: nv }))
                ) : isLong ? (
                  <textarea value={String(v ?? '')} rows={3} onChange={e => onChange({ ...content, [k]: e.target.value })}
                    style={{ width:'100%', fontFamily:'inherit', fontSize:15, color:'#1a1d23', background:'#f9fafb', border:'1px solid #e2e5ea', borderRadius:6, padding:'9px 13px', outline:'none', resize:'vertical' }} />
                ) : (
                  <input type="text" value={String(v ?? '')} onChange={e => onChange({ ...content, [k]: e.target.value })}
                    style={{ width:'100%', fontFamily:'inherit', fontSize:15, color:'#1a1d23', background:'#f9fafb', border:'1px solid #e2e5ea', borderRadius:6, padding:'9px 13px', outline:'none' }} />
                )}
              </div>
            );
          })}
        </div>
      );
    }

    return <textarea value={JSON.stringify(content, null, 2)} rows={5}
      onChange={e => { try { onChange(JSON.parse(e.target.value)); } catch {} }}
      style={{ width:'100%', fontFamily:'monospace', fontSize:12, color:'#1a1d23', background:'#f9fafb', border:'1px solid #e2e5ea', borderRadius:6, padding:'7px 11px', outline:'none', resize:'vertical' }} />;
  };

  // ── Preview (collapsed view) ────────────────────────────────────────
  const renderPreview = (content: any) => {
    if (typeof content === 'string') return (
      <div style={{ display:'flex', alignItems:'baseline', gap:10, padding:'7px 0', borderBottom:'1px dashed #e2e5ea' }}>
        <span style={{ fontSize:12, fontWeight:700, color:'#9ca3af', textTransform:'uppercase', letterSpacing:'.4px', width:120, flexShrink:0 }}>Content</span>
        <span style={{ fontSize:13, color:'#6b7280', lineHeight:1.5 }}>{content}</span>
      </div>
    );

    if (Array.isArray(content)) {
      if (content.length > 0 && typeof content[0] === 'object') {
        return (
          <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
            {content.slice(0,5).map((item:any, i:number) => (
              <span key={i} style={{ background:'#eef1f7', border:'1px solid #c5d5ea', color:'#1c2b4a', fontSize:12, fontWeight:500, padding:'4px 12px', borderRadius:20 }}>
                {item.title || item.name || `Item ${i+1}`}
              </span>
            ))}
            {content.length > 5 && <span style={{ background:'#eef1f7', border:'1px solid #c5d5ea', color:'#1c2b4a', fontSize:12, fontWeight:500, padding:'4px 12px', borderRadius:20 }}>+{content.length-5} more</span>}
          </div>
        );
      }
      return (
        <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
          {content.map((item:string, i:number) => (
            <span key={i} style={{ background:'#eef1f7', border:'1px solid #c5d5ea', color:'#1c2b4a', fontSize:12, padding:'3px 10px', borderRadius:20 }}>{item}</span>
          ))}
        </div>
      );
    }

    if (typeof content === 'object' && content !== null) {
      return (
        <div>
          {Object.entries(content).map(([k, v], i, arr) => {
            const isNestedObj = typeof v === 'object' && v !== null && !Array.isArray(v);
            return (
              <div key={k} style={{ padding:'7px 0', borderBottom: i < arr.length-1 ? '1px dashed #e2e5ea' : 'none' }}>
                <div style={{ display:'flex', alignItems: isImageKey(k) ? 'center' : 'baseline', gap:10, marginBottom: isNestedObj ? 6 : 0 }}>
                  <span style={{ fontSize:12, fontWeight:700, color:'#9ca3af', textTransform:'uppercase', letterSpacing:'.4px', width:120, flexShrink:0 }}>{fmtKey(k)}</span>
                  {isNestedObj ? (
                    <span style={{ fontSize:11, color:'#1c2b4a', background:'#eef1f7', padding:'2px 8px', borderRadius:12 }}>
                      {Object.keys(v as Record<string,any>).length} fields
                    </span>
                  ) : isImageKey(k) && typeof v === 'string' ? (
                    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                      <img src={resolveMediaUrl(v)} alt={k} style={{ width:48, height:36, objectFit:'cover', borderRadius:4, border:'1px solid #e2e5ea' }} />
                      <span style={{ fontSize:12, color:'#9ca3af' }}>{v}</span>
                    </div>
                  ) : Array.isArray(v) ? (
                    <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
                      {(v as any[]).slice(0,3).map((item:any,i:number) => (
                        <span key={i} style={{ background:'#eef1f7', color:'#1c2b4a', fontSize:11, padding:'2px 8px', borderRadius:20 }}>{typeof item==='string'?item:item.title||`Item ${i+1}`}</span>
                      ))}
                      {v.length > 3 && <span style={{ background:'#eef1f7', color:'#1c2b4a', fontSize:11, padding:'2px 8px', borderRadius:20 }}>+{v.length-3}</span>}
                    </div>
                  ) : (
                    <span style={{ fontSize:13, color: typeof v==='string'&&v.length>60?'#6b7280':'#1a1d23', lineHeight:1.5, maxWidth:600 }}>
                      {typeof v === 'string' ? v : JSON.stringify(v)}
                    </span>
                  )}
                </div>
                {isNestedObj && (
                  <div style={{ marginLeft:130, display:'flex', flexWrap:'wrap', gap:6 }}>
                    {Object.entries(v as Record<string,any>).map(([nk, nv]) => (
                      <div key={nk} style={{ display:'flex', alignItems:'center', gap:4, background:'#f9fafb', padding:'3px 8px', borderRadius:6, border:'1px solid #e2e5ea' }}>
                        <span style={{ fontSize:10, fontWeight:600, color:'#9ca3af' }}>{fmtKey(nk)}:</span>
                        {isImageKey(nk) && typeof nv === 'string' ? (
                          <img src={resolveMediaUrl(nv)} alt={nk} style={{ width:24, height:18, objectFit:'cover', borderRadius:2 }} />
                        ) : (
                          <span style={{ fontSize:11, color:'#1a1d23' }}>{typeof nv === 'string' ? (nv.length > 30 ? nv.slice(0,30)+'…' : nv) : JSON.stringify(nv)}</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      );
    }
    return <pre style={{ fontSize:12, color:'#6b7280', background:'#f4f5f7', padding:10, borderRadius:6 }}>{JSON.stringify(content, null, 2)}</pre>;
  };

  const renderWhatsApp = (content: Record<string,unknown>, onChange: (v: Record<string,unknown>) => void) => (
    <div style={{ border:'1px solid #bbf7d0', background:'#f0fdf4', borderRadius:8, padding:18, marginBottom:16 }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
        <div style={{ width:12, height:12, borderRadius:'50%', background:'#16a34a' }} />
        <span style={{ fontSize:15, fontWeight:600, color:'#1a1d23' }}>WhatsApp button</span>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
        <div>
          <label style={{ display:'block', fontSize:13, fontWeight:700, color:'#9ca3af', textTransform:'uppercase', letterSpacing:'.5px', marginBottom:6 }}>WhatsApp number</label>
          <input type="text" inputMode="numeric" placeholder="9198XXXXXXXX" value={String(content?.whatsapp_number??'')}
            onChange={e => onChange({...content, whatsapp_number: e.target.value})}
            style={{ width:'100%', fontFamily:'inherit', fontSize:15, color:'#1a1d23', background:'#fff', border:'1px solid #e2e5ea', borderRadius:6, padding:'9px 13px', outline:'none' }} />
          <p style={{ fontSize:13, color:'#6b7280', marginTop:5 }}>Country code + digits, no spaces. Leave blank to hide icon.</p>
        </div>
        <div>
          <label style={{ display:'block', fontSize:13, fontWeight:700, color:'#9ca3af', textTransform:'uppercase', letterSpacing:'.5px', marginBottom:6 }}>Default message</label>
          <input type="text" placeholder="Hi Cottonunique!…" value={String(content?.whatsapp_message??'')}
            onChange={e => onChange({...content, whatsapp_message: e.target.value})}
            style={{ width:'100%', fontFamily:'inherit', fontSize:15, color:'#1a1d23', background:'#fff', border:'1px solid #e2e5ea', borderRadius:6, padding:'9px 13px', outline:'none' }} />
        </div>
      </div>
    </div>
  );

  // ── Shared button styles ────────────────────────────────────────────
  const btnBase: React.CSSProperties = { display:'inline-flex', alignItems:'center', gap:6, fontFamily:'inherit', fontSize:15, fontWeight:500, padding:'9px 16px', borderRadius:6, cursor:'pointer', border:'none', lineHeight:1, transition:'all .15s' };
  const btnGhost: React.CSSProperties = { ...btnBase, background:'transparent', border:'1px solid #e2e5ea', color:'#6b7280' };
  const btnDark: React.CSSProperties  = { ...btnBase, background:'#1c2b4a', color:'#fff' };
  const btnGreen: React.CSSProperties = { ...btnBase, background:'#16a34a', color:'#fff' };
  const btnRed: React.CSSProperties   = { ...btnBase, background:'transparent', border:'1px solid #e2e5ea', color:'#dc2626' };

  if (loading) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:240 }}>
      <div style={{ width:44, height:44, border:'4px solid #e2e5ea', borderTopColor:'#1c2b4a', borderRadius:'50%', animation:'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  return (
    <div style={{ fontFamily:"'DM Sans', system-ui, sans-serif", color:'#1a1d23', maxWidth:'1400px', margin:'0 auto', padding:'0 24px' }}>

      {/* Page header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:16, marginBottom:36 }}>
        <div>
          <h1 style={{ fontSize:32, fontWeight:700, color:'#1a1d23', margin:0, letterSpacing:'-.2px' }}>Content Management</h1>
          <p style={{ fontSize:16, color:'#6b7280', marginTop:6 }}>Manage and edit all website content sections from one place.</p>
        </div>
        <button style={btnDark} onClick={() => setDashboardPreviewHash('')}>
          <ExternalLink size={16} /> Preview on Dashboard
        </button>
      </div>

      {/* Dashboard preview modal */}
      {dashboardPreviewHash !== null && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.55)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:50, padding:20 }}>
          <div style={{ background:'#fff', borderRadius:12, boxShadow:'0 8px 40px rgba(0,0,0,.18)', width:'100%', maxWidth:1200, display:'flex', flexDirection:'column', maxHeight:'90vh' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'16px 24px', borderBottom:'1px solid #e2e5ea' }}>
              <span style={{ fontSize:17, fontWeight:600 }}>Dashboard preview</span>
              <button onClick={() => setDashboardPreviewHash(null)} style={{ background:'none', border:'none', cursor:'pointer', color:'#6b7280' }}><X size={22}/></button>
            </div>
            <div style={{ flex:1, minHeight:0, padding:20 }}>
              <iframe title="Dashboard preview"
                src={`${window.location.origin}/${dashboardPreviewHash ? `#${dashboardPreviewHash}` : ''}`}
                style={{ width:'100%', height:'100%', minHeight:'70vh', borderRadius:8, border:'1px solid #e2e5ea' }} />
            </div>
          </div>
        </div>
      )}

      {/* Section cards */}
      <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
        {sections.map(section => {
          const isEditing = editingSection === section.id;
          return (
            <div key={section.id} style={{ background:'#fff', border:'1px solid #e2e5ea', borderRadius:12, boxShadow:'0 1px 3px rgba(0,0,0,.06)', overflow:'hidden' }}>

              {/* Card header */}
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'18px 24px', borderBottom:'1px solid #e2e5ea', background:'#fafbfc', gap:16, flexWrap:'wrap' }}>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:17, fontWeight:600, color:'#1a1d23' }}>{section.title}</div>
                  <div style={{ fontSize:14, color:'#9ca3af', marginTop:3 }}>
                    Section: <strong>{section.section_key}</strong> · Last updated: {new Date(section.updated_at).toLocaleDateString()}
                  </div>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:10, flexShrink:0 }}>
                  <span style={{ background: section.is_active ? '#d1fae5' : '#fee2e2', color: section.is_active ? '#065f46' : '#991b1b', fontSize:12, fontWeight:600, padding:'4px 12px', borderRadius:20, letterSpacing:'.3px' }}>
                    {section.is_active ? 'Active' : 'Inactive'}
                  </span>
                  <button style={btnGhost} onClick={() => setDashboardPreviewHash(section.section_key.startsWith('about') ? 'about' : '')}>
                    <Eye size={15}/> Preview
                  </button>
                  {isEditing ? (
                    <>
                      <button style={{ ...btnGreen, opacity: saving ? 0.7 : 1 }} onClick={() => saveSection(section.id)} disabled={saving}>
                        <Check size={15}/> {saving ? 'Saving…' : 'Save'}
                      </button>
                      <button style={btnRed} onClick={cancelEditing}>
                        <X size={15}/> Cancel
                      </button>
                    </>
                  ) : (
                    <button style={btnDark} onClick={() => startEditing(section)}>
                      <Edit2 size={15}/> Edit
                    </button>
                  )}
                </div>
              </div>

              {/* Card body */}
              <div style={{ padding:'22px 24px' }}>
                {isEditing ? (
                  <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
                    {/* Title field */}
                    <div>
                      <label style={{ display:'block', fontSize:13, fontWeight:700, color:'#9ca3af', textTransform:'uppercase', letterSpacing:'.5px', marginBottom:6 }}>Title</label>
                      <input type="text" value={editData.title} onChange={e => setEditData({...editData, title: e.target.value})}
                        style={{ width:'100%', fontFamily:'inherit', fontSize:16, color:'#1a1d23', background:'#f9fafb', border:'1px solid #e2e5ea', borderRadius:6, padding:'10px 14px', outline:'none' }} />
                    </div>
                    <hr style={{ border:'none', borderTop:'1px dashed #e2e5ea', margin:'4px 0' }} />
                    <div style={{ fontSize:13, fontWeight:700, color:'#9ca3af', textTransform:'uppercase', letterSpacing:'.8px' }}>Content</div>
                    {/* WhatsApp special case */}
                    {section.section_key === 'contact' && editData?.content && typeof editData.content === 'object' && !Array.isArray(editData.content) && (
                      renderWhatsApp(editData.content, next => setEditData({...editData, content: next}))
                    )}
                    {renderEditor(editData.content, nc => setEditData({...editData, content: nc}))}
                    <hr style={{ border:'none', borderTop:'1px dashed #e2e5ea', margin:'4px 0' }} />
                    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                      <input type="checkbox" id={`active-${section.id}`} checked={editData.is_active}
                        onChange={e => setEditData({...editData, is_active: e.target.checked})}
                        style={{ width:17, height:17, accentColor:'#1c2b4a', cursor:'pointer' }} />
                      <label htmlFor={`active-${section.id}`} style={{ fontSize:15, fontWeight:500, color:'#6b7280', cursor:'pointer' }}>
                        Mark as Active (visible on website)
                      </label>
                    </div>
                  </div>
                ) : (
                  renderPreview(section.content)
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Toast */}
      {toast && (
        <div style={{ position:'fixed', bottom:32, right:32, background:'#1c2b4a', color:'#fff', padding:'14px 24px', borderRadius:8, fontSize:15, fontWeight:500, boxShadow:'0 4px 20px rgba(0,0,0,.2)', zIndex:999 }}>
          {toast}
        </div>
      )}
    </div>
  );
}
