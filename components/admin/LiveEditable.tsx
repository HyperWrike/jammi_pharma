"use client";
import React, { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAdmin } from './AdminContext';
import { useAdminSave } from '../../hooks/useAdminSave';
import { useCMSContent } from '../../hooks/useCMSContent';

interface LiveEditableProps {
  // CMS Mode
  page?: string;
  section?: string;
  contentKey?: string;
  initialContent?: string;
  
  // Legacy object prop
  cmsKey?: { page: string; section: string; content_key: string };
  
  // Legacy DB Mode
  collection?: string;
  docId?: string;
  field?: string;
  children?: React.ReactNode;
  
  // Optional for select
  options?: Array<{label: string, value: string}>;
  
  // Shared
  type?: 'text' | 'textarea' | 'image' | 'html' | 'select' | 'number';
  inputType?: 'text' | 'textarea' | 'image' | 'html' | 'select' | 'number';
  className?: string;
  multiline?: boolean;
}

export default function LiveEditable({
  page: propPage,
  section: propSection,
  contentKey: propContentKey,
  initialContent,
  cmsKey,
  collection,
  docId,
  field,
  children,
  options,
  type,
  inputType,
  className = '',
  multiline = false
}: LiveEditableProps) {
  const nodeToText = (node: React.ReactNode): string => {
    if (node === null || node === undefined || typeof node === 'boolean') return '';
    if (typeof node === 'string' || typeof node === 'number') return String(node);
    if (Array.isArray(node)) return node.map(nodeToText).join('');
    if (React.isValidElement(node)) {
      if (node.type === 'br') return '\n';
      const props = node.props as { children?: React.ReactNode };
      return nodeToText(props?.children);
    }
    return '';
  };

  const { isEditMode } = useAdmin();
  const pathname = usePathname();
  const { saveCMSContent, uploadImage, saveRow } = useAdminSave();
  
  const page = cmsKey?.page || propPage;
  const section = cmsKey?.section || propSection;
  const contentKey = cmsKey?.content_key || propContentKey;
  const cmsPageName = page || (collection === 'content' ? docId : undefined);
  const { content: cmsContent, refetch } = useCMSContent(cmsPageName || '__disabled__');
  const isShopRoute = pathname === '/shop' || pathname?.startsWith('/shop/');
  const canEdit = isEditMode && !isShopRoute;

  
  const effectiveType = type || inputType || 'text';
  const savedCmsValue = (() => {
    if (cmsKey && page && section && contentKey) {
      return cmsContent?.[section]?.[contentKey];
    }

    if (collection === 'content' && docId && field) {
      return cmsContent?.content?.[field] ?? cmsContent?.[field];
    }

    return undefined;
  })();

  const effectiveContent = savedCmsValue !== undefined && savedCmsValue !== null
    ? String(savedCmsValue)
    : initialContent !== undefined
      ? initialContent
      : nodeToText(children);
  
  const [content, setContent] = useState(effectiveContent);
  const [isHovered, setIsHovered] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [originalContent, setOriginalContent] = useState(effectiveContent);
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    setContent(effectiveContent);
    setOriginalContent(effectiveContent);
  }, [effectiveContent]);

  useEffect(() => {
    if (!canEdit) return;
    if (effectiveType === 'image' || effectiveType === 'select') return;
    if (content === originalContent) return;

    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }

    autoSaveTimeoutRef.current = setTimeout(() => {
      void handleSave(content);
    }, 700);

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [canEdit, content, originalContent, effectiveType]);

  const handleSave = async (newValue: string) => {
    if (newValue === originalContent) return;
    
    let success = false;
    
    if (collection === 'content' && docId && field) {
      success = await saveCMSContent({
        page: docId,
        section: 'content',
        content_key: field,
        content_value: newValue,
        content_type: effectiveType === 'number' ? 'text' : effectiveType
      });
    } else if (collection && docId && field) {
      // Legacy DB Mode
      const payload: any = { id: docId };
      payload[field] = effectiveType === 'number' ? Number(newValue) : newValue;
      const res = await saveRow(collection, payload, 'id');
      success = res !== null;
    } else if (page && section && contentKey) {
      // CMS Content Mode
      success = await saveCMSContent({
        page,
        section,
        content_key: contentKey,
        content_value: newValue,
        content_type: effectiveType === 'number' ? 'text' : effectiveType
      });
    }

    if (success) {
      setOriginalContent(newValue);
      setContent(newValue);
      // Convex automatically invalidates cache, refetch is now optional
      refetch();
      window.dispatchEvent(new CustomEvent('jammi_toast', {
        detail: { message: `Updated ${field || contentKey} successfully`, type: 'success' }
      }));
    } else {
      setContent(originalContent);
      window.dispatchEvent(new CustomEvent('jammi_toast', {
        detail: { message: 'Failed to save content', type: 'error' }
      }));
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const bucket = collection === 'products' ? 'product-images' : 'cms-images';
    const folder = collection === 'products' ? 'products' : (page || 'general');
    
    const url = await uploadImage(file, bucket, folder);
    
    if (url) {
      handleSave(url);
    } else {
       window.dispatchEvent(new CustomEvent('jammi_toast', {
          detail: { message: 'Image upload failed', type: 'error' }
        }));
    }
    setIsUploading(false);
  };

  if (!canEdit) {
    if (effectiveType === 'image') return <img src={effectiveContent} alt={contentKey || field} className={className} />;
    if (effectiveType === 'html') return <div className={className} dangerouslySetInnerHTML={{ __html: effectiveContent }} />;
    return <span className={className}>{effectiveContent || (children !== undefined ? children : '')}</span>;
  }

  if (effectiveType === 'image') {
    return (
      <div 
        className={`relative inline-block cursor-pointer outline-2 outline-dashed outline-[#22c55e] outline-offset-2 transition-all duration-200 ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => fileInputRef.current?.click()}
      >
        <img src={content} alt={contentKey || field} className={`w-full h-full object-cover transition-opacity ${isUploading ? 'opacity-50' : ''}`} />
        {isHovered && !isUploading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm z-10 transition-opacity">
            <span className="text-white text-sm font-bold tracking-wider flex items-center gap-2">
              <span className="material-symbols-outlined">upload</span>
              CHANGE IMAGE
            </span>
          </div>
        )}
        {isUploading && (
           <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
             <span className="material-symbols-outlined text-white text-3xl animate-spin">sync</span>
           </div>
        )}
        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
        <div className="absolute -top-7 left-0 bg-[#22c55e] text-black text-[10px] font-bold px-2 py-1 uppercase tracking-wider z-20 whitespace-nowrap opacity-80 rounded-sm">
          {section || collection} : {contentKey || field}
        </div>
      </div>
    );
  }

  if (effectiveType === 'select' && options) {
    return (
      <select
        value={content}
        onChange={(e) => handleSave(e.target.value)}
        className={`bg-[#22c55e]/10 border-b-2 border-dashed border-[#22c55e] focus:outline-none focus:bg-[#22c55e]/20 text-inherit ${className}`}
      >
        {options.map(opt => <option key={opt.value} value={opt.value} className="text-black">{opt.label}</option>)}
      </select>
    );
  }

  const InputComponent = multiline || effectiveType === 'textarea' || effectiveType === 'html' ? 'textarea' : 'input';

  if (multiline || effectiveType === 'textarea') {
    return (
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onBlur={() => handleSave(content)}
        title={`Editing: ${page || collection} -> ${section || 'doc'} -> ${contentKey || field}`}
        className={`w-full bg-transparent outline-none border-b-2 border-dashed border-[#22c55e]/50 focus:border-[#22c55e] focus:bg-[#22c55e]/10 transition-colors ${className}`}
        style={{ resize: 'vertical' }}
        rows={4}
      />
    );
  }

  return (
    <span className={`relative inline-block ${className}`}>
      <InputComponent
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onBlur={() => handleSave(content)}
        type={effectiveType === 'number' ? 'number' : 'text'}
        title={`Editing: ${page || collection} -> ${section || 'doc'} -> ${contentKey || field}`}
        className={`w-full bg-transparent outline-none border-b-2 border-dashed border-[#22c55e]/50 focus:border-[#22c55e] focus:bg-[#22c55e]/10 transition-colors ${className}`}
        style={{ resize: 'none' }}
      />
    </span>
  );
}
