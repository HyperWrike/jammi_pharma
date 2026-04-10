"use client";
import React, { useEffect } from 'react';
import LiveEditable from '../../components/admin/LiveEditable';

const SoftLips: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-50 w-full bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-8">
                            <div className="flex items-center gap-2 text-secondary dark:text-primary">
                                <span className="material-symbols-outlined text-3xl">spa</span>
                                <h2 className="text-2xl font-display font-bold leading-tight tracking-tight">SoftLips</h2>
                            </div>
                            <nav className="hidden md:flex items-center gap-8">
                                <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Shop</a>
                                <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Heritage</a>
                                <a className="text-sm font-medium hover:text-primary transition-colors" href="#">About</a>
                            </nav>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="hidden sm:flex items-center bg-primary/10 rounded-xl px-3 py-1.5 border border-primary/20">
                                <span className="material-symbols-outlined text-primary text-xl">search</span>
                                <input className="bg-transparent border-none focus:ring-0 text-sm placeholder:text-secondary/50 w-32 lg:w-48 outline-none" placeholder="Search heritage care..." />
                            </div>
                            <button className="p-2 hover:bg-primary/10 rounded-full transition-colors relative">
                                <span className="material-symbols-outlined">shopping_bag</span>
                                <span className="absolute top-1 right-1 bg-primary text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">2</span>
                            </button>
                            <button className="p-2 hover:bg-primary/10 rounded-full transition-colors">
                                <span className="material-symbols-outlined">person</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                {/* Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                    {/* Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-square rounded-xl overflow-hidden bg-secondary/5 border border-primary/10 relative">
                            <img className="w-full h-full object-cover" data-alt="Premium SoftLips lip balm tube in elegant packaging" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFsZ_KgFMqrgKiWtRk0vWUOeU4b4SSfTFGCBbNvCT2vcR9LaBEztKyh287ExvAoFrckg93-PdcTAsvabpAEm68jT_zlsilWBZ796GXDI-bnyxuefTJwMap9ViYU1_qELpN-6A38Ab3A63x94GC2j3vesBr_u8vd9t9WYkYVkSwl6_Vw5S03gf6Jt9LITqAxkQONkpTU7Z7jRFm6pITMFLDmy9SaVfxcbknWXBdNcgaa0FeeJvrmVwPA0Mi_-pB_a0i8WmKxO87zxw" />
                            <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Heritage Collection</div>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            <div className="aspect-square rounded-lg border-2 border-primary overflow-hidden">
                                <img className="w-full h-full object-cover opacity-100" data-alt="Lip balm texture detail close up" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0lKv8fKdVRjqz66EcCt7irR3lJDX9Q7IpOSSEJemYrjABadUn1wSzSVNietKV5YOi3Qg4oqyfmd4NpimDcBDiTb9xLYF-XIFJ8DueZCN9JTZbK2piozb9BQxC1kzdO6A0Oabdk-o15AUOvZLtQgvKSoZgv1C87677EJ_xh35_83nvcRe70g0tSyQTYkDgUV_UGfTvs0mpU2Kss5pLvg8gi1d_-sEM-Ci2-J3YeHGeUavLvUyQ9ilecjtUoIq2wpdiADoG7xTsYek" />
                            </div>
                            <div className="aspect-square rounded-lg border border-primary/10 overflow-hidden grayscale hover:grayscale-0 transition-all cursor-pointer">
                                <img className="w-full h-full object-cover" data-alt="Natural honey and almond ingredients display" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdPurj_oHqLhQQBPJzaT7eWs6mLLh1h9EH9CA8PgE-rvmW5VicW4xwQXSfzShYo8R9uSsJfjgShC_pUhrx3FlRU0EGmyXdUzlOnrcC4PL9MhNwB5_LYX7uADY9CSL7NctOzeoSBT5CzGZ5RruZRQV1Hd0W7E-IcXP-UEFS7VugaJUe3TtoYV_rYbF16grUF-BODS6z2e82As_QucFAZ3gnCMSVh9w95Qq3rIa4KPiaYf7U6EXHt0HGS-r2FKEvHAM_2kELxB_L1uE" />
                            </div>
                            <div className="aspect-square rounded-lg border border-primary/10 overflow-hidden grayscale hover:grayscale-0 transition-all cursor-pointer">
                                <img className="w-full h-full object-cover" data-alt="Model applying premium lip balm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfSXIXOoUubFXw5kzaoDtXIEvKBeV4M5MaIk5EypO2r6vetyaAEOaAan5wNQob1EAwqPmZWTkWkYNrT3duzpy_3rtBUh-XeIuT5E45hFIDEXl3DQOZkPHZeG_c46_nibziO_Gi9PHibGZP1w-qCQtTpGmsn2pscVb5zxUCDS57XH1ZnfgpS7RHCkvDsYZGo9IWlJxUrFIbZTQCMe-z5Ax2Q9qjT1QybOfBarQ7DbYLxzLINirLk4k0kP7tnJ_1vPoJ5us_4yfGLEw" />
                            </div>
                            <div className="aspect-square rounded-lg border border-primary/10 overflow-hidden flex items-center justify-center bg-primary/5 group cursor-pointer">
                                <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">play_circle</span>
                            </div>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col">
                        <nav className="flex text-sm text-secondary/60 mb-4 items-center gap-2">
                            <a className="hover:text-primary" href="#">Home</a>
                            <span className="material-symbols-outlined text-xs">chevron_right</span>
                            <a className="hover:text-primary" href="#">Skin &amp; Hair Care</a>
                            <span className="material-symbols-outlined text-xs">chevron_right</span>
                            <span className="text-secondary font-medium">SoftLips</span>
                        </nav>
                        <h1 className="text-4xl lg:text-5xl font-display font-bold text-secondary dark:text-primary mb-2"><LiveEditable collection="products_content" docId="softlips" field="name">SoftLips Heritage Balm</LiveEditable></h1>
                        <p className="text-lg text-secondary/80 italic mb-6">Nourishing the skin since 1924. A legacy of softness.</p>

                        <div className="flex items-center gap-4 mb-8">
                            <span className="text-3xl font-bold text-secondary dark:text-white">$24.00</span>
                            <div className="flex items-center gap-1 text-primary">
                                <span className="material-symbols-outlined fill-1">star</span>
                                <span className="material-symbols-outlined fill-1">star</span>
                                <span className="material-symbols-outlined fill-1">star</span>
                                <span className="material-symbols-outlined fill-1">star</span>
                                <span className="material-symbols-outlined">star_half</span>
                                <span className="text-sm text-secondary/60 ml-2">(128 Reviews)</span>
                            </div>
                        </div>

                        {/* Key Benefits */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            <div className="flex flex-col items-center p-3 bg-secondary/5 rounded-xl text-center">
                                <span className="material-symbols-outlined text-primary mb-1">eco</span>
                                <span className="text-xs font-bold uppercase tracking-tighter"><LiveEditable collection="products_content" docId="softlips" field="benefit1">Nourishes</LiveEditable></span>
                            </div>
                            <div className="flex flex-col items-center p-3 bg-secondary/5 rounded-xl text-center">
                                <span className="material-symbols-outlined text-primary mb-1">shield</span>
                                <span className="text-xs font-bold uppercase tracking-tighter"><LiveEditable collection="products_content" docId="softlips" field="benefit2">Protects</LiveEditable></span>
                            </div>
                            <div className="flex flex-col items-center p-3 bg-secondary/5 rounded-xl text-center">
                                <span className="material-symbols-outlined text-primary mb-1">auto_awesome</span>
                                <span className="text-xs font-bold uppercase tracking-tighter"><LiveEditable collection="products_content" docId="softlips" field="benefit3">Softens</LiveEditable></span>
                            </div>
                        </div>

                        <div className="space-y-6 mb-10">
                            <p className="text-secondary/70 leading-relaxed">
                                Our signature lip balm is a heritage-inspired formula crafted to deeply nourish, protect, and soften your lips using the finest natural ingredients. Infused with centuries-old botanical wisdom and modern dermatological science.
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border border-primary/30 rounded-full px-4 py-2">
                                    <button className="text-primary hover:text-secondary font-bold">-</button>
                                    <span className="px-6 font-medium">1</span>
                                    <button className="text-primary hover:text-secondary font-bold">+</button>
                                </div>
                                <button className="flex-1 bg-primary hover:bg-primary/90 text-white py-4 rounded-full font-bold shadow-lg shadow-primary/20 transition-all transform hover:-translate-y-1">
                                    Add to Cart
                                </button>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="pt-6 border-t border-primary/10 flex flex-wrap gap-6 items-center justify-center md:justify-start">
                            <div className="flex items-center gap-2 opacity-60 grayscale">
                                <span className="material-symbols-outlined">verified</span>
                                <span className="text-[10px] font-bold uppercase">Dermatologist Tested</span>
                            </div>
                            <div className="flex items-center gap-2 opacity-60 grayscale">
                                <span className="material-symbols-outlined">cruelty_free</span>
                                <span className="text-[10px] font-bold uppercase">Cruelty Free</span>
                            </div>
                            <div className="flex items-center gap-2 opacity-60 grayscale">
                                <span className="material-symbols-outlined">nature</span>
                                <span className="text-[10px] font-bold uppercase">100% Organic Ingredients</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Key Ingredients */}
                <section className="py-16 border-t border-primary/10">
                    <h2 className="text-3xl font-display text-center mb-12 text-secondary dark:text-primary">Pure Ingredients, Pure Results</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="group p-8 rounded-2xl bg-white dark:bg-background-dark border border-primary/5 hover:border-primary/20 transition-all text-center">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-primary text-3xl">local_florist</span>
                            </div>
                            <h3 className="text-xl font-display font-bold mb-3">Pure Honey</h3>
                            <p className="text-secondary/60 text-sm">A natural humectant that draws moisture into the skin, keeping lips plump and hydrated all day.</p>
                        </div>
                        <div className="group p-8 rounded-2xl bg-white dark:bg-background-dark border border-primary/5 hover:border-primary/20 transition-all text-center">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-primary text-3xl">spa</span>
                            </div>
                            <h3 className="text-xl font-display font-bold mb-3">Shea Butter</h3>
                            <p className="text-secondary/60 text-sm">Rich in vitamins A and E, it creates a protective barrier against harsh environmental elements.</p>
                        </div>
                        <div className="group p-8 rounded-2xl bg-white dark:bg-background-dark border border-primary/5 hover:border-primary/20 transition-all text-center">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-primary text-3xl">water_drop</span>
                            </div>
                            <h3 className="text-xl font-display font-bold mb-3">Almond Oil</h3>
                            <p className="text-secondary/60 text-sm">Cold-pressed almond oil deeply penetrates to soothe dry, cracked lips with essential fatty acids.</p>
                        </div>
                    </div>
                </section>

                {/* How to Use / Description Tabs */}
                <section className="py-16 bg-secondary/5 rounded-3xl px-8 lg:px-16 mb-20">
                    <div className="flex flex-col lg:flex-row gap-12">
                        <div className="lg:w-1/2">
                            <h2 className="text-3xl font-display text-secondary mb-6">Heritage Ritual</h2>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <span className="text-primary font-display text-4xl font-bold opacity-30">01</span>
                                    <div>
                                        <h4 className="font-bold mb-1">Exfoliate Gently</h4>
                                        <p className="text-secondary/70 text-sm">Ensure lips are clean and lightly exfoliated for maximum absorption.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-primary font-display text-4xl font-bold opacity-30">02</span>
                                    <div>
                                        <h4 className="font-bold mb-1">Apply Generously</h4>
                                        <p className="text-secondary/70 text-sm">Sweep the balm across upper and lower lips. The heat from your skin will activate the botanical oils.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-primary font-display text-4xl font-bold opacity-30">03</span>
                                    <div>
                                        <h4 className="font-bold mb-1">Layer for Night</h4>
                                        <p className="text-secondary/70 text-sm">Apply a thicker layer before sleep to use as an overnight intensive lip mask.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2 rounded-2xl overflow-hidden shadow-2xl">
                            <img className="w-full h-full object-cover" data-alt="Soft morning light hitting a vanity with lip care products" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFSTocfwauZCg1AfSfJYPyWt916VtDaN1wEYKVOcr0GynTJDv1Faw_Wc8UDQ9StW5hMgzllZETJoR1Ql_cux2YN6iXiWVYzF0evoQy0iw47afcrLz8s0KizCgHmkv_-WKHZhw_cCoppOqV_m4TKD2Hx6qu0EqgkmYSOtahGPrPWqMDelhyC3rDao2-4LQWu35A43Xu839PvWHu4joWmNobvBlR3Y3dr-gYVVm48pg46h72NSRFeojnoyP4mOFEejRteWX4K4X_6os" />
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="mb-20">
                    <h2 className="text-3xl font-display text-center mb-12">Frequent Questions</h2>
                    <div className="max-w-3xl mx-auto space-y-4">
                        <div className="border border-primary/10 rounded-xl bg-white dark:bg-background-dark p-6">
                            <button className="flex items-center justify-between w-full text-left">
                                <span className="font-bold text-secondary dark:text-primary">Is this suitable for extremely sensitive skin?</span>
                                <span className="material-symbols-outlined">add</span>
                            </button>
                            <div className="mt-4 text-sm text-secondary/60 leading-relaxed">
                                Yes, our formula is dermatologist-tested and contains no synthetic fragrances or paraben, making it ideal for the most sensitive lips.
                            </div>
                        </div>
                        <div className="border border-primary/10 rounded-xl bg-white dark:bg-background-dark p-6">
                            <button className="flex items-center justify-between w-full text-left">
                                <span className="font-bold text-secondary dark:text-primary">How long does one tube typically last?</span>
                                <span className="material-symbols-outlined">add</span>
                            </button>
                        </div>
                        <div className="border border-primary/10 rounded-xl bg-white dark:bg-background-dark p-6">
                            <button className="flex items-center justify-between w-full text-left">
                                <span className="font-bold text-secondary dark:text-primary">Are your ingredients ethically sourced?</span>
                                <span className="material-symbols-outlined">add</span>
                            </button>
                        </div>
                    </div>
                </section>

                {/* Related Products */}
                <section className="mb-20">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h2 className="text-3xl font-display text-secondary dark:text-primary">Complete the Ritual</h2>
                            <p className="text-secondary/60">Curated products to pair with your SoftLips balm.</p>
                        </div>
                        <a className="text-primary font-bold hover:underline" href="#">View All Collection</a>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="group cursor-pointer">
                            <div className="aspect-[4/5] rounded-xl overflow-hidden bg-secondary/5 mb-4 relative">
                                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Nourishing face oil in amber bottle" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdpKYvlVsJduuQr9dqOM1ljH7RvN3TTqg4OlkkHySUWNVpr9iMWEhzJrAhG0izNPRMcD56tqKranwABlTysob9V4VSk8a0yo63pB6dnpFMIP91z2UEfuz4T1VCiGZKlFMP-4Z3p0bdVSgcrZYyyfclOhLnmKrgUvKYVee6pPL5GPVn8wqLlXnGydunGLH5FDol9x_qFUKSU_ueUPKuAr-jYjQEuK0hKHZCtoF0PtdLFxDxpwfbVyg1K-U19yma6BUJHPx6rptU8PI" />
                                <button className="absolute bottom-4 right-4 bg-white/90 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="material-symbols-outlined text-secondary">add_shopping_cart</span>
                                </button>
                            </div>
                            <h3 className="font-bold text-secondary dark:text-white group-hover:text-primary">Glow Elixir Oil</h3>
                            <p className="text-primary font-bold">$42.00</p>
                        </div>

                        <div className="group cursor-pointer">
                            <div className="aspect-[4/5] rounded-xl overflow-hidden bg-secondary/5 mb-4 relative">
                                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Exfoliating lip scrub in small jar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFaGk4xSly2NH4WnUrBAn8Q6rRBDxTfwsFX5rVaEWKysb9GngHg9IP3JOtcqBb4HmQTQ7tR5-oynvGwmdU0jC9_KeNYhe-MOsmEXDZ3yCgusr-iT7On7i_xvOMvgvpi-PBfL6xgh6klt48YTZ9sGSP2khT5skBpeM8NatG_LBq4m2hAStCrxptI1zDQaYA0fAdOzgJe4I7qyJeOZp_gZgMWCi6sCO6yuezSNgVxo46pYPhcqT_7swD4gdSUsgN-Q5IUijChVJs8_8" />
                                <button className="absolute bottom-4 right-4 bg-white/90 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="material-symbols-outlined text-secondary">add_shopping_cart</span>
                                </button>
                            </div>
                            <h3 className="font-bold text-secondary dark:text-white group-hover:text-primary">Sugar Lip Scrub</h3>
                            <p className="text-primary font-bold">$18.00</p>
                        </div>

                        <div className="group cursor-pointer">
                            <div className="aspect-[4/5] rounded-xl overflow-hidden bg-secondary/5 mb-4 relative">
                                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Luxury moisturizing cream" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlb4tYnV5ZKca1cHgBeXCQVsBNI0kwl1BcYrjpvNeSiAAWb-ZCO9dbEE3y9edvbqJ2LUOzK5JgcWlrg2FjYjFzIWwomID-9Li_C2u7wwDTQW2xCAwLww2M30DqkfakPUHICaAk5D4a_Au04NhJ4IJ9v9FN3Ex3JfUsNH8Z1wYNQuI4ZedYsRHrW41TVOkhJC_IXNE0pD1SjEZdxvLj2OGgbtcpboKT7IEiRQF2SL7rjgwRPaNUjmVM3XcNq-_MRIM6FvhK3njpsBQ" />
                                <button className="absolute bottom-4 right-4 bg-white/90 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="material-symbols-outlined text-secondary">add_shopping_cart</span>
                                </button>
                            </div>
                            <h3 className="font-bold text-secondary dark:text-white group-hover:text-primary">Heritage Face Cream</h3>
                            <p className="text-primary font-bold">$58.00</p>
                        </div>

                        <div className="group cursor-pointer">
                            <div className="aspect-[4/5] rounded-xl overflow-hidden bg-secondary/5 mb-4 relative">
                                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Overnight restorative serum" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZIbJjOVzR7jNz4s9Mx4zE3tWsONKxzaqQvEjeHHXaQ7agn1gKCG_VfiFFGcaQw6uJPsK5hc6z0Q7dYj1cuPr-Zo1pzjjQ69ZnVb5O5hF5HZIRptPiq_sZD4SX_vl3ZzhZodKSfEu5M4rIktp74aKNgeiihCn3xb8L5UP6k-QAiPUyzbZISuCQZftwmn27_rqjqwpMrlvQoZoPeFTrl9FN7YNMuSWmJg3omsf9vOPzXHfjIMQMxg2MdEuJcdCC0Z1DR14xe9kTCl4" />
                                <button className="absolute bottom-4 right-4 bg-white/90 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="material-symbols-outlined text-secondary">add_shopping_cart</span>
                                </button>
                            </div>
                            <h3 className="font-bold text-secondary dark:text-white group-hover:text-primary">Night Recovery Serum</h3>
                            <p className="text-primary font-bold">$65.00</p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-secondary text-background-light py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-6 text-primary">
                            <span className="material-symbols-outlined text-3xl">spa</span>
                            <h2 className="text-2xl font-display font-bold">SoftLips</h2>
                        </div>
                        <p className="text-background-light/60 max-w-sm mb-8">
                            Crafting premium nourishment using the finest natural ingredients since 1924. We believe in beauty that's as kind to the earth as it is to your skin.
                        </p>
                        <div className="flex gap-4">
                            <a className="w-10 h-10 rounded-full border border-background-light/20 flex items-center justify-center hover:bg-primary transition-colors" href="#">
                                <span className="material-symbols-outlined text-xl">camera</span>
                            </a>
                            <a className="w-10 h-10 rounded-full border border-background-light/20 flex items-center justify-center hover:bg-primary transition-colors" href="#">
                                <span className="material-symbols-outlined text-xl">share</span>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-display text-xl font-bold mb-6">Collections</h4>
                        <ul className="space-y-4 text-background-light/60">
                            <li><a className="hover:text-primary" href="#">Lip Care</a></li>
                            <li><a className="hover:text-primary" href="#">Face Oils</a></li>
                            <li><a className="hover:text-primary" href="#">Body Rituals</a></li>
                            <li><a className="hover:text-primary" href="#">Gift Sets</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-display text-xl font-bold mb-6">Join the Heritage</h4>
                        <p className="text-sm text-background-light/60 mb-4">Sign up for exclusive rituals and early access.</p>
                        <div className="flex border-b border-background-light/30 pb-2">
                            <input className="bg-transparent border-none focus:outline-none focus:ring-0 text-sm w-full" placeholder="Your Email" type="email" />
                            <button className="text-primary material-symbols-outlined">arrow_forward</button>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-background-light/10 text-center text-background-light/40 text-xs">
                    © 2024 SoftLips Heritage Care. All Rights Reserved.
                </div>
            </footer>

            {/* Sticky Mobile Add to Cart */}
            <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-background-dark border-t border-primary/10 p-4 z-50 flex items-center justify-between shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
                <div className="flex flex-col">
                    <span className="text-xs text-secondary/60">Total</span>
                    <span className="text-xl font-bold text-secondary dark:text-primary">$24.00</span>
                </div>
                <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-primary/20 transition-all flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">shopping_cart</span>
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default SoftLips;
