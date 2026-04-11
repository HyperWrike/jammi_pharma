"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { subscribeToDocument, subscribeToCollection } from '../../../../lib/adminDb';
import { MOCK_PRODUCTS } from '../../../../constants';
import { uploadFile } from '../../../../lib/storage';
import { useCart } from '../../../../hooks/useCart';
import LiveEditable from '../../../../components/admin/LiveEditable';
import EditorImage from '../../../../components/EditorImage';
import { useAdmin } from '../../../../components/admin/AdminContext';
import { updateDocument } from '../../../../lib/adminDb';

interface Product {
    id: string;
    name: string;
    label: string;
    shortDesc: string;
    price: number;
    image: string;
    category: string;
    description?: string;
    features?: Array<{ title: string; desc: string; icon: string }>;
    botanicals?: Array<{ name: string; desc: string; image: string }>;
    ritual?: Array<{ title: string; desc: string }>;
    stockStatus?: string;
    ingredients?: string;
    indications?: string;
    dosage?: string;
    rating?: number;
}

export default function ProductTemplate({ productId, initialData }: { productId: string, initialData?: any }) {
    const router = useRouter();
    const [product, setProduct] = useState<Product | null>(initialData || null);
    const [isLoading, setIsLoading] = useState(!initialData);
    const [quantity, setQuantity] = useState(1);
    const [selectedAngle, setSelectedAngle] = useState(0);
    const [addedToCart, setAddedToCart] = useState(false);
    const [addingToCart, setAddingToCart] = useState(false);
    const [inWishlist, setInWishlist] = useState(false);
    const { addToCart } = useCart();
    const { isAdmin, isEditMode } = useAdmin();

    // Reviews & Bundles
    const [reviews, setReviews] = useState<any[]>([]);
    const [bundles, setBundles] = useState<any[]>([]);
    
    // Product Tabs State
    const [activeTab, setActiveTab] = useState<'description' | 'ingredients' | 'indications' | 'dosage'>('description');
    
    // Review Form States
    const [reviewName, setReviewName] = useState('');
    const [reviewRating, setReviewRating] = useState(5);
    const [reviewComment, setReviewComment] = useState('');
    const [reviewImage, setReviewImage] = useState<File | null>(null);
    const [isSubmittingReview, setIsSubmittingReview] = useState(false);
    const [reviewSuccess, setReviewSuccess] = useState(false);

    // Load wishlist from localStorage
    useEffect(() => {
        const wishlist = JSON.parse(localStorage.getItem('jammi_wishlist') || '[]');
        setInWishlist(wishlist.includes(productId));
    }, [productId]);

    // Toggle wishlist
    const toggleWishlist = () => {
        const wishlist = JSON.parse(localStorage.getItem('jammi_wishlist') || '[]');
        if (inWishlist) {
            const updated = wishlist.filter((id: string) => id !== productId);
            localStorage.setItem('jammi_wishlist', JSON.stringify(updated));
        } else {
            wishlist.push(productId);
            localStorage.setItem('jammi_wishlist', JSON.stringify(wishlist));
        }
        setInWishlist(!inWishlist);
    };

    useEffect(() => {
        if (!initialData) setIsLoading(true);

        const unsubProduct = subscribeToDocument('products', productId, (dbProduct) => {
            if (dbProduct && !dbProduct.deleted && dbProduct.status !== 'Draft') {
                setProduct({
                    id: dbProduct.id,
                    name: dbProduct.name,
                    label: dbProduct.short_description || dbProduct.category || 'Wellness',
                    shortDesc: dbProduct.description ? dbProduct.description.replace(/<[^>]+>/g, '') : (dbProduct.shortDesc || 'Traditional formulation.'),
                    price: dbProduct.price || 0,
                    image: dbProduct.images?.[0] || dbProduct.image || '...',
                    category: dbProduct.category || 'Wellness',
                    features: dbProduct.features || [],
                    botanicals: dbProduct.botanicals || [],
                    ritual: dbProduct.ritual || [],
                    stockStatus: dbProduct.stock_status || 'In Stock',
                    description: dbProduct.description,
                    ingredients: dbProduct.ingredients,
                    indications: dbProduct.indications,
                    dosage: dbProduct.dosage
                });
            } else if (!dbProduct || (dbProduct.deleted && dbProduct.status)) {
                // If soft deleted from DB, don't fallback to mock if it's already in DB as deleted
                if (dbProduct && dbProduct.deleted) {
                     setProduct(null);
                } else {
                     const mockP = MOCK_PRODUCTS.find((m: any) => String(m.id) === productId);
                     if (mockP) {
                         setProduct({ ...mockP, id: String(mockP.id) });
                     } else {
                         setProduct(null);
                     }
                }
            }
            setIsLoading(false);
        });

        // Fetch Reviews once via standard API
        const fetchReviews = async () => {
             try {
                 const res = await fetch(`/api/reviews?productId=${productId}`);
                 if (res.ok) {
                     const data = await res.json();
                     setReviews(data);
                 }
             } catch (e) { console.error('Failed to load reviews', e); }
        };
        fetchReviews();

        // Poll for reviews every 10 seconds for real-time updates
        const reviewPollInterval = setInterval(fetchReviews, 10000);


        const unsubBundles = subscribeToCollection('bundles', (b) => {
            setBundles(b.filter(bundle => bundle.active && (bundle.product_ids || []).includes(productId)));
        });

        return () => {
            unsubProduct();
            unsubBundles();
            clearInterval(reviewPollInterval);
        };
    }, [productId]);

    const handleReviewSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!product) return;
        setIsSubmittingReview(true);
        try {
            let imageUrl = '';
            if (reviewImage) {
                try {
                    const uploadedUrl = await uploadFile(
                        reviewImage, 
                        'review-images', 
                        `reviews/${product.id}-${Date.now()}-${reviewImage.name.replace(/[^a-zA-Z0-9.\-_]/g, '')}`
                    );
                    if (uploadedUrl) imageUrl = uploadedUrl;
                } catch (uploadErr) {
                    console.error("Failed to upload review image", uploadErr);
                    // Silently continue for the review itself
                }
            }

            const newReview = {
                productId: product.id,
                productName: product.name,
                customerName: reviewName,
                rating: reviewRating,
                comment: reviewComment,
                imageUrl: imageUrl,
            };

            await fetch('/api/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newReview)
            });
            setReviewSuccess(true);
            setReviewName(''); setReviewRating(5); setReviewComment(''); setReviewImage(null);
        } catch (err) {
            console.error(err);
            alert("Failed to submit review.");
        } finally {
            setIsSubmittingReview(false);
        }
    };

    const handleQuantityChange = (action: 'increase' | 'decrease') => {
        if (action === 'decrease' && quantity > 1) {
            setQuantity(quantity - 1);
        } else if (action === 'increase') {
            setQuantity(quantity + 1);
        }
    };

    if (isLoading) {
        return (
            <div className="bg-background-light min-h-screen pt-20 flex justify-center items-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="bg-background-light min-h-screen pt-20 flex flex-col justify-center items-center">
                <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
                <Link href="/shop" className="text-primary underline font-bold">Back to Shop</Link>
            </div>
        );
    }

    const galleryImages = (Array.isArray((product as any)?.images) && (product as any).images.length > 0)
        ? (product as any).images.slice(0, 4)
        : [product.image, product.image, product.image, product.image];

    const imageAngles = [
        { id: 0, style: {}, icon: 'image', label: 'Front View', image: galleryImages[0] || product.image },
        { id: 1, style: {}, icon: 'zoom_in', label: 'Side View', image: galleryImages[1] || galleryImages[0] || product.image },
        { id: 2, style: {}, icon: 'view_in_ar', label: 'Back View', image: galleryImages[2] || galleryImages[0] || product.image },
        { id: 3, style: {}, icon: 'flip', label: 'Detail View', image: galleryImages[3] || galleryImages[0] || product.image },
    ];

    const reviewCount = reviews.length;
    const reviewAverage = reviewCount > 0
        ? reviews.reduce((sum, r) => sum + Number(r.rating || 0), 0) / reviewCount
        : 0;
    const starBuckets = [5, 4, 3, 2, 1].map((star) => {
        const count = reviews.filter((r) => Number(r.rating || 0) === star).length;
        const pct = reviewCount > 0 ? Math.round((count / reviewCount) * 100) : 0;
        return { star, count, pct };
    });

    return (
        <div className="bg-background-light text-slate-900 font-body min-h-screen pt-20">
            <main className="max-w-7xl mx-auto px-4 md:px-10 py-8">
                {/* Breadcrumbs */}
                <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-500 mb-8 font-body">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <span className="material-symbols-outlined text-xs">chevron_right</span>
                    <Link href="/shop" className="hover:text-primary transition-colors text-xs whitespace-nowrap">Wellness Collection</Link>
                    <span className="material-symbols-outlined text-xs">chevron_right</span>
                    <span className="text-secondary font-bold text-xs truncate max-w-[150px] sm:max-w-none">{product.name}</span>
                </nav>

                {/* Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 mb-24">
                    {/* Visual & Gallery */}
                    <div className="flex flex-col-reverse md:flex-row gap-6">
                        <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible pb-4 md:pb-0 hide-scrollbar shrink-0 w-full md:w-auto">
                            {imageAngles.map((angle, index) => (
                                <div
                                    key={angle.id}
                                    onClick={() => setSelectedAngle(index)}
                                    title={angle.label}
                                    className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl border-2 overflow-hidden p-2 cursor-pointer shadow-sm transition-all duration-300 flex-shrink-0 flex items-center justify-center relative ${selectedAngle === index ? 'border-primary bg-primary/5' : 'border-secondary/10 bg-white hover:border-primary/40'}`}
                                >
                                    <img alt={angle.label} className="w-full h-full object-contain" src={angle.image} />
                                </div>
                            ))}
                        </div>
                        {/* Main Image Viewport */}
                        <div className="flex-1 aspect-square sm:aspect-[4/5] bg-white shadow-2xl rounded-[2rem] border border-secondary/5 flex items-center justify-center p-8 relative overflow-hidden group w-full">
                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex gap-2 z-10">
                                <span className="bg-secondary text-white text-[9px] sm:text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">{product.category}</span>
                            </div>
                            <div className="w-full h-full relative z-10 drop-shadow-2xl transition-all duration-700 ease-in-out" style={imageAngles[selectedAngle].style}>
                                <EditorImage
                                    src={imageAngles[selectedAngle].image}
                                    alt={product.name}
                                    bucket="product-images"
                                    folder="products"
                                    onUpdate={async (newUrl) => {
                                        await updateDocument('products', product.id, { images: [newUrl] });
                                    }}
                                    editorActive={isAdmin && isEditMode}
                                    fitMode="contain"
                                    className="w-full h-full mix-blend-multiply dark:mix-blend-normal pointer-events-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Details Column */}
                    <div className="flex flex-col pt-2 md:pt-4">
                        <div className="mb-2">
                            <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-secondary mb-2 sm:mb-3 leading-tight font-display">
                                <LiveEditable collection="products" docId={product.id} field="name" className="block w-full">
                                    {product.name}
                                </LiveEditable>
                            </h2>
                            <h3 className="text-xl sm:text-2xl font-light text-slate-500 tracking-wide">
                                <LiveEditable collection="products" docId={product.id} field="category_name" className="block w-full">
                                    {product.label}
                                </LiveEditable>
                            </h3>
                        </div>
                        <p className="text-base sm:text-lg text-slate-600 mb-8 font-body leading-relaxed">
                            <LiveEditable collection="products" docId={product.id} field="description" multiline className="block w-full">
                                {product.shortDesc}
                            </LiveEditable>
                        </p>

                        {/* Price & Cart Actions */}
                        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-md">
                            <div className="flex justify-between items-end mb-6">
                                <div>
                                    <p className="text-sm text-slate-500 font-bold mb-1">Price</p>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl sm:text-4xl font-black text-[var(--purple)] tracking-tight">₹</span>
                                        <LiveEditable collection="products" docId={product.id} field="price" inputType="number" className="text-3xl sm:text-4xl font-black text-[var(--purple)] tracking-tight">
                                            {product.price ?? '—'}
                                        </LiveEditable>
                                        <span className="text-xs sm:text-sm font-semibold text-[var(--purple)]/80 ml-1">/ Unit</span>
                                    </div>
                                </div>
                                <div className="text-right hidden sm:block">
                                    <span className={`inline-flex items-center gap-1 text-xs sm:text-sm font-bold px-3 py-1 rounded-lg border ${product.stockStatus === 'Out of Stock' ? 'text-red-800 bg-red-100 border-red-200' : 'text-emerald-800 bg-emerald-100 border-emerald-200'}`}>
                                        <span className="material-symbols-outlined text-[12px] sm:text-[14px]">
                                            {product.stockStatus === 'Out of Stock' ? 'warning' : 'bolt'}
                                        </span> 
                                        <LiveEditable 
                                            collection="products" 
                                            docId={product.id} 
                                            field="stockStatus" 
                                            inputType="select" 
                                            options={[
                                                { label: 'In Stock', value: 'In Stock' },
                                                { label: 'Out of Stock', value: 'Out of Stock' }
                                            ]}
                                        >
                                            {product.stockStatus || 'In Stock'}
                                        </LiveEditable>
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex border-2 border-slate-200 bg-white rounded-xl overflow-hidden h-14 w-full sm:w-36 shrink-0">
                                    <button onClick={() => handleQuantityChange('decrease')} className="flex-1 hover:bg-slate-50 transition-colors text-slate-600 flex items-center justify-center">
                                        <span className="material-symbols-outlined flex">remove</span>
                                    </button>
                                    <div className="flex-1 flex items-center justify-center font-bold text-lg select-none">
                                        {quantity}
                                    </div>
                                    <button onClick={() => handleQuantityChange('increase')} className="flex-1 hover:bg-slate-50 transition-colors text-slate-600 flex items-center justify-center">
                                        <span className="material-symbols-outlined flex">add</span>
                                    </button>
                                </div>
                                <button 
                                    onClick={async () => {
                                        if (addingToCart) return;
                                        setAddingToCart(true);
                                        try {
                                            await addToCart({
                                                id: product.id,
                                                name: product.name,
                                                price: product.price,
                                                image: product.image,
                                                slug: product.id,
                                                quantity: quantity,
                                                variant_id: null,
                                                variant_label: null
                                            });
                                            setAddedToCart(true);
                                            setTimeout(() => setAddedToCart(false), 2200);
                                        } finally {
                                            setAddingToCart(false);
                                        }
                                    }}
                                    disabled={addingToCart}
                                    className={`flex-1 font-bold text-base sm:text-lg h-14 rounded-xl shadow-lg transition-all flex items-center justify-center gap-3 ${
                                        addedToCart
                                            ? 'bg-green-600 shadow-green-600/20 text-white'
                                            : 'bg-secondary text-white shadow-secondary/20 hover:bg-slate-800'
                                    }`}>
                                    <span className="material-symbols-outlined flex">
                                        {addedToCart ? 'check_circle' : addingToCart ? 'hourglass_top' : 'shopping_basket'}
                                    </span>
                                    {addedToCart ? 'Added to Cart!' : addingToCart ? 'Adding...' : 'Add to Cart'}
                                </button>
                                <button 
                                    onClick={toggleWishlist}
                                    className={`h-14 w-14 rounded-xl shadow-lg transition-all flex items-center justify-center font-bold ${
                                        inWishlist
                                            ? 'bg-red-600 shadow-red-600/20 text-white'
                                            : 'bg-slate-100 text-secondary hover:bg-slate-200'
                                    }`}
                                    title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                                >
                                    <span className="material-symbols-outlined flex" style={{ fontVariationSettings: inWishlist ? '"FILL" 1' : '"FILL" 0' }}>
                                        favorite
                                    </span>
                                </button>
                            </div>

                            <div className="mt-6">
                                <img
                                    src="/images/badges/2.jpeg"
                                    className="h-14 sm:h-16 object-contain mix-blend-multiply"
                                    alt="Certifications - 100% Natural, Vegetarian, Non-GMO, GMP Certified, Ethically Sourced"
                                    onError={(e) => e.currentTarget.style.display = 'none'}
                                />
                            </div>
                            
                            {/* Toast Notification */}
                            {addedToCart && (
                                <div className="fixed bottom-6 right-6 bg-forest text-white px-5 py-3 rounded-lg shadow-xl z-50 flex items-center gap-3 font-medium animate-in fade-in slide-in-from-bottom-5 duration-300">
                                    <span className="material-symbols-outlined text-saffron">check_circle</span>
                                    {product.name} added to cart
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* 4 Tabs Section */}
                <div className="mb-16 sm:mb-24 bg-white p-8 sm:p-12 rounded-[2rem] shadow-sm border border-slate-200">
                    <div className="flex flex-wrap gap-6 border-b border-slate-200 pb-4 mb-8">
                        {['description', 'ingredients', 'indications', 'dosage'].map(tab => (
                            <button 
                                key={tab}
                                onClick={() => setActiveTab(tab as any)}
                                className={`text-sm sm:text-base font-bold uppercase tracking-widest px-2 py-2 transition-colors relative ${activeTab === tab ? 'text-[var(--purple)]' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                {tab === 'description' ? 'Product Description' : tab === 'ingredients' ? 'Key Ingredients' : tab === 'indications' ? 'Indications' : 'Dosage'}
                                {activeTab === tab && (
                                    <div className="absolute bottom-[-17px] left-0 right-0 h-1 bg-[var(--purple)] rounded-t-full"></div>
                                )}
                            </button>
                        ))}
                    </div>
                    <div className="prose prose-lg max-w-none text-slate-800 font-body leading-relaxed">
                        <LiveEditable collection="products" docId={product.id} field={activeTab} multiline>
                            {(product as any)[activeTab] || `No ${activeTab} information available yet.`}
                        </LiveEditable>
                    </div>
                </div>

                {/* Bundles Section */}
                {bundles.length > 0 && (
                    <section className="mb-16 sm:mb-24">
                        <h3 className="text-3xl font-bold text-secondary dark:text-white mb-8 font-display">Special Offers & Bundles</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {bundles.map(bundle => (
                                <div key={bundle.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center gap-6">
                                    <div className="w-24 h-24 bg-slate-100 rounded-xl overflow-hidden shrink-0">
                                        {bundle.image_url ? <img src={bundle.image_url} className="w-full h-full object-cover" /> : <span className="material-symbols-outlined text-4xl text-slate-300 w-full h-full flex justify-center items-center">image</span>}
                                    </div>
                                    <div className="flex-1">
                                        <div className="inline-block bg-saffron text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded mb-2">{bundle.discount_percent}% OFF Bundle</div>
                                        <h4 className="text-lg font-bold text-slate-800">{bundle.name}</h4>
                                        <p className="text-sm text-slate-500 line-clamp-2 mt-1">{bundle.description}</p>
                                        <button className="mt-4 text-primary font-bold text-sm hover:underline">View Bundle Details →</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Reviews Section */}
                <section className="mb-16 sm:mb-24 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
                    <div className="mb-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="rounded-2xl border border-slate-200 p-5 bg-slate-50/70">
                            <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-2">Overall Rating</p>
                            <p className="text-4xl font-black text-secondary leading-none">{reviewAverage.toFixed(1)}</p>
                            <div className="flex items-center gap-1 text-saffron mt-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span key={star} className={`material-symbols-outlined text-[18px] ${star <= Math.round(reviewAverage) ? 'font-variation-settings-"FILL" 1' : ''}`}>star</span>
                                ))}
                            </div>
                            <p className="text-xs text-slate-500 mt-2">Based on {reviewCount} testimonial{reviewCount === 1 ? '' : 's'}</p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 p-5 lg:col-span-2">
                            <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-4">Customer Sentiment</p>
                            <div className="space-y-2">
                                {starBuckets.map((bucket) => (
                                    <div key={bucket.star} className="grid grid-cols-[40px_1fr_45px] items-center gap-3 text-xs">
                                        <span className="font-semibold text-slate-700">{bucket.star}★</span>
                                        <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                                            <div className="h-full bg-amber-400" style={{ width: `${bucket.pct}%` }} />
                                        </div>
                                        <span className="text-slate-500 text-right">{bucket.pct}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Write a Review */}
                        <div className="lg:col-span-1">
                            <h3 className="text-2xl font-bold text-secondary dark:text-white mb-2 font-display">Customer Reviews</h3>
                            <p className="text-slate-500 text-sm mb-6">Share your experience with this formulation.</p>

                            {reviewSuccess ? (
                                <div className="bg-green-50 text-green-800 p-4 rounded-xl border border-green-200 text-sm font-medium flex items-start gap-2">
                                    <span className="material-symbols-outlined text-[20px] text-green-500">check_circle</span>
                                    Thank you! Your review has been submitted and is pending moderation.
                                </div>
                            ) : (
                                <form onSubmit={handleReviewSubmit} className="space-y-3">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Your Name</label>
                                        <input type="text" value={reviewName} onChange={e => setReviewName(e.target.value)} required className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:border-primary" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Rating</label>
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <span key={star} onClick={() => setReviewRating(star)} className={`material-symbols-outlined text-2xl cursor-pointer transition-colors ${star <= reviewRating ? 'text-saffron font-variation-settings-"FILL" 1' : 'text-slate-300'}`}>
                                                    star
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Your Review</label>
                                        <textarea value={reviewComment} onChange={e => setReviewComment(e.target.value)} required rows={3} className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:border-primary resize-none" placeholder="How did this product help you?" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Add an Image (Optional)</label>
                                        <input 
                                            type="file" 
                                            accept="image/*"
                                            onChange={e => {
                                                if (e.target.files && e.target.files[0]) {
                                                    setReviewImage(e.target.files[0]);
                                                }
                                            }}
                                            className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-colors"
                                        />
                                    </div>
                                    <button type="submit" disabled={isSubmittingReview} className="w-full bg-secondary text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-colors disabled:opacity-50">
                                        {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Reviews List */}
                        <div className="lg:col-span-2">
                            {reviews.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-slate-400 p-8 border-2 border-dashed border-slate-200 rounded-2xl">
                                    <span className="material-symbols-outlined text-4xl mb-2">reviews</span>
                                    <p>No reviews yet. Be the first to share your experience!</p>
                                </div>
                            ) : (
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {reviews.map(review => (
                                        <div key={review.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                            <div className="flex justify-between items-start gap-3 mb-2">
                                                <div>
                                                    <h4 className="font-bold text-slate-900 text-sm">{review.customerName}</h4>
                                                    <span className="text-[11px] text-slate-500">{new Date(review.createdAt).toLocaleDateString()}</span>
                                                </div>
                                                <div className="flex text-saffron">
                                                    {[1, 2, 3, 4, 5].map(star => (
                                                        <span key={star} className={`material-symbols-outlined text-[14px] ${star <= review.rating ? 'font-variation-settings-"FILL" 1' : ''}`}>
                                                            star
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="inline-block text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-1 rounded-full mb-2">
                                                Verified Testimonial
                                            </div>
                                            <p className="text-slate-600 text-xs leading-relaxed line-clamp-5">{review.comment}</p>
                                            {review.imageUrl && (
                                                <img src={review.imageUrl} alt="Review" className="mt-3 h-24 w-full rounded-lg object-cover bg-slate-100 border border-slate-200" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
}
