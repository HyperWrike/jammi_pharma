import Link from 'next/link';
import { convexQuery } from '@/lib/convexServer';

type Props = {
  params: Promise<{ slug: string }>;
};

async function getBlog(slug: string) {
  try {
    const bySlug = await convexQuery<any>('functions/cms:getBlog', { slug });
    if (bySlug) return bySlug;

    const all = await convexQuery<any[]>('functions/cms:listBlogs', {});
    const found = (Array.isArray(all) ? all : []).find((b: any) => String(b._id || b.id) === slug);
    return found || null;
  } catch {
    return null;
  }
}

export default async function JournalDetailPage({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-24">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Insight Not Found</h1>
        <Link href="/journal" className="text-[var(--purple)] font-semibold hover:underline">
          Back to Insights
        </Link>
      </main>
    );
  }

  const title = blog.title || 'Insight';
  const date = blog.published_at || blog.created_at || new Date().toISOString();
  const image = blog.featured_image || blog.imageUrl || blog.image_url || '';
  const content = blog.content || blog.excerpt || '';

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <Link href="/journal" className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--purple)] hover:underline mb-8">
        <span className="material-symbols-outlined text-base">arrow_back</span>
        Back to Insights
      </Link>

      <article className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {image ? (
          <img src={image} alt={title} className="w-full h-[320px] object-cover" />
        ) : null}
        <div className="p-8">
          <p className="text-sm text-slate-500 mb-4">
            {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">{title}</h1>
          <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </article>
    </main>
  );
}
