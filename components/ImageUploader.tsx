'use client';

import { useState, useRef } from 'react';
import { useAdminSave } from '@/hooks/useAdminSave';
import { useToast } from '@/components/Toast';

// Basic file validation since we removed lib/storage
function validateFile(file: File) {
  if (file.size > 5 * 1024 * 1024) return { valid: false, error: 'File too large (max 5MB)' };
  if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)) return { valid: false, error: 'Invalid file type' };
  return { valid: true };
}

type Bucket = 'cms-images' | 'product-images' | 'site-assets' | string;

interface ImageUploaderProps {
  bucket: Bucket;
  folder: string;
  currentUrl?: string;           // existing image URL (for replacement)
  onUpload: (url: string) => void;
  onError?: (error: string) => void;
  label?: string;
  multiple?: boolean;
  onUploadMultiple?: (urls: string[]) => void;
}

export default function ImageUploader({
  bucket,
  folder,
  currentUrl,
  onUpload,
  onError,
  label = 'Upload Image',
  multiple = false,
  onUploadMultiple,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string>(currentUrl || '');
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { uploadImage } = useAdminSave();
  const { addToast } = useToast();

  async function handleFiles(files: FileList) {
    if (!files.length) return;
    setUploading(true);

    try {
      if (multiple && onUploadMultiple) {
        const fileArray = Array.from(files);
        for (const file of fileArray) {
          const validation = validateFile(file);
          if (!validation.valid) { 
            onError?.(validation.error!); 
            addToast(validation.error!, 'error');
            setUploading(false);
            return; 
          }
        }
        
        const urls = await Promise.all(
          fileArray.map(async (f) => {
            const url = await uploadImage(f, bucket, folder);
            if (!url) throw new Error('Failed to upload one of the images');
            return url;
          })
        );
        onUploadMultiple(urls as string[]);
        addToast('Images uploaded successfully', 'success');
      } else {
        const file = files[0];
        const validation = validateFile(file);
        if (!validation.valid) { 
          onError?.(validation.error!); 
          addToast(validation.error!, 'error');
          setUploading(false);
          return; 
        }

        // Show local preview immediately for snappy UX
        setPreview(URL.createObjectURL(file));

        // Upload to Supabase Storage via our secure admin route
        const url = await uploadImage(file, bucket, folder);
        if (url) {
          setPreview(url);
          onUpload(url);
        } else {
          throw new Error('Upload failed');
        }
      }
    } catch (err: any) {
      onError?.(err.message || 'Upload failed');
      addToast(err.message || 'Upload failed', 'error');
      setPreview(currentUrl || ''); // revert preview on error
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex items-center gap-4">
      {preview && !multiple && (
        <div className="w-16 h-16 rounded-lg overflow-hidden border border-slate-200 shrink-0">
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
        </div>
      )}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
      >
        {uploading ? (
          <>
            <span className="material-symbols-outlined animate-spin text-sm">autorenew</span>
            Uploading...
          </>
        ) : (
          label
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple={multiple}
        onChange={e => e.target.files && handleFiles(e.target.files)}
        style={{ display: 'none' }}
      />
    </div>
  );
}
