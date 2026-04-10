import { useState } from 'react'
import { convexMutation } from '../lib/adminDb'

export function useAdminSave() {
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const saveCMSContent = async (updates: any) => {
    setSaving(true)
    setError(null)
    setSuccess(false)

    try {
      const updatesArray = Array.isArray(updates) ? updates : [updates]
      
      // Use Convex mutations directly instead of going through HTTP API
      for (const update of updatesArray) {
        await convexMutation("functions/cms:setCmsContent", {
          page: update.page,
          section: update.section,
          content_key: update.content_key,
          content_value: String(update.content_value),
          content_type: update.content_type
        })
      }

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
      return true
    } catch (err) {
      console.error('saveCMSContent error:', err)
      setError(err instanceof Error ? err.message : String(err))
      setTimeout(() => setError(null), 5000)
      return false
    } finally {
      setSaving(false)
    }
  }

  const saveProduct = async (productData: any, isNew = false) => {
    setSaving(true)
    setError(null)

    try {
      const id = productData._id || productData.id;
      let finalData = { ...productData };
      if (isNew || !id) {
        finalData = await convexMutation("functions/products:createProduct", productData);
      } else {
        await convexMutation("functions/products:updateProduct", { id, ...productData });
      }

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
      return finalData
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
      setTimeout(() => setError(null), 5000)
      return null
    } finally {
      setSaving(false)
    }
  }

  const uploadImage = async (file: File, bucket = 'cms-images', folder = '') => {
    setSaving(true)
    setError(null)

    try {
      const token = 'JAMMI_ADMIN_MASTER_KEY_2024'
      const formData = new FormData()
      formData.append('file', file)
      formData.append('bucket', bucket)
      formData.append('folder', folder)

      const res = await fetch('/api/admin/images/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      })

      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Image upload failed')

      return json.url
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
      setTimeout(() => setError(null), 5000)
      return null
    } finally {
      setSaving(false)
    }
  }

  const saveRow = async (table: string, data: any, idField = 'id') => {
    setSaving(true)
    setError(null)

    try {
      const id = data._id || data[idField];
      const singleNoun = table.endsWith('s') ? table.slice(0, -1) : table;
      const fnNameBase = singleNoun.charAt(0).toUpperCase() + singleNoun.slice(1);
      const fnPrefix = `functions/${table}`;

      if (id) {
         await convexMutation(`${fnPrefix}:update${fnNameBase}`, { id, ...data });
      } else {
         await convexMutation(`${fnPrefix}:create${fnNameBase}`, data);
      }

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
      setTimeout(() => setError(null), 5000)
      return null
    } finally {
      setSaving(false)
    }
  }

  return { saving, error, success, saveCMSContent, saveProduct, uploadImage, saveRow }
}
