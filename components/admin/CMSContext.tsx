"use client";
import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabase';

const CMSContext = createContext<any>(null);

export function CMSProvider({ page, children }: { page: string; children: React.ReactNode }) {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const channelRef = useRef<any>(null);

  const fetchContent = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('cms_content')
        .select('*')
        .eq('page', page);

      if (!error && data) {
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

    const channel = supabase
      .channel(`cms:${page}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'cms_content', filter: `page=eq.${page}` }, () => {
        fetchContent();
      })
      .subscribe();

    channelRef.current = channel;

    return () => {
      if (channelRef.current) supabase.removeChannel(channelRef.current);
    };
  }, [fetchContent, page]);

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
        const { data, error } = await supabase
          .from('cms_content')
          .select('content_value')
          .eq('page', page)
          .eq('section', section)
          .eq('content_key', contentKey)
          .single();

        if (!error && data) {
          setValue(data.content_value || fallback);
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

    const channel = supabase
      .channel(`cms:${page}:${section}:${contentKey}`)
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'cms_content',
        filter: `page=eq.${page}&section=eq.${section}&content_key=eq.${contentKey}`
      }, (payload) => {
        if (payload.eventType === 'UPDATE' || payload.eventType === 'INSERT') {
          setValue(payload.new.content_value);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [page, section, contentKey, fallback]);

  return { value, loading };
}
