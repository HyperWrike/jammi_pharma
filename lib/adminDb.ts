import set from 'lodash/set';

const CONVEX_URL = "https://cheerful-rhinoceros-28.convex.cloud";

async function convexQuery(path: string, args?: any) {
  const response = await fetch(`${CONVEX_URL}/api/query`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path, args: args || {}, format: "json" }),
  });
  const result = await response.json();
  if (result.status === "error") throw new Error(result.errorMessage);
  return result.value;
}

async function convexMutation(path: string, args?: any) {
  const response = await fetch(`${CONVEX_URL}/api/mutation`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path, args: args || {}, format: "json" }),
  });
  const result = await response.json();
  if (result.status === "error") throw new Error(result.errorMessage);
  return result.value;
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
        data = await convexQuery("functions/cms.js:getCmsContent", {});
      } else if (collectionName === "categories") {
        data = await convexQuery("functions/categories.js:listCategories", {});
      } else if (collectionName === "products") {
        data = await convexQuery("functions/products.js:listProducts", {});
        data = data?.data || data;
      } else if (collectionName === "orders") {
        data = await convexQuery("functions/orders.js:listOrders", {});
        data = data?.data || data;
      } else {
        data = await convexQuery("functions/products.js:listProducts", {});
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
        const data = await convexQuery("functions/cms.js:getCmsContent", { page: id });
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
      return await convexQuery("functions/cms.js:getCmsContent", {});
    } else if (collectionName === "categories") {
      return await convexQuery("functions/categories.js:listCategories", {});
    } else if (collectionName === "products") {
      const result = await convexQuery("functions/products.js:listProducts", {});
      return result?.data || result || [];
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
      const data = await convexQuery("functions/cms.js:getCmsContent", { page: id });
      if (data && Array.isArray(data)) {
        const doc: any = {};
        data.forEach((item: any) => {
          doc[item.content_key] = item.content_value;
        });
        return doc;
      }
    }
    return null;
  } catch (err) {
    console.error(`fetchDocument error for ${collectionName}/${id}:`, err);
    return null;
  }
};

export const createDocument = async (collectionName: string, data: any) => {
  if (collectionName === "content") {
    return await convexMutation("functions/cms.js:setCmsContent", data);
  }
  throw new Error(`createDocument not supported for ${collectionName}`);
};

export const updateDocument = async (collectionName: string, id: string, data: any) => {
  if (collectionName === "content") {
    // CMS content - save each field as a separate content entry
    for (const [key, value] of Object.entries(data)) {
      await convexMutation("functions/cms.js:setCmsContent", {
        page: id,
        section: "content",
        content_key: key,
        content_value: value as string,
      });
    }
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
