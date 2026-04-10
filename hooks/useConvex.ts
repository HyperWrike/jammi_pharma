import { useState, useEffect, useCallback } from "react";

const CONVEX_URL = "https://cheerful-rhinoceros-28.convex.cloud";

interface UseConvexQueryOptions {
  path: string;
  args?: any;
  enabled?: boolean;
}

interface UseConvexQueryResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useConvexQuery<T = any>(options: UseConvexQueryOptions): UseConvexQueryResult<T> {
  const { path, args = {}, enabled = true } = options;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [refetchKey, setRefetchKey] = useState(0);

  const refetch = useCallback(() => {
    setRefetchKey(k => k + 1);
  }, []);

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(`${CONVEX_URL}/api/query`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path, args, format: "json" }),
    })
      .then(res => res.json())
      .then(result => {
        if (!cancelled) {
          if (result.status === "error") {
            setError(new Error(result.errorMessage));
            setData(null);
          } else {
            setData(result.value);
            setError(null);
          }
          setLoading(false);
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err);
          setData(null);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [path, JSON.stringify(args), enabled, refetchKey]);

  return { data, loading, error, refetch };
}

export function useConvexMutation<T = any>(path: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(async (args?: any): Promise<T> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${CONVEX_URL}/api/mutation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path, args: args || {}, format: "json" }),
      });
      
      const result = await response.json();
      
      if (result.status === "error") {
        throw new Error(result.errorMessage);
      }
      
      return result.value;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [path]);

  return { mutate, loading, error };
}

// Products hooks
export const useProducts = (filters?: { search?: string; category?: string; status?: string; page?: number; limit?: number }) => {
  return useConvexQuery({
    path: "functions/products:listProducts",
    args: filters || {},
  });
};

export const useProduct = (id: string | null) => {
  return useConvexQuery({
    path: "functions/products:getProduct",
    args: id ? { id } : {},
    enabled: !!id,
  });
};

export const useFeaturedProducts = () => {
  return useConvexQuery({
    path: "functions/products:getFeaturedProducts",
    args: {},
  });
};

export const useCreateProduct = () => useConvexMutation("functions/products_mutations:createProduct");
export const useUpdateProduct = () => useConvexMutation("functions/products_mutations:updateProduct");
export const useDeleteProduct = () => useConvexMutation("functions/products_mutations:deleteProduct");

// Categories hooks
export const useCategories = () => {
  return useConvexQuery({
    path: "functions/categories:listCategories",
    args: {},
  });
};

export const useCreateCategory = () => useConvexMutation("functions/categories:createCategory");
export const useUpdateCategory = () => useConvexMutation("functions/categories:updateCategory");
export const useDeleteCategory = () => useConvexMutation("functions/categories:deleteCategory");

// Orders hooks
export const useOrders = (filters?: { status?: string; page?: number; limit?: number }) => {
  return useConvexQuery({
    path: "functions/orders:listOrders",
    args: filters || {},
  });
};

export const useOrder = (id: string | null) => {
  return useConvexQuery({
    path: "functions/orders:getOrder",
    args: id ? { id } : {},
    enabled: !!id,
  });
};

export const useCreateOrder = () => useConvexMutation("functions/orders:createOrder");
export const useUpdateOrderStatus = () => useConvexMutation("functions/orders:updateOrderStatus");

// Reviews hooks
export const useReviews = (filters?: { productId?: string; status?: string }) => {
  return useConvexQuery({
    path: "functions/reviews:listReviews",
    args: filters || {},
  });
};

export const useCreateReview = () => useConvexMutation("functions/reviews:createReview");
export const useUpdateReviewStatus = () => useConvexMutation("functions/reviews:updateReviewStatus");
export const useDeleteReview = () => useConvexMutation("functions/reviews:deleteReview");

// Federation Posts hooks
export const useFederationPosts = (filters?: { status?: string; page?: number; limit?: number }) => {
  return useConvexQuery({
    path: "functions/federation_posts:listFederationPosts",
    args: filters || {},
  });
};

export const useCreateFederationPost = () => useConvexMutation("functions/federation_posts:createFederationPost");
export const useUpdateFederationPost = () => useConvexMutation("functions/federation_posts:updateFederationPost");
export const useDeleteFederationPost = () => useConvexMutation("functions/federation_posts:deleteFederationPost");

// Bundles hooks
export const useBundles = (filters?: { status?: string }) => {
  return useConvexQuery({
    path: "functions/bundles:listBundles",
    args: filters || {},
  });
};

export const useBundle = (id: string | null) => {
  return useConvexQuery({
    path: "functions/bundles:getBundle",
    args: id ? { id } : {},
    enabled: !!id,
  });
};

export const useCreateBundle = () => useConvexMutation("functions/bundles:createBundle");
export const useUpdateBundle = () => useConvexMutation("functions/bundles:updateBundle");
export const useDeleteBundle = () => useConvexMutation("functions/bundles:deleteBundle");

// Coupons hooks
export const useCoupons = (filters?: { status?: string }) => {
  return useConvexQuery({
    path: "functions/coupons:listCoupons",
    args: filters || {},
  });
};

export const useCoupon = (code: string | null) => {
  return useConvexQuery({
    path: "functions/coupons:getCoupon",
    args: code ? { code } : {},
    enabled: !!code,
  });
};

export const useCreateCoupon = () => useConvexMutation("functions/coupons:createCoupon");
export const useUpdateCoupon = () => useConvexMutation("functions/coupons:updateCoupon");
export const useDeleteCoupon = () => useConvexMutation("functions/coupons:deleteCoupon");

// CMS hooks
export const useBanners = (filters?: { status?: string }) => {
  return useConvexQuery({
    path: "functions/cms:listBanners",
    args: filters || {},
  });
};

export const useCreateBanner = () => useConvexMutation("functions/cms:createBanner");
export const useUpdateBanner = () => useConvexMutation("functions/cms:updateBanner");
export const useDeleteBanner = () => useConvexMutation("functions/cms:deleteBanner");

export const useBlogs = (filters?: { status?: string }) => {
  return useConvexQuery({
    path: "functions/cms:listBlogs",
    args: filters || {},
  });
};

export const useBlog = (slug: string | null) => {
  return useConvexQuery({
    path: "functions/cms:getBlog",
    args: slug ? { slug } : {},
    enabled: !!slug,
  });
};

export const useCreateBlog = () => useConvexMutation("functions/cms:createBlog");
export const useUpdateBlog = () => useConvexMutation("functions/cms:updateBlog");
export const useDeleteBlog = () => useConvexMutation("functions/cms:deleteBlog");

export const useCmsContent = (filters?: { page?: string; section?: string }) => {
  return useConvexQuery({
    path: "functions/cms:getCmsContent",
    args: filters || {},
  });
};

export const useSetCmsContent = () => useConvexMutation("functions/cms:setCmsContent");

export const useAnnouncement = () => {
  return useConvexQuery({
    path: "functions/cms:getAnnouncement",
    args: {},
  });
};

export const useUpdateAnnouncement = () => useConvexMutation("functions/cms:updateAnnouncement");
