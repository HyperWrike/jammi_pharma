import Link from 'next/link';
import { FOUNDERS_TREE } from '../../../lib/foundersTree';

export default function FoundersPage() {
    const root = FOUNDERS_TREE.find((node) => !node.lineageFrom);
    const children = root ? FOUNDERS_TREE.filter((node) => node.lineageFrom === root.slug) : [];

    if (!root) {
        return null;
    }

    return (
        <div className="bg-background-light min-h-screen pt-28 pb-20 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-10">
                    <p className="text-xs uppercase tracking-[0.3em] text-primary font-bold">Since 1897</p>
                    <h1 className="text-5xl md:text-7xl font-display font-bold text-secondary mt-3">Jammi Founders Tree</h1>
                    <p className="mt-4 text-slate-600 text-lg">Click any image to open that person&apos;s full story page.</p>
                </div>

                <div className="bg-white border border-slate-200 rounded-[2rem] p-8 md:p-12 shadow-sm">
                    <div className="flex flex-col items-center">
                        <Link href={`/founders/${root.slug}`} className="group flex flex-col items-center text-center">
                            <img
                                src={root.image || '/images/Thatha%20Logo%20-Since%201897.png'}
                                alt={root.name}
                                className="w-40 h-40 md:w-48 md:h-48 object-contain rounded-full border-4 border-primary/25 bg-slate-50 p-3 group-hover:scale-105 transition-transform"
                            />
                            <p className="mt-4 text-2xl font-bold text-secondary">{root.name}</p>
                            <p className="text-xs uppercase tracking-widest text-primary mt-1">{root.role}</p>
                        </Link>

                        <div className="w-[2px] h-12 bg-primary/30 my-4" />

                        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
                            {children.map((node) => (
                                <Link key={node.slug} href={`/founders/${node.slug}`} className="group text-center bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:border-primary hover:bg-primary/5 transition-colors">
                                    <img
                                        src={node.image || '/images/founder_1.png'}
                                        alt={node.name}
                                        className="w-36 h-36 mx-auto object-cover rounded-full border-2 border-primary/20 group-hover:scale-105 transition-transform"
                                    />
                                    <p className="mt-4 text-xl font-bold text-slate-900">{node.name}</p>
                                    <p className="text-xs uppercase tracking-widest text-slate-500 mt-1">{node.role}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
