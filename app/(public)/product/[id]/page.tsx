import React from 'react';
import ProductTemplate from './ProductTemplate';
import { Metadata, ResolvingMetadata } from 'next';
import { MOCK_PRODUCTS } from '../../../../constants';
import { convexQuery } from '../../../../lib/convexServer';

type Props = {
  params: Promise<{ id: string }>
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

async function getProduct(slug: string) {
  try {
    const product = await convexQuery("functions/products:getProductsBySlug", { slug });
    if (product) return product;

    try {
      const byId = await convexQuery("functions/products:getProduct", { id: slug });
      if (byId) return byId;
    } catch {
      // Invalid Convex id format can throw; continue with broader lookup.
    }

    const list = await convexQuery<{ data: any[] }>("functions/products:listProducts", { page: 1, limit: 1000 });
    const items = Array.isArray(list?.data) ? list.data : [];
    const normalized = slug.toLowerCase();
    const fromList = items.find((p: any) => {
      const bySlug = (p?.slug || '').toLowerCase() === normalized;
      const byCustomId = String(p?.id || '').toLowerCase() === normalized;
      const byConvexId = String(p?._id || '').toLowerCase() === normalized;
      const byNameSlug = slugify(String(p?.name || '')) === normalized;
      return bySlug || byCustomId || byConvexId || byNameSlug;
    });
    if (fromList) return fromList;
  } catch (e) {
    // Convex query failed, fall through to mock
  }

  return MOCK_PRODUCTS.find(p => p.id === slug) || null;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return {
      title: 'Product - Jammi Pharmaceuticals',
    };
  }

  return {
    title: `${product.name} - Jammi Pharmaceuticals`,
    description: product.description || product.shortDesc,
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const initialProduct = await getProduct(id);

  return <ProductTemplate productId={id} initialData={initialProduct} />;
}
