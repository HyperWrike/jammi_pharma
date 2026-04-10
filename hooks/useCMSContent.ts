import { useMemo, useCallback } from 'react'
import { useQuery } from 'convex/react'
import { api } from '../convex/_generated/api'

export function useCMSContent(pageName?: string) {
  // Use Convex useQuery directly to fetch data
  // Pass "skip" to useQuery if pageName is empty or disabled to avoid fetching
  const rawData = useQuery(
    api["functions/cms"].getCmsContent,
    (!pageName || pageName === '__disabled__') ? "skip" : { page: pageName }
  )

  const data = rawData === undefined ? undefined : (Array.isArray(rawData) ? rawData : [])

  const content = useMemo(() => {
    const formattedData: Record<string, any> = {}
    if (Array.isArray(data)) {
      data.forEach((item: any) => {
        if (!formattedData[item.section]) {
          formattedData[item.section] = {}
        }
        formattedData[item.section][item.content_key] = item.content_value
      })
    }
    return formattedData
  }, [data])

  const loading = data === undefined

  // Helper function to get a specific value with an optional default
  const getVal = (section: string, key: string, defaultValue = '') => {
    return content[section]?.[key] || defaultValue
  }

  // Dummy refetch for backward compatibility since Convex is real-time automatically
  const refetch = useCallback(() => {
    // No-op, Convex automatically pushes new data
  }, [])

  return { content, loading, getVal, refetch }
}
