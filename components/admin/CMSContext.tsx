"use client";
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { convexQuery } from '../../lib/convexServer';

const CMSContext = createContext<any>(null);

export function CMSProvider({ page, children }: { page: string; children: React.ReactNode }) {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchContent = useCallback(async () => {
    try {
      const data = await convexQuery('functions/cms:getCmsContent', { page });

      if (data && Array.isArray(data)) {
        const structured: Record<string, Record<string, string>> = {};
        data.forEach((row: any) => {
          if (!structured[row.section]) structured[row.section] = {};
          structured[row.section][row.content_key] = row.content_value;
        });
        setContent(structured);
      }
    } catch (err) {
      console.error('CMS fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [page]);

  const updateLocal = useCallback((section: string, contentKey: string, value: string) => {
    setContent((prev: Record<string, Record<string, string>>) => {
      const updated = { ...prev };
      if (!updated[section]) updated[section] = {};
      updated[section][contentKey] = value;
      return updated;
    });
  }, []);

  const getValue = useCallback((section: string, contentKey: string, fallback: string = ''): string => {
    return content?.[section]?.[contentKey] || fallback;
  }, [content]);

  useEffect(() => {
    fetchContent();

    // Note: Real-time updates removed. Convex supports real-time subscriptions
    // through the Convex React client, which can be added if needed.
    // For now, content will be fetched once on mount.
  }, [fetchContent]);

  return (
    <CMSContext.Provider value={{ content, loading, getValue, updateLocal, refetch: fetchContent }}>
      {children}
    </CMSContext.Provider>
  );
}

export function useCMSContext() {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMSContext must be used within a CMSProvider');
  }
  return context;
}

export function useCMSValue(page: string, section: string, contentKey: string, fallback: string = '') {
  const [value, setValue] = useState(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchValue = async () => {
      try {
        const data = await convexQuery('functions/cms:getCmsContent', { page, section });

        if (data && Array.isArray(data)) {
          const item = data.find((row: any) => row.content_key === contentKey);
          setValue(item?.content_value || fallback);
        } else {
          setValue(fallback);
        }
      } catch {
        setValue(fallback);
      } finally {
        setLoading(false);
      }
    };

    fetchValue();

    // Note: Real-time updates removed. Convex supports real-time subscriptions
    // through the Convex React client, which can be added if needed.
  }, [page, section, contentKey, fallback]);

  return { value, loading };
}
