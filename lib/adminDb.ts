import set from 'lodash/set';

const CONVEX_URL = "https://cheerful-rhinoceros-28.convex.cloud";

export async function convexQuery(path: string, args?: any) {
  const response = await fetch(`${CONVEX_URL}/api/query`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path, args: args || {}, format: "json" }),
  });
  const result = await response.json();
  if (result.status === "error") throw new Error(result.errorMessage);
  return result.value;
}

export async function convexMutation(path: string, args?: any) {
  const response = await fetch(`${CONVEX_URL}/api/mutation`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path, args: args || {}, format: "json" }),
  });
  const result = await response.json();
  if (result.status === "error") throw new Error(result.errorMessage);
  return result.value;
}

function normalizeProductRecord(product: any) {
  if (!product) return null;

  const ingredients = Array.isArray(product.ingredients)
    ? product.ingredients.join('\n')
    : (product.ingredients || '');
  const indications = Array.isArray(product.benefits)
    ? product.benefits.join('\n')
    : (product.indications || '');
  const dosage = product.dosage || product.usage_instructions || '';

  return {
    _id: String(product._id || product.id || ''),
    id: String(product._id || product.id || ''),
    name: product.name || '',
    label: product.short_description || product.category_name || product.category || 'Wellness',
    shortDesc: product.description || product.short_description || 'Traditional formulation.',
    price: typeof product.price === 'number' ? product.price : Number(product.price || 0),
    image: product.images?.[0] || product.image || '/images/placeholder.png',
    category: product.category_name || product.category || 'Wellness',
    features: product.features || [],
    botanicals: product.botanicals || [],
    ritual: product.ritual || [],
    stockStatus: product.status === 'published' || product.status === 'active' ? 'In Stock' : (product.status || 'In Stock'),
    description: product.description || product.short_description || '',
    ingredients,
    indications,
    dosage,
    slug: product.slug || '',
    status: product.status || 'published',
  };
}

async function fetchProductRecord(id: string) {
  try {
    const bySlug = await convexQuery('functions/products:getProductsBySlug', { slug: id });
    if (bySlug) return bySlug;
  } catch {}

  try {
    const byId = await convexQuery('functions/products:getProduct', { id });
    if (byId) return byId;
  } catch {}

  try {
    const list = await convexQuery('functions/products:listProducts', { page: 1, limit: 1000 });
    const items = Array.isArray(list?.data) ? list.data : [];
    const normalized = String(id || '').toLowerCase();
    return items.find((item: any) => {
      const slug = String(item?.slug || '').toLowerCase();
      const itemId = String(item?._id || item?.id || '').toLowerCase();
      const name = String(item?.name || '').toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
      return slug === normalized || itemId === normalized || name === normalized;
    }) || null;
  } catch {
    return null;
  }
}

// Map collection names to Convex function prefixes
const collectionMap: Record<string, string> = {
  content: "functions/cms.js",
  products: "functions/products.js",
  categories: "functions/categories.js",
  orders: "functions/orders.js",
  reviews: "functions/reviews.js",
  bundles: "functions/bundles.js",
  coupons: "functions/coupons.js",
  federation_posts: "functions/federation_posts.js",
  doctor_profiles: "functions/doctor_profiles.js",
  cms_banners: "functions/cms.js",
  cms_blogs: "functions/cms.js",
};

// Generic real-time subscription helper (polling-based for Convex)
export const subscribeToCollection = (
    collectionName: string, 
    callback: (data: any[]) => void
) => {
  let cancelled = false;
  const pollInterval = 3000;

  const poll = async () => {
    if (cancelled) return;
    try {
      const prefix = collectionMap[collectionName] || "functions/products.js";
      const listFn = `${prefix}:listProducts`;
      let data;
      if (collectionName === "content") {
        data = await convexQuery("functions/cms:getCmsContent", {});
      } else if (collectionName === "categories") {
        data = await convexQuery("functions/categories:listCategories", {});
      } else if (collectionName === "products") {
        data = await convexQuery("functions/products:listProducts", {});
        data = data?.data || data;
      } else if (collectionName === "orders") {
        data = await convexQuery("functions/orders:listOrders", {});
        data = data?.data || data;
      } else {
        data = await convexQuery("functions/products:listProducts", {});
        data = data?.data || data;
      }
      if (!cancelled && data) callback(Array.isArray(data) ? data : []);
    } catch (e) {
      console.warn(`subscribeToCollection error for ${collectionName}:`, e);
    }
    setTimeout(poll, pollInterval);
  };

  poll();
  return () => { cancelled = true; };
};

// Generic real-time document subscription helper
export const subscribeToDocument = (
    collectionName: string, 
    id: string,
    callback: (data: any) => void
) => {
  let cancelled = false;
  const pollInterval = 2000;

  const poll = async () => {
    if (cancelled) return;
    try {
      if (collectionName === "content") {
        // CMS content - fetch by page/section
        const data = await convexQuery("functions/cms:getCmsContent", { page: id });
        if (!cancelled) {
          if (data && Array.isArray(data)) {
            const doc: any = {};
            data.forEach((item: any) => {
              doc[item.content_key] = item.content_value;
            });
            callback(doc);
          } else {
            callback(null);
          }
        }
      } else if (collectionName === "products") {
        const product = await fetchProductRecord(id);
        if (!cancelled) {
          callback(normalizeProductRecord(product));
        }
      } else {
        callback(null);
      }
    } catch (e) {
      console.warn(`subscribeToDocument error for ${collectionName}/${id}:`, e);
    }
    setTimeout(poll, pollInterval);
  };

  poll();
  return () => { cancelled = true; };
};

// Generic CRUD helpers
export const fetchCollection = async (collectionName: string) => {
  try {
    if (collectionName === "content") {
      return await convexQuery("functions/cms:getCmsContent", {});
    } else if (collectionName === "categories") {
      return await convexQuery("functions/categories:listCategories", {});
    } else if (collectionName === "products") {
      const result = await convexQuery("functions/products:listProducts", {});
      return result?.data || result || [];
    } else if (collectionName === "blogs") {
      const result = await convexQuery("functions/cms:listBlogs", { status: "published" });
      return Array.isArray(result) ? result : (result?.data || []);
    }
    return [];
  } catch (err) {
    console.warn(`fetchCollection error for ${collectionName}:`, err);
    return [];
  }
};

export const fetchDocument = async (collectionName: string, id: string) => {
  try {
    if (collectionName === "content") {
      const data = await convexQuery("functions/cms:getCmsContent", { page: id });
      if (data && Array.isArray(data)) {
        const doc: any = {};
        data.forEach((item: any) => {
          doc[item.content_key] = item.content_value;
        });
        return doc;
      }
    } else if (collectionName === "products") {
      const product = await fetchProductRecord(id);
      return normalizeProductRecord(product);
    }
    return null;
  } catch (err) {
    console.error(`fetchDocument error for ${collectionName}/${id}:`, err);
    return null;
  }
};

export const createDocument = async (collectionName: string, data: any) => {
  if (collectionName === "content") {
    return await convexMutation("functions/cms:setCmsContent", data);
  }
  throw new Error(`createDocument not supported for ${collectionName}`);
};

export const updateDocument = async (collectionName: string, id: string, data: any) => {
  if (collectionName === "content") {
    // CMS content - save each field as a separate content entry
    for (const [key, value] of Object.entries(data)) {
      await convexMutation("functions/cms:setCmsContent", {
        page: id,
        section: "content",
        content_key: key,
        content_value: value as string,
      });
    }
    return;
  }
  if (collectionName === 'products') {
    const payload: any = { ...data };

    if (Array.isArray(payload.ingredients)) {
      payload.ingredients = payload.ingredients
        .map((line: unknown) => String(line).trim())
        .filter(Boolean)
        .join('\n');
    }

    if (typeof payload.dosage === 'string' && !payload.usage_instructions) {
      payload.usage_instructions = payload.dosage;
    }

    if (typeof payload.indications === 'string' && !Array.isArray(payload.benefits)) {
      payload.benefits = payload.indications
        .split(/\r?\n+/)
        .map((line: string) => line.trim())
        .filter(Boolean);
    }

    delete payload.indications;
    delete payload.dosage;

    await convexMutation("functions/products_mutations:updateProduct", { id, ...payload });
    return;
  }
  throw new Error(`updateDocument not supported for ${collectionName}`);
};

export const deleteDocument = async (collectionName: string, id: string) => {
  throw new Error(`deleteDocument not supported for ${collectionName}`);
};

export const getNextOrderNumber = async () => {
  return `Jammi-${Date.now().toString().slice(-6)}`;
};

export const runTransaction = async (updateFunction: (transaction: any) => Promise<any>) => {
  throw new Error("runTransaction is not directly supported in Convex. Use mutations instead.");
};
