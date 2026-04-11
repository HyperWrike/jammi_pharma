import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FOUNDERS_BY_SLUG, FOUNDERS_TREE } from '@/lib/foundersTree';

export default async function FounderDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const profile = FOUNDERS_BY_SLUG[slug];
  if (!profile) notFound();

  const descendants = FOUNDERS_TREE.filter((node) => node.lineageFrom === profile.slug);

  return (
    <div className="bg-background-light min-h-screen pt-28 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/founders" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline mb-8">
          <span className="material-symbols-outlined text-base">arrow_back</span>
          Back to Founders Tree
        </Link>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          <div className="mb-6">
            <img
              src={profile.image || '/images/founder_1.png'}
              alt={profile.name}
              className="w-28 h-28 rounded-full object-cover border-2 border-primary/20"
            />
          </div>
          <p className="text-xs uppercase tracking-widest text-primary font-bold mb-2">{profile.era}</p>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-secondary">{profile.name}</h1>
          <p className="text-primary font-bold tracking-wide uppercase text-sm mt-3">{profile.role}</p>
          <p className="mt-6 text-lg text-slate-700 leading-relaxed">{profile.summary}</p>

          {descendants.length > 0 && (
            <div className="mt-10 border-t border-slate-200 pt-6">
              <h2 className="text-xl font-bold text-secondary mb-4">Next Generation</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {descendants.map((node) => (
                  <Link
                    key={node.slug}
                    href={`/founders/${node.slug}`}
                    className="rounded-2xl border border-slate-200 p-4 hover:border-primary hover:bg-primary/5 transition-colors flex items-center gap-3"
                  >
                    <img
                      src={node.image || '/images/founder_2.jpg'}
                      alt={node.name}
                      className="w-14 h-14 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <p className="font-bold text-slate-900">{node.name}</p>
                      <p className="text-sm text-slate-600 mt-1">{node.role}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
