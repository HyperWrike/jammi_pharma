"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import LiveEditable from '../../components/admin/LiveEditable';

const Nilomit: React.FC = () => {
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleQuantityChange = (type: 'inc' | 'dec') => {
        if (type === 'inc') {
            setQuantity((prev) => (prev < 99 ? prev + 1 : prev));
        } else if (type === 'dec' && quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    return (
        <div className="bg-[#f8f6f6] dark:bg-[#221610] text-slate-900 dark:text-slate-100 font-display antialiased">
            <style dangerouslySetInnerHTML={{
                __html: `
                body { font-family: 'Public Sans', sans-serif; }
                .sticky-bottom-cta {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    z-index: 50;
                    background: white;
                    padding: 1rem;
                    box-shadow: 0 -4px 6px -1px rgb(0 0 0 / 0.1);
                }
                @media (min-width: 1024px) {
                    .sticky-bottom-cta {
                        position: static;
                        box-shadow: none;
                        padding: 0;
                        background: transparent;
                    }
                }
                `
            }} />
            <main className="mx-auto max-w-7xl px-4 pb-24 pt-8 sm:px-6 lg:px-8">
                {/* Breadcrumbs */}
                <nav aria-label="Breadcrumb" className="flex text-sm text-gray-500 dark:text-gray-400 mb-8">
                    <ol className="flex items-center space-x-2">
                        <li><Link className="hover:text-[#ec5b13]" href="/">Home</Link></li>
                        <li><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"></path></svg></li>
                        <li><Link className="hover:text-[#ec5b13]" href="/shop">Therapeutics</Link></li>
                        <li><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"></path></svg></li>
                        <li className="text-[#ec5b13] font-medium">Nilomit</li>
                    </ol>
                </nav>

                <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12">
                    {/* Image Gallery */}
                    <div className="flex flex-col">
                        <div className="aspect-square w-full overflow-hidden rounded-3xl bg-[#ec5b13]/5">
                            <img alt="Nilomit Herbal Anti-Emetic Tablets Packaging" className="h-full w-full object-cover object-center transition-opacity hover:opacity-90" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBO1OUKioed549PpUogWfKIFne3x2dB3UWskx9LEbqPQMlbAZDA2UM1YA54iBtHfCLi2rmK-OiBY0uOZxVX2aDmGZGSXwzRt0nG6oD3eggLBMUI9WLjdRKsfy0Puc48E9pCMwaijtFgwX8osxsqrJTZUbgd_DFnLrIyWX198OiEU2DakIKMgTppiDC-b1uQ8p7IAMgqBwJ9Dncq8JC9MmKwyDuR_DXBgzyD3dzSe08a2xmzdSC5LVPnrXtxxFZJZz4o1veBxM6qChA" />
                        </div>
                        <div className="mt-4 grid grid-cols-4 gap-4">
                            <div className="aspect-square overflow-hidden rounded-xl bg-[#ec5b13]/10">
                                <img alt="Tablet detail" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5CLYkN0KICeP_UTVUWl7IgjZDXUDW8USk3BP7JOF4JK7Bza5M2e9bCK2akLE7weuBxtIRTdbMgmN8etRFSyz25y993iQEjWwhRRKzZ92YHCNSVtj-ufhlsjd4xT53tQWKHlsxQsAHTTJ3MsQwyB0AM9yFfwgXvskjRCY5oKZ6DP0Y_qsMvCV2LcOobD-MxpM9Lil_VGV1C-KnMMuE9YuPMNfSS1X8vhWMpXZYT9mZ3IPDHKUj5qSi-t0702dJG2Vb7hYQYkO3GWE" />
                            </div>
                            <div className="aspect-square overflow-hidden rounded-xl bg-[#ec5b13]/10 border-2 border-[#ec5b13]">
                                <img alt="Box detail" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBK4UmIWYoKjGq5uZ3MSNMLn5n3iosNuavDQOkv_Lm5IebUAQMM0xWE7Y8mvlCvsJ93ugFqQAq0Uni3-Bdjj9LWLYPbv0lJPfLXTLwRMrWCWNkbBsVgObmP7Zixi6CntBVHzHmHXYK8s9ZzZGTlGcUVZp6s0Rh-dPDOwyvrIlkV5fR6UPypt-aTyZ4HjDjhkdlO28KlrIkEGMkCvGaVG5MBqBpmekaSp9P3rDAEdf3rV771YCFKRgBVCjKs4CI2g0qnTo9LdYNUTwg" />
                            </div>
                            <div className="aspect-square overflow-hidden rounded-xl bg-[#ec5b13]/10">
                                <img alt="Herbal ingredients" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6ukVdxERaT9sgbpqOmWtq1mxQk3c-5OMfvm2PSlXxr9SSbHXGBwNQH1qrBii0GprKOhlaqtoo1S5WcxxSIye1i6wO4jhvLQL6m9kTv2H8i1LLVxwI_7c9uTJvuSQ81igGVd10vDQAaMFchZmWKbOPRITAKff6MvwSQXedcGIoNb9L_5uQCuDB1dNPiBwtfjwWtvb7GPXy4WrMxO3kz49DrERFpM2OO_UMgyHQjxGjhjQhWlrzJdrw5qhNDaot4pqf5rilMDmm-pU" />
                            </div>
                            <div className="aspect-square overflow-hidden rounded-xl bg-[#ec5b13]/10">
                                <img alt="Wellness context" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoVCANbEdPGlWjl8Kd1-sSGJ3WPeEz7qU8FiJDDHbzxIQvMj3KzbVWkaF2iDzwq1T22KXQGRk_sW6uDRTFKX09BmK1FE0bKknVo0FeydRySOc-XlAsIL8UXikvuRP-y7SvUQziSua7fpYdaroNNzHeeiAERPJGRJtI2udBD2iWj8owComycjRvPEiYPUSqgXpiewWs8Eh5SPtZ7NJga9zW5psjp_Bk5FdywFJGaCZ4R-cBuB5ijPhBz4K5rAZTWlgjMk6LTojW5NU" />
                            </div>
                        </div>
                    </div>
                    {/* Product Details */}
                    <div className="mt-10 px-0 sm:mt-16 sm:px-0 lg:mt-0">
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="inline-flex items-center rounded-full bg-[#ec5b13]/10 px-3 py-1 text-xs font-bold text-[#ec5b13]">BEST SELLER</span>
                            <span className="inline-flex items-center rounded-full bg-slate-200 dark:bg-slate-800 px-3 py-1 text-xs font-semibold">Digestive Health</span>
                        </div>
                        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white"><LiveEditable collection="products_content" docId="nilomit" field="name">Nilomit (Anti-Emetic Tablets)</LiveEditable></h1>
                        <p className="mt-2 text-xl font-medium text-[#ec5b13]">Natural Relief from Nausea and Vomiting</p>
                        <div className="mt-4 flex items-center gap-4">
                            <div className="flex flex-row text-yellow-400">
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <svg className="w-5 h-5 fill-current" style={{ clipPath: 'inset(0 50% 0 0)' }} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                            </div>
                            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">4.8 (124 reviews)</span>
                        </div>
                        <div className="mt-6 border-t border-[#ec5b13]/10 pt-6">
                            <p className="text-3xl font-bold text-slate-900 dark:text-white">₹150 <span className="text-lg font-normal text-slate-500 dark:text-slate-400">for 20 tablets</span></p>
                        </div>
                        <div className="mt-8">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Key Benefits</h3>
                            <ul className="mt-4 space-y-4">
                                <li className="flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ec5b13]/20 text-[#ec5b13]">
                                        <span className="material-symbols-outlined text-lg">check</span>
                                    </div>
                                    <span className="text-slate-600 dark:text-slate-300">Reduces nausea immediately</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ec5b13]/20 text-[#ec5b13]">
                                        <span className="material-symbols-outlined text-lg">check</span>
                                    </div>
                                    <span className="text-slate-600 dark:text-slate-300">Settles the stomach naturally</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ec5b13]/20 text-[#ec5b13]">
                                        <span className="material-symbols-outlined text-lg">check</span>
                                    </div>
                                    <span className="text-slate-600 dark:text-slate-300">Fast-acting herbal formula</span>
                                </li>
                            </ul>
                        </div>

                        <div className="flex items-center space-x-4 mb-8 mt-6">
                            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden h-14">
                                <button onClick={() => handleQuantityChange('dec')} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300">-</button>
                                <input className="w-12 text-center border-none focus:ring-0 bg-transparent text-slate-700 dark:text-slate-300" readOnly type="number" value={quantity} />
                                <button onClick={() => handleQuantityChange('inc')} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300">+</button>
                            </div>
                        </div>

                        {/* Sticky Mobile CTA / Static Desktop CTA */}
                        <div className="sticky-bottom-cta sm:static mt-10">
                            <div className="flex gap-4 max-w-7xl mx-auto">
                                <button className="flex h-[52px] flex-1 items-center justify-center rounded-xl bg-[#ec5b13] px-8 text-base font-bold text-white shadow-lg hover:bg-[#ec5b13]/90 transition-all">
                                    Add to Cart
                                </button>
                                <button className="flex h-[52px] w-[52px] items-center justify-center rounded-xl border-2 border-[#ec5b13]/20 bg-white dark:bg-slate-800 text-[#ec5b13] hover:bg-[#ec5b13]/5 transition-all">
                                    <span className="material-symbols-outlined">favorite</span>
                                </button>
                            </div>
                            <p className="mt-3 text-center text-xs text-slate-500 dark:text-slate-400 sm:text-left">Free shipping on orders above ₹500</p>
                        </div>
                    </div>
                </div>
                {/* Ingredients & Details Section */}
                <section className="mt-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="rounded-3xl bg-white dark:bg-slate-900 p-8 shadow-sm border border-[#ec5b13]/5">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">About Nilomit</h2>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                                Nilomit is a specialized herbal formulation designed to provide rapid relief from motion sickness, morning sickness, and general digestive discomfort. Rooted in traditional Ayurvedic wisdom and backed by Jammi's centuries of herbal expertise.
                            </p>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <p className="text-sm font-bold uppercase text-[#ec5b13] mb-2">Ingredients</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm">Ginger</span>
                                        <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm">Peppermint</span>
                                        <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm">Lemon</span>
                                        <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm">Ajwain</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-bold uppercase text-[#ec5b13] mb-2">Dosage</p>
                                    <p className="text-slate-600 dark:text-slate-300 text-sm">1-2 tablets as needed, or as directed by your physician. Chew slowly for best results.</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">How to Use</h2>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ec5b13] text-white font-bold">1</span>
                                    <p className="text-slate-600 dark:text-slate-300">Take 1-2 tablets at the first sign of discomfort or nausea.</p>
                                </div>
                                <div className="flex gap-4">
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ec5b13] text-white font-bold">2</span>
                                    <p className="text-slate-600 dark:text-slate-300">For motion sickness, consume 30 minutes before travel starts.</p>
                                </div>
                                <div className="flex gap-4">
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ec5b13] text-white font-bold">3</span>
                                    <p className="text-slate-600 dark:text-slate-300">Drink a glass of warm water if preferred, though tablets are easy to swallow.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* FAQ Section */}
                <section className="mt-24 border-t border-[#ec5b13]/10 pt-16">
                    <h2 className="text-center text-3xl font-extrabold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
                    <div className="mt-12 max-w-3xl mx-auto space-y-4">
                        <details className="group rounded-2xl bg-white dark:bg-slate-900 p-6 border border-[#ec5b13]/5 [&_summary::-webkit-details-marker]:hidden">
                            <summary className="flex cursor-pointer items-center justify-between gap-1.5">
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Is Nilomit safe for children?</h2>
                                <span className="material-symbols-outlined transition duration-300 group-open:-rotate-180">expand_more</span>
                            </summary>
                            <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-300">Yes, Nilomit is formulated with natural ingredients like Ginger and Ajwain, making it safe for children over 5 years. For younger children, please consult a pediatrician.</p>
                        </details>
                        <details className="group rounded-2xl bg-white dark:bg-slate-900 p-6 border border-[#ec5b13]/5 [&_summary::-webkit-details-marker]:hidden">
                            <summary className="flex cursor-pointer items-center justify-between gap-1.5">
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Does it cause drowsiness?</h2>
                                <span className="material-symbols-outlined transition duration-300 group-open:-rotate-180">expand_more</span>
                            </summary>
                            <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-300">Unlike synthetic anti-emetics, Nilomit is 100% herbal and non-drowsy. It focuses on settling the stomach without affecting your alertness.</p>
                        </details>
                        <details className="group rounded-2xl bg-white dark:bg-slate-900 p-6 border border-[#ec5b13]/5 [&_summary::-webkit-details-marker]:hidden">
                            <summary className="flex cursor-pointer items-center justify-between gap-1.5">
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Can it be used for morning sickness?</h2>
                                <span className="material-symbols-outlined transition duration-300 group-open:-rotate-180">expand_more</span>
                            </summary>
                            <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-300">Nilomit is widely used for morning sickness; however, we strongly recommend consulting your obstetrician before starting any supplement during pregnancy.</p>
                        </details>
                    </div>
                </section>
                {/* Reviews Section */}
                <section className="mt-24">
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Customer Reviews</h2>
                        <button className="text-[#ec5b13] font-bold hover:underline">Write a Review</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="rounded-2xl bg-[#ec5b13]/5 p-6 border border-[#ec5b13]/10">
                            <div className="flex items-center gap-1 mb-3">
                                <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
                                <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
                                <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
                                <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
                                <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
                            </div>
                            <p className="text-slate-900 dark:text-white font-bold">Amazing for travel!</p>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">"I always carry these for my road trips. Works much better than other tablets and doesn't make me sleepy."</p>
                            <div className="mt-4 flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-slate-300 bg-center bg-cover bg-no-repeat" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBwNnuXvmqpoh-h0nW5OO19qgWnEz0ig7PFF_yyIgCae2xsVjLfmy5rULsdDHkG_RQh48tGuRSAgXJqPNGyUdztAcwztmTlZKFApxCjjmcFMTjEUN3fw6Ci7SBG4IEBwoDJVnnHbeQ21GQX0SmndVZjdoA5p0BjaaRWbBjQhpAYm_0cC5vpNiLAHsQkr3k-LqLQzI8V_PMp3K06WgGmRRQpu48eQ5X3GA0O46GH48LDimZmKYC9v_i3IokHO45E98qNX4_6eCYb7Nk')" }} />
                                <span className="text-xs font-semibold">Ananya R.</span>
                            </div>
                        </div>
                        <div className="rounded-2xl bg-[#ec5b13]/5 p-6 border border-[#ec5b13]/10">
                            <div className="flex items-center gap-1 mb-3">
                                <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
                                <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
                                <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
                                <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
                                <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
                            </div>
                            <p className="text-slate-900 dark:text-white font-bold">Natural and Effective</p>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">"The ginger and peppermint combo really helps with my occasional indigestion. Very fast acting."</p>
                            <div className="mt-4 flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-slate-300 bg-center bg-cover bg-no-repeat" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD0ZNJu5UIA4HtL57genWe6Ke01YEcg1LzvfjUky_qkZW7GpbL8yEFxEyxWfV7EFHEmSMvrqKbR8cGTsCuyygxj5vWzAWqUUFDz5ijnVLYe5o1SkP3DO9OzaOnbVlfj4SDgkcGa6r6PFnYUDrExuhM6yOfOJfYcewMhw9-sFMWgskzx0aOseGbNOwgAQffNldO2So73DfO4OqaxXgovEo8AUGZDFm7eBKcX8IDsFoWlDsj7XWFh9sBK2U_U-0iHqOpjcvghIWxZeYc')" }} />
                                <span className="text-xs font-semibold">Vikram K.</span>
                            </div>
                        </div>
                        <div className="rounded-2xl bg-[#ec5b13]/5 p-6 border border-[#ec5b13]/10">
                            <div className="flex items-center gap-1 mb-3">
                                <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
                                <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
                                <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
                                <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
                                <span className="material-symbols-outlined text-slate-300 text-sm">star</span>
                            </div>
                            <p className="text-slate-900 dark:text-white font-bold">Good value</p>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">"Effective product. The packaging is premium and the price is very reasonable for 20 tablets."</p>
                            <div className="mt-4 flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-slate-300 bg-center bg-cover bg-no-repeat" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDGfGtb-fibL7Zrf2omSaKq-N4KiZmw9a6siQfqSB_FlP4YfYMuyqaZVxIbNrffV8mtTXW32oO35mYUgOACII7eYilAkfqiHZM7VGIII8iSZ6zKAA9knNIKyWrFOCzhDhfodEaOWiEmdEHcpW3XgSQeuZ2WuRBQr4Q4l2A5ifTifItf0Tut_Fhwo1eJwE-thq4jz-LiG_Bieh6mkHa1BsEQf_sC8gX2i0PzZHETF_YlCEuh7vw37TuaLikweE3qOVrEBSty8_4MhpA')" }} />
                                <span className="text-xs font-semibold">Siddharth M.</span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Nilomit;
