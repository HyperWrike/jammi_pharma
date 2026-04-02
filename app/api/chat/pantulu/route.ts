import { NextRequest, NextResponse } from 'next/server';
import { convexAction, convexQuery } from '@/lib/convexServer';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type CatalogProduct = {
  _id: string;
  name: string;
  slug?: string;
  short_description?: string;
  description?: string;
  category_id?: string;
  images?: string[];
  price?: number;
  discount_price?: number;
  tags?: string[];
  benefits?: string[];
  status?: string;
};

type Category = {
  _id: string;
  name: string;
};

const GROQ_MODEL = process.env.GROQ_MODEL || process.env.GROQ_CHAT_MODEL || 'llama-3.3-70b-versatile';

const NON_RECOMMENDABLE_STATUSES = new Set(['archived', 'deleted', 'draft', 'inactive', 'unpublished']);

function formatPrice(price?: number, discountPrice?: number) {
  const finalPrice = typeof discountPrice === 'number' ? discountPrice : price;
  return typeof finalPrice === 'number' ? `Rs.${finalPrice}` : 'Price on request';
}

function isRecommendableProduct(p: CatalogProduct) {
  const status = (p.status || '').toLowerCase().trim();
  return !NON_RECOMMENDABLE_STATUSES.has(status);
}

async function fetchAllProducts(): Promise<CatalogProduct[]> {
  const pageSize = 500;
  let page = 1;
  let total = 0;
  const all: CatalogProduct[] = [];

  do {
    const result = await convexQuery<{ data: CatalogProduct[]; total: number }>('functions/products:listProducts', {
      page,
      limit: pageSize,
    });

    const items = Array.isArray(result?.data) ? result.data : [];
    total = Number(result?.total || 0);
    all.push(...items);
    page += 1;
  } while (all.length < total);

  return all;
}

function bestEffortRecommendations(message: string, products: CatalogProduct[], categoryMap: Record<string, string>) {
  const q = message.toLowerCase();
  const words = q.split(/\s+/).filter((w) => w.length > 2);

  const scored = products
    .filter(isRecommendableProduct)
    .map((p) => {
      const categoryName = p.category_id ? categoryMap[p.category_id] || '' : '';
      const haystack = [
        p.name,
        p.short_description || '',
        p.description || '',
        categoryName,
        ...(p.tags || []),
        ...(p.benefits || []),
      ]
        .join(' ')
        .toLowerCase();

      let score = 0;
      for (const w of words) {
        if (haystack.includes(w)) score += 1;
      }

      return { p, score, categoryName };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return scored
    .filter((x) => x.score > 0)
    .map((x) => ({
      id: x.p._id,
      name: x.p.name,
      image: x.p.images?.[0] || '/images/placeholder.png',
      link: `/product/${x.p.slug || x.p._id}`,
      price: formatPrice(x.p.price, x.p.discount_price),
      reason: `Matches your query for ${x.categoryName || 'wellness'} support.`,
    }));
}

function buildCatalogContext(products: CatalogProduct[], categoryMap: Record<string, string>) {
  const lines = products.map((p) => {
    const categoryName = p.category_id ? categoryMap[p.category_id] || 'General' : 'General';
    const summary = (p.short_description || p.description || '').replace(/\s+/g, ' ').slice(0, 220);
    const tags = (p.tags || []).slice(0, 6).join(', ');
    const benefits = (p.benefits || []).slice(0, 4).join(', ');

    return [
      `id:${p._id}`,
      `name:${p.name}`,
      `slug:${p.slug || ''}`,
      `category:${categoryName}`,
      `status:${p.status || ''}`,
      `price:${formatPrice(p.price, p.discount_price)}`,
      `summary:${summary}`,
      `tags:${tags}`,
      `benefits:${benefits}`,
      `url:/product/${p.slug || p._id}`,
    ].join(' | ');
  });

  return lines.join('\n');
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userMessage: string = (body?.message || '').toString().trim();

    if (!userMessage) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const [allProducts, categories] = await Promise.all([
      fetchAllProducts(),
      convexQuery<Category[]>('functions/categories:listCategories', {}),
    ]);

    const products = allProducts.filter(isRecommendableProduct);
    const categoryMap: Record<string, string> = {};
    for (const c of categories || []) {
      categoryMap[c._id] = c.name;
    }

    const catalogContext = buildCatalogContext(products, categoryMap);
    const fallbackRecommendations = bestEffortRecommendations(userMessage, products, categoryMap);

    const systemPrompt = [
      'You are Pantulu, AI product assistant for Jammi Pharmaceuticals.',
      'Goal: Recommend the most suitable Jammi products based only on the provided catalog context.',
      'When user asks for suggestions, give concise guidance and top 1-3 products.',
      'If symptoms are severe or unclear, advise consultation politely.',
      'Never invent products not present in catalog context.',
      'Respond in strict JSON with this shape:',
      '{"reply":"string","recommendations":[{"name":"string","url":"string","reason":"string"}]}'
    ].join(' ');

    const completionRes = await convexAction<
      { ok: true; content: string } | { ok: false; status: number; error: string }
    >('functions/pantulu:chatCompletion', {
      systemPrompt,
      catalogContext,
      userMessage,
      model: GROQ_MODEL,
    });

    if (!completionRes.ok) {
      return NextResponse.json({
        reply: `Pantulu could not reach Groq right now. (${completionRes.status})`,
        debug: completionRes.error,
        recommendations: fallbackRecommendations,
      });
    }

    const raw = completionRes.content || '';

    let parsed: { reply?: string; recommendations?: Array<{ name: string; url: string; reason: string }> } = {};
    try {
      const maybeJson = raw.match(/\{[\s\S]*\}/)?.[0] || raw;
      parsed = JSON.parse(maybeJson);
    } catch {
      parsed = { reply: raw };
    }

    const recsFromModel = (parsed.recommendations || []).slice(0, 3);

    const recommendations = recsFromModel
      .map((r) => {
        const matched = products.find((p) => (p.slug && r.url?.includes(p.slug)) || p.name.toLowerCase() === r.name.toLowerCase());
        if (!matched) return null;
        return {
          id: matched._id,
          name: matched.name,
          image: matched.images?.[0] || '/images/placeholder.png',
          link: `/product/${matched.slug || matched._id}`,
          price: formatPrice(matched.price, matched.discount_price),
          reason: r.reason || 'Recommended for your query.',
        };
      })
      .filter(Boolean);

    return NextResponse.json({
      reply: parsed.reply || 'Here are suitable Jammi options for you.',
      recommendations: recommendations.length > 0 ? recommendations : fallbackRecommendations,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        reply: 'Pantulu encountered an error. Please try again.',
        recommendations: [],
        error: error?.message || 'Unknown error',
      },
      { status: 500 }
    );
  }
}
