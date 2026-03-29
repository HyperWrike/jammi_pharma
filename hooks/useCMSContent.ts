import { useState, useEffect } from 'react'
import { adminFetch } from '../lib/adminFetch'

export function useCMSContent(pageName: string) {
  const [content, setContent] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(true)

  const fetchContent = async () => {
      setLoading(true)
      try {
        const res = await adminFetch(`/api/admin/cms/content?page=${encodeURIComponent(pageName)}`)
        if (!res.ok) throw new Error('Failed to fetch content')
        const data = await res.json()
        
        // Transform array into a nested dictionary: { section: { content_key: content_value } }
        const formattedData: Record<string, any> = {}
        data.forEach((item: any) => {
          if (!formattedData[item.section]) {
            formattedData[item.section] = {}
          }
          formattedData[item.section][item.content_key] = item.content_value
        })
        
        setContent(formattedData)
      } catch (err) {
        console.error('Error fetching CMS content:', err)
      } finally {
        setLoading(false)
      }
  }

  useEffect(() => {
    fetchContent()
  }, [pageName])

  // Helper function to get a specific value with an optional default
  const getVal = (section: string, key: string, defaultValue = '') => {
    return content[section]?.[key] || defaultValue
  }

  return { content, loading, getVal, refetch: fetchContent }
}
