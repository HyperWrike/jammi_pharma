/**
 * Storage utilities for image handling.
 * Currently uses URL-based approach.
 * For image upload, use the /api/admin/images/upload API route.
 */

export type Bucket =
  | 'product-images'
  | 'category-images'
  | 'review-images'
  | 'bundle-images'
  | 'site-assets'
  | 'banners'
  | 'cms-images'
  | 'reports';

/**
 * Upload a file. Returns a data URL.
 * For external storage, use the /api/admin/images/upload API route.
 */
export async function uploadFile(
  file: File | Blob,
  bucket: Bucket,
  folder: string = ''
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file as File);
  });
}

/**
 * Replace an existing file.
 */
export async function replaceFile(
  file: File,
  bucket: Bucket,
  folder: string,
  oldUrl?: string
): Promise<string> {
  return uploadFile(file, bucket, folder);
}

/**
 * Upload multiple files at once.
 */
export async function uploadMultiple(
  files: File[],
  bucket: Bucket,
  folder: string = ''
): Promise<string[]> {
  return Promise.all(files.map(file => uploadFile(file, bucket, folder)));
}

/**
 * Delete a file by its public URL. No-op for data URLs.
 */
export async function deleteFile(publicUrl: string): Promise<void> {
  // Data URLs don't need deletion
}

/**
 * Get public URL (returns the path as-is for data URLs).
 */
export function getPublicUrl(bucket: Bucket, path: string): string {
  return path;
}

/**
 * Validate file before upload.
 */
export function validateFile(
  file: File,
  options: {
    maxSizeMB?: number;
    allowedTypes?: string[];
  } = {}
): { valid: boolean; error?: string } {
  const { maxSizeMB = 10, allowedTypes = ['image/jpeg', 'image/png', 'image/webp'] } = options;

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: `File type not allowed. Use: ${allowedTypes.join(', ')}` };
  }

  if (file.size > maxSizeMB * 1024 * 1024) {
    return { valid: false, error: `File too large. Maximum size: ${maxSizeMB}MB` };
  }

  return { valid: true };
}

/**
 * Parse a storage URL to extract bucket and path components.
 */
export function parseStorageUrl(url: string): { bucket: string; path: string } | { bucket: null; path: null } {
  try {
    const match = url.match(/\/storage\/v1\/object\/public\/([^/]+)\/(.+)/);
    if (!match) return { bucket: null, path: null };
    return { bucket: match[1], path: match[2] };
  } catch {
    return { bucket: null, path: null };
  }
}
