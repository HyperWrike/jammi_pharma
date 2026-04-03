import { useMemo } from 'react'
import { useQuery } from 'convex/react'
import { api } from '../convex/_generated/api'

export function useCMSContent(pageName: string) {
  const data = useQuery(api["functions/cms"].getCmsContent, { page: pageName })

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

  return { content, loading, getVal, refetch: async () => {} }
}
