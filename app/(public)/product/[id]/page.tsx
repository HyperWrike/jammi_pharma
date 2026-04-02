import React from 'react';
import ProductTemplate from './ProductTemplate';
import { Metadata, ResolvingMetadata } from 'next';
import { MOCK_PRODUCTS } from '../../../../constants';
import { convexQuery } from '../../../../lib/convexServer';

type Props = {
  params: Promise<{ id: string }>
}

async function getProduct(slug: string) {
  try {
    const product = await convexQuery("functions/products:getProductsBySlug", { slug });
    if (product) return product;
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
