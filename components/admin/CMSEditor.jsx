import { useState, useEffect } from 'react'
import { cmsApi } from '../../lib/adminApi'
import { useToast } from './Toast'
import ImageUploader from './ImageUploader'

export default function CMSEditor({ page, section, fields, onSaved }) {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const { addToast } = useToast()

  useEffect(() => {
    cmsApi.getContent(page).then(res => {
      const pageData = {}
      res.filter(r => r.section === section).forEach(r => {
        pageData[r.content_key] = r.content_type === 'boolean' ? r.content_value === 'true' : r.content_value
      })
      setData(pageData)
      setLoading(false)
    })
  }, [page, section])

  const handleSave = async () => {
    try {
      const updates = fields.map(f => ({
        page, section, content_key: f.key,
        content_value: String(data[f.key] || ''),
        content_type: f.type
      }))
      await cmsApi.saveContent(updates)
      addToast('Changes saved!')
      if (onSaved) onSaved()
    } catch (e) {
      addToast('Error saving: ' + e.message, 'error')
    }
  }

  if (loading) return <div style={{ color: 'var(--text-muted)' }}>Loading CMS...</div>

  return (
    <div className="admin-card">
      <h3 style={{ marginTop: 0, marginBottom: '24px', color: 'var(--accent-emerald)' }}>Editing {page} / {section}</h3>
      {fields.map(f => (
        <div key={f.key} style={{ marginBottom: '16px' }}>
          {f.type !== 'image' && <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>{f.label}</label>}
          {f.type === 'text' || f.type === 'url' ? (
            <input 
              type="text" 
              value={data[f.key] || ''} 
              onChange={e => setData({...data, [f.key]: e.target.value})}
              style={{ width: '100%', padding: '12px', background: 'var(--bg-primary)', border: '1px solid var(--border)', color: 'var(--text-primary)', borderRadius: '8px', boxSizing: 'border-box' }}
            />
          ) : f.type === 'textarea' ? (
            <textarea 
              value={data[f.key] || ''} 
              onChange={e => setData({...data, [f.key]: e.target.value})}
              style={{ width: '100%', padding: '12px', background: 'var(--bg-primary)', border: '1px solid var(--border)', color: 'var(--text-primary)', borderRadius: '8px', minHeight: '100px', boxSizing: 'border-box' }}
            />
          ) : f.type === 'image' ? (
            <ImageUploader 
              label={f.label}
              currentImage={data[f.key]}
              onUpload={(url) => setData({...data, [f.key]: url})}
            />
          ) : f.type === 'boolean' ? (
            <input 
              type="checkbox" 
              checked={data[f.key] || false}
              onChange={e => setData({...data, [f.key]: e.target.checked})}
            />
          ) : null}
        </div>
      ))}
      <button 
        onClick={handleSave}
        style={{ background: 'var(--accent-emerald)', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, marginTop: '16px' }}
      >
        Save Changes
      </button>
    </div>
  )
}
