import { NextRequest, NextResponse } from 'next/server';
import { convexAction, convexQuery } from '@/lib/convexServer';
import { MOCK_PRODUCTS } from '@/constants';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type CatalogProduct = {
  _id: string;
  id?: string;
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

function buildProductLink(p: CatalogProduct) {
  return `/product/${p.slug || p.id || p._id}`;
}

function normalizeText(value?: string) {
  return (value || '').toLowerCase().trim();
}

function normalizeMockProducts(): CatalogProduct[] {
  return (MOCK_PRODUCTS || []).map((p: any) => ({
    _id: String(p.id || p.slug || p.name || ''),
    id: String(p.id || ''),
    slug: String(p.id || p.slug || ''),
    name: String(p.name || ''),
    short_description: String(p.shortDesc || ''),
    description: String(p.description || p.shortDesc || ''),
    images: p.image ? [String(p.image)] : [],
    price: typeof p.price === 'number' ? p.price : undefined,
    discount_price: undefined,
    tags: [],
    benefits: Array.isArray(p.features) ? p.features.map((f: any) => String(f?.title || '')).filter(Boolean) : [],
    status: 'published',
  }));
}

function mergeCatalogs(primary: CatalogProduct[], fallback: CatalogProduct[]): CatalogProduct[] {
  const seen = new Set<string>();
  const merged: CatalogProduct[] = [];

  for (const p of [...primary, ...fallback]) {
    const key = `${normalizeText(p.slug || p.id || p._id)}|${normalizeText(p.name)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(p);
  }

  return merged;
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
  const q = normalizeText(message);
  const words = q.split(/\s+/).filter((w) => w.length > 2);

  const exactMatches = products
    .filter(isRecommendableProduct)
    .filter((p) => {
      const name = normalizeText(p.name);
      const slug = normalizeText(p.slug || p.id || p._id);
      return q.includes(name) || q.includes(slug);
    })
    .slice(0, 3)
    .map((p) => ({
      p,
      score: 999,
      categoryName: p.category_id ? categoryMap[p.category_id] || '' : '',
    }));

  if (exactMatches.length > 0) {
    return exactMatches.map((x) => ({
      id: x.p._id,
      name: x.p.name,
      image: x.p.images?.[0] || '/images/placeholder.png',
      link: buildProductLink(x.p),
      price: formatPrice(x.p.price, x.p.discount_price),
      reason: 'Exact match for your requested product.',
    }));
  }

  const scored = products
    .filter(isRecommendableProduct)
    .map((p) => {
      const categoryName = p.category_id ? categoryMap[p.category_id] || '' : '';
      const haystack = [
        p.name,
        p.slug || p.id || p._id,
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

  const top = scored.slice(0, 3);

  return top.map((x) => ({
      id: x.p._id,
      name: x.p.name,
      image: x.p.images?.[0] || '/images/placeholder.png',
      link: buildProductLink(x.p),
      price: formatPrice(x.p.price, x.p.discount_price),
      reason:
        x.score > 0
          ? `Matches your query for ${x.categoryName || 'wellness'} support.`
          : `Closest related option in ${x.categoryName || 'wellness'} category.`,
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
      `url:${buildProductLink(p)}`,
    ].join(' | ');
  });

  return lines.join('\n');
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userMessage: string = (body?.message || '').toString().trim();
    const history: Array<{ role?: string; text?: string }> = Array.isArray(body?.history)
      ? body.history.slice(-8)
      : [];

    if (!userMessage) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const [allProducts, categories] = await Promise.all([
      fetchAllProducts(),
      convexQuery<Category[]>('functions/categories:listCategories', {}),
    ]);

    const mergedCatalog = mergeCatalogs(allProducts, normalizeMockProducts());
    const products = mergedCatalog.filter(isRecommendableProduct);
    const categoryMap: Record<string, string> = {};
    for (const c of categories || []) {
      categoryMap[c._id] = c.name;
    }

    const catalogContext = buildCatalogContext(products, categoryMap);
    const fallbackRecommendations = bestEffortRecommendations(userMessage, products, categoryMap);
    const conversationContext = history
      .map((h) => `${h.role === 'user' ? 'User' : 'Assistant'}: ${(h.text || '').toString().trim()}`)
      .filter(Boolean)
      .join('\n');
    
    let kbContext = "";
    try {
        const kbPath = path.join(process.cwd(), 'public/data/kb-ayurveda.json');
        if (fs.existsSync(kbPath)) {
            const kbRaw = fs.readFileSync(kbPath, 'utf8');
            const kbData = JSON.parse(kbRaw);
            const words = normalizeText(userMessage).split(/\s+/).filter(w => w.length > 3);
            
            if (words.length > 0) {
                const scoredChunks = kbData.map((chunk: any) => {
                    const chunkWords = normalizeText(chunk.content).split(/\s+/);
                    let cbScore = 0;
                    for (const w of words) {
                        if (chunkWords.includes(w)) cbScore += 2;
                        else if (normalizeText(chunk.content).includes(w)) cbScore += 1;
                    }
                    return { ...chunk, score: cbScore };
                }).filter((c: any) => c.score > 0)
                  .sort((a: any, b: any) => b.score - a.score)
                  .slice(0, 2);
                  
                if (scoredChunks.length > 0) {
                    kbContext = scoredChunks.map((c: any) => `[Source: ${c.source}]\n${c.content}`).join('\n\n');
                }
            }
        }
    } catch(err) {
        console.error("Failed to load or search KB", err);
    }

    const systemPrompt = [
      'You are Pantulu, customer-care and product assistant for Jammi Pharmaceuticals.',
      'Your job is to guide customers from question to action: understand concern, suggest suitable real products, and direct them to the exact product pages.',
      'Treat this as a mini doctor-style triage conversation: ask short follow-up questions when needed, then suggest products based on symptoms and previous chat context.',
      'The catalog context contains the current live products from admin panel. Use only that data.',
      'Never invent product names, URLs, prices, categories, tags, or benefits.',
      'Recommend at most 3 products and keep advice concise and practical.',
      'For severe symptoms, emergencies, pregnancy, children, or unclear complaints: advise consultation at /consultation.',
      'If user asks to browse more options, direct to /shop.',
      'When suggesting any product, include only URL values from catalog context format /product/<slug-or-id>.',
      'If exact match is unavailable, suggest closest related products from catalog instead of saying not available.',
      'Never respond with dead-end phrases like "we do not have" or "not available" without giving alternatives.',
      'Tone: respectful, clear, customer-friendly, no overpromising medical claims.',
      conversationContext ? `Recent conversation context:\n${conversationContext}` : '',
      kbContext ? `Here is some Ayurvedic knowledge base you can use to answer questions: ${kbContext}` : '',
      'You MUST respond in strict JSON with this shape (no text before or after the JSON):',
      '{"reply":"your conversational human-readable reply here","recommendations":[{"name":"product name","url":"/product/slug","reason":"why this helps"}]}',
      'The "reply" field must be a complete, human-readable response. Never put JSON objects or code inside the reply string. Write naturally as if talking to a customer.'
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

    // Robust JSON extraction — handle strict JSON, JSON+trailing text, multi-block, or plain text
    let parsed: { reply?: string; recommendations?: Array<{ name: string; url: string; reason: string }> } = {};
    try {
      // Try to find the first complete JSON object with {reply, recommendations}
      const jsonBlocks = raw.match(/\{[\s\S]*?\}(?=\s*$|\s*[^,\]}])/g) || [];
      let found = false;
      for (const block of jsonBlocks) {
        try {
          const candidate = JSON.parse(block);
          if (candidate.reply || candidate.recommendations) {
            parsed = candidate;
            found = true;
            break;
          }
        } catch {}
      }
      
      if (!found) {
        // Greedy match — get the largest JSON object
        const greedyMatch = raw.match(/\{[\s\S]*\}/)?.[0];
        if (greedyMatch) {
          try {
            parsed = JSON.parse(greedyMatch);
          } catch {
            parsed = { reply: raw };
          }
        } else {
          parsed = { reply: raw };
        }
      }
    } catch {
      parsed = { reply: raw };
    }

    // Clean up the reply text — remove any lingering JSON/code blocks
    let cleanReply = parsed.reply || '';
    // Strip embedded JSON objects from reply text
    cleanReply = cleanReply.replace(/\{"[^"]*":\s*"[^"]*"(?:,\s*"[^"]*":\s*(?:"[^"]*"|\[[^\]]*\]))*\}/g, '').trim();
    // Strip markdown code fences
    cleanReply = cleanReply.replace(/```[\s\S]*?```/g, '').trim();
    // Collapse multiple newlines
    cleanReply = cleanReply.replace(/\n{3,}/g, '\n\n').trim();

    const recsFromModel = (parsed.recommendations || []).slice(0, 3);

    const recommendations = recsFromModel
      .map((r) => {
        const url = (r.url || '').toLowerCase();
        const matched = products.find((p) => {
          const slugMatch = p.slug ? url.includes(p.slug.toLowerCase()) : false;
          const idMatch = url.includes(String(p._id).toLowerCase()) || (p.id ? url.includes(String(p.id).toLowerCase()) : false);
          const nameMatch = p.name.toLowerCase() === r.name.toLowerCase();
          return slugMatch || idMatch || nameMatch;
        });
        if (!matched) return null;
        return {
          id: matched._id,
          name: matched.name,
          image: matched.images?.[0] || '/images/placeholder.png',
          link: buildProductLink(matched),
          price: formatPrice(matched.price, matched.discount_price),
          reason: r.reason || 'Recommended for your query.',
        };
      })
      .filter(Boolean);

    const finalRecommendations = recommendations.length > 0 ? recommendations : fallbackRecommendations;

    return NextResponse.json({
      reply:
        cleanReply.length > 0
          ? cleanReply.replace(/\b(sorry|not available|we do not have)\b/gi, 'Here are the closest options')
          : 'Here are the closest suitable Jammi options for you.',
      recommendations: finalRecommendations,
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
