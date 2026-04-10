import { useState, useRef } from 'react'
import { imagesApi } from '../../lib/adminApi'

export default function ImageUploader({ bucket, folder, currentImage, onUpload, onDelete, label }) {
  const [uploading, setUploading] = useState(false)
  const fileInput = useRef(null)

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const url = await imagesApi.upload(file, bucket, folder)
      onUpload(url)
    } catch (err) {
      alert('Upload failed: ' + err.message)
    } finally {
      setUploading(false)
      if (fileInput.current) fileInput.current.value = ''
    }
  }

  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '14px' }}>{label}</label>
      
      {currentImage && (
        <div style={{ position: 'relative', display: 'inline-block', marginBottom: '8px' }}>
          <img src={currentImage} alt="Uploaded" style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border)' }} />
          {onDelete && (
            <button 
              type="button" 
              onClick={() => onDelete(currentImage)}
              style={{ position: 'absolute', top: -8, right: -8, background: '#ef4444', color: '#fff', border: 'none', borderRadius: '50%', width: 24, height: 24, cursor: 'pointer' }}
            >
              &times;
            </button>
          )}
        </div>
      )}

      <div 
        onClick={() => fileInput.current?.click()}
        style={{ 
          border: '2px dashed var(--border)', borderRadius: '8px', padding: '24px', 
          textAlign: 'center', cursor: 'pointer', background: 'var(--bg-card)',
          color: 'var(--text-muted)', fontSize: '14px', transition: 'all 0.2s',
          opacity: uploading ? 0.5 : 1
        }}
        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-emerald)'}
        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
      >
        {uploading ? 'Uploading...' : 'Click or drag image to upload'}
      </div>
      <input type="file" ref={fileInput} style={{ display: 'none' }} accept="image/*" onChange={handleFileChange} />
    </div>
  )
}
