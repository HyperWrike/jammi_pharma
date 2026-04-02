"use client";

import React, { useState, useEffect } from 'react';
import { useCart } from '../hooks/useCart';
import { useFederationStore } from '../store/federationStore';
import LiveEditable from '../components/admin/LiveEditable';
import { useCMSContent } from '../hooks/useCMSContent';

function CartSkeleton() {
  return (
    <div>
      {[1, 2, 3].map(i => (
        <div key={i} style={{ display: 'flex', gap: 16, padding: '12px 0', borderBottom: '1px solid #f5f0e8', alignItems: 'center' }}>
          <div style={{ width: 80, height: 80, borderRadius: 12, background: 'linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite', flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ height: 14, width: '65%', borderRadius: 4, background: '#f0f0f0', marginBottom: 8 }} />
            <div style={{ height: 12, width: '35%', borderRadius: 4, background: '#f0f0f0', marginBottom: 6 }} />
            <div style={{ height: 14, width: '25%', borderRadius: 4, background: '#f0f0f0' }} />
          </div>
        </div>
      ))}
      <style>{`@keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }`}</style>
    </div>
  );
}

const Checkout: React.FC = () => {
  const { content } = useCMSContent('checkout');
  const { cartItems: hookCartItems, totalItems, subtotal, updateQuantity, removeFromCart, clearCart, addToCart, increaseQty, decreaseQty } = useCart();
  
  // CMS Helper
  const CMS = ({ section = 'general', field, fallback, multiline, inputType }: any) => (
    <LiveEditable 
        cmsKey={{ page: 'checkout', section, content_key: field }}
        multiline={multiline}
        inputType={inputType}
    >
        {content?.[section]?.[field] || fallback}
    </LiveEditable>
  );
  const cartItems = hookCartItems || [];
  const loading = false; // Add a fallback for loading if needed, or remove usage if not provided by context
  const guestId = ''; // Add a fallback for guestId if needed
  const { products } = useFederationStore();

  const [isPlacing, setIsPlacing] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'CARD' | 'COD'>('UPI');

  // Promotions states
  const [coupons, setCoupons] = useState<any[]>([]);
  const [bundles, setBundles] = useState<any[]>([]);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<any | null>(null);
  const [couponError, setCouponError] = useState('');


  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    pincode: '',
    phone: '',
    email: ''
  });

  // Fetch active promotions
  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const [couponsRes, bundlesRes] = await Promise.all([
          fetch('/api/coupons'),
          fetch('/api/bundles')
        ]);
        
        if (couponsRes.ok) {
          const couponsData = await couponsRes.json();
          const couponList = Array.isArray(couponsData) ? couponsData : (couponsData?.data || []);
          setCoupons(couponList.filter((c: any) => c.status === 'active'));
        }
        
        if (bundlesRes.ok) {
          const bundlesData = await bundlesRes.json();
          const bundleList = Array.isArray(bundlesData) ? bundlesData : (bundlesData?.data || []);
          setBundles(bundleList.filter((b: any) => b.status === 'active'));
        }
      } catch (err) {
        console.error("Failed to fetch promotions", err);
      }
    };
    fetchPromotions();
  }, []);

  // --- Evaluate Bundles ---
  const cartItemIds = cartItems.map(item => item.product_id);

  let totalBundleDiscount = 0;
  const appliedBundles: any[] = [];
  const suggestedBundleProducts: any[] = [];

  const sortedBundles = [...bundles].sort((a, b) => b.discount_percent - a.discount_percent);
  const usedProductIds = new Set<string>();

  sortedBundles.forEach(bundle => {
    const bundleProductIds = bundle.product_ids || [];
    if (bundleProductIds.length === 0) return;

    // Check overlaps
    const isFullyMatched = bundleProductIds.every((id: string) => cartItemIds.includes(id));
    const isPartiallyMatched = !isFullyMatched && bundleProductIds.some((id: string) => cartItemIds.includes(id));

    if (isFullyMatched) {
      const hasOverlap = bundleProductIds.some((id: string) => usedProductIds.has(id));
      if (!hasOverlap) {
        appliedBundles.push(bundle);
        bundleProductIds.forEach((id: string) => usedProductIds.add(id));

        let bundlePriceSum = 0;
        bundleProductIds.forEach((id: string) => {
          const item = cartItems.find(cItem => (cItem.product_id || cItem.id) === id);
          if (item?.product?.price) bundlePriceSum += item.product.price;
          else if (item?.price) bundlePriceSum += item.price;
        });

        totalBundleDiscount += (bundlePriceSum * bundle.extra_discount_percent) / 100;
      }
    } else if (isPartiallyMatched) {
      // Suggest missing products
      const missingIds = bundleProductIds.filter((id: string) => !cartItemIds.includes(id));
      missingIds.forEach((id: string) => {
        const prod = products.find(p => p.id === id);
        if (prod && !suggestedBundleProducts.find(s => s.id === id)) {
          suggestedBundleProducts.push({
            ...prod,
            suggestedByBundle: bundle.name,
            discountPercentage: bundle.extra_discount_percent
          });
        }
      });
    }
  });

  // Calculate totals
  let couponDiscountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discount_type === 'percentage') {
      couponDiscountAmount = Math.round((subtotal * Number(appliedCoupon.discount_value || 0)) / 100);
    } else {
      couponDiscountAmount = Number(appliedCoupon.discount_value || 0);
    }
  }

  totalBundleDiscount = Math.round(totalBundleDiscount);
  const totalDiscount = Math.round(couponDiscountAmount + totalBundleDiscount);
  const total = Math.max(0, subtotal - totalDiscount);

  const handleAddBundleProduct = async (product: any) => {
    await addToCart({ ...product, id: product.id, product_id: product.id });
  };

  const handleRemoveItem = async (productId: string) => {
    await removeFromCart(productId);

    // Auto-remove coupon if minimum requirement failure
    if (appliedCoupon) {
      const newSubtotal = cartItems.filter(i => i.product_id !== productId).reduce((acc, item) => acc + (item.product?.price || 0) * item.quantity, 0);
      if (newSubtotal < appliedCoupon.min_order_value) {
        setAppliedCoupon(null);
        setCouponError('Coupon removed: Order sum fell below minimum required.');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleApplyCoupon = () => {
    setCouponError('');
    setAppliedCoupon(null);

    if (!couponCode.trim()) return;

    const normalizedCode = couponCode.trim().toUpperCase();
    const foundCoupon = coupons.find((c) => String(c.code || '').trim().toUpperCase() === normalizedCode);

    if (!foundCoupon) {
      setCouponError('Invalid coupon code.');
      return;
    }

    const minOrderValue = Number(foundCoupon.min_order_value || 0);
    if (subtotal < minOrderValue) {
      setCouponError(`Minimum order amount of ₹${minOrderValue} required.`);
      return;
    }

    setAppliedCoupon(foundCoupon);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
  };

  const handlePlaceOrder = async () => {
    if (!formData.email || !formData.firstName || !formData.address) {
      alert("Please fill in required fields (Name, Email, Address)");
      return;
    }

    setIsPlacing(true);
    try {
      const customerName = `${formData.firstName} ${formData.lastName}`.trim();
      const shippingAddress = {
        address: formData.address,
        city: formData.city,
        pincode: formData.pincode,
      };

      // ── POST to Supabase-backed API route ──────────────────────────────
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          shippingAddress,
          items: cartItems.map(item => ({
            productId: item.product_id,
            name: item.product?.name,
            price: item.product?.price,
            quantity: item.quantity,
            image: item.product?.images?.[0] || ''
          })),
          subtotal,
          discount: totalDiscount,
          couponCode: appliedCoupon?.code || null,
          total,
          paymentMethod,
          guestId, // Include guestId in the payload
        }),
      });

      if (res.status === 429) {
        alert('Too many order attempts. Please wait a moment and try again.');
        return;
      }

      const data = await res.json();

      if (!res.ok) {
        console.error('Order creation error:', data);
        alert('Failed to create order. Please try again.');
        return;
      }

      setOrderNumber(data.orderNumber);
      setOrderConfirmed(true);
      await clearCart(); // Remove from Supabase

      // Only redirect to Razorpay for online payments.
      // COD should stay on-site and rely on confirmation + email.
      if (paymentMethod !== 'COD') {
        window.location.href = "https://rzp.io/rzp/ZJ3foBWO";
      }

    } catch (err) {
      console.error("Error placing order:", err);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsPlacing(false);
    }
  };

  if (orderConfirmed) {
    return (
      <div className="max-w-[600px] mx-auto px-6 py-24 mt-10 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="size-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
          <span className="material-symbols-outlined text-4xl">check_circle</span>
        </div>
        <h2 className="text-3xl font-bold serif mb-4 text-forest"><LiveEditable collection="content" docId="checkout" field="confirmTitle">Order Confirmed!</LiveEditable></h2>
        <p className="text-lg text-slate-600 mb-8">
          <LiveEditable collection="content" docId="checkout" field="confirmText" multiline>Thank you for your order. Your order ID is</LiveEditable> <span className="font-bold text-primary">{orderNumber}</span>.
        </p>
        <button
          onClick={() => window.location.href = '/'}
          className="bg-primary hover:bg-[#c07a28] text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          <LiveEditable collection="content" docId="checkout" field="returnHomeBtn">Return to Home</LiveEditable>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12 mt-10">
      <div className="flex flex-wrap gap-2 py-2 mb-8 text-primary text-sm font-medium uppercase tracking-widest">
        <span><LiveEditable collection="content" docId="checkout" field="breadcrumbCart">Cart</LiveEditable></span>
        <span className="text-cream-dark">/</span>
        <span className="text-forest"><LiveEditable collection="content" docId="checkout" field="breadcrumbCheckout">Checkout</LiveEditable></span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 flex flex-col gap-8">
          <section className="bg-white p-6 rounded-2xl border border-cream-dark shadow-sm">
            <div className="flex items-center gap-2 mb-6 text-forest">
              <span className="material-symbols-outlined text-primary">home_pin</span>
              <h2 className="text-2xl font-bold serif"><LiveEditable collection="content" docId="checkout" field="deliveryTitle">Delivery Address</LiveEditable></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                  <CMS section="form" field="labelFirstName" fallback="First Name *" />
                </label>
                <input name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full rounded-xl border border-cream-dark focus:ring-2 focus:ring-primary/20 focus:border-primary h-12 px-4 transition-all" placeholder="First Name *" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                   <CMS section="form" field="labelLastName" fallback="Last Name" />
                </label>
                <input name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full rounded-xl border border-cream-dark focus:ring-2 focus:ring-primary/20 focus:border-primary h-12 px-4 transition-all" placeholder="Last Name" />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                   <CMS section="form" field="labelEmail" fallback="Email Address *" />
                </label>
                <input name="email" type="email" value={formData.email} onChange={handleInputChange} className="w-full rounded-xl border border-cream-dark focus:ring-2 focus:ring-primary/20 focus:border-primary h-12 px-4 transition-all" placeholder="Email Address *" />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                   <CMS section="form" field="labelPhone" fallback="Phone Number" />
                </label>
                <input name="phone" value={formData.phone} onChange={handleInputChange} className="w-full rounded-xl border border-cream-dark focus:ring-2 focus:ring-primary/20 focus:border-primary h-12 px-4 transition-all" placeholder="Phone Number" />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                   <CMS section="form" field="labelAddress" fallback="Address line 1 *" />
                </label>
                <input name="address" value={formData.address} onChange={handleInputChange} className="w-full rounded-xl border border-cream-dark focus:ring-2 focus:ring-primary/20 focus:border-primary h-12 px-4 transition-all" placeholder="Address line 1 *" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                   <CMS section="form" field="labelCity" fallback="Town / City" />
                </label>
                <input name="city" value={formData.city} onChange={handleInputChange} className="w-full rounded-xl border border-cream-dark focus:ring-2 focus:ring-primary/20 focus:border-primary h-12 px-4 transition-all" placeholder="Town / City" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                   <CMS section="form" field="labelPincode" fallback="Pincode" />
                </label>
                <input name="pincode" value={formData.pincode} onChange={handleInputChange} className="w-full rounded-xl border border-cream-dark focus:ring-2 focus:ring-primary/20 focus:border-primary h-12 px-4 transition-all" placeholder="Pincode" />
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-2xl border border-cream-dark shadow-sm">
            <div className="flex items-center justify-between mb-6 text-forest">
              <div className="flex items-center gap-2 font-bold serif text-2xl">
                <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
                <LiveEditable collection="content" docId="checkout" field="paymentTitle">Payment Method</LiveEditable>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { label: 'UPI (GPay, PhonePe)', value: 'UPI' as const },
                { label: 'Credit / Debit Cards', value: 'CARD' as const },
                { label: 'Cash on Delivery', value: 'COD' as const },
              ].map((method) => (
                <label key={method.value} className={`flex items-center justify-between p-5 border rounded-xl cursor-pointer transition-all ${paymentMethod === method.value ? 'border-primary bg-primary/5 shadow-sm' : 'border-slate-200 hover:border-primary/50'}`}>
                  <div className="flex items-center gap-4">
                    <input
                      checked={paymentMethod === method.value}
                      onChange={() => setPaymentMethod(method.value)}
                      name="payment"
                      type="radio"
                      className="w-5 h-5 text-primary focus:ring-primary border-slate-300"
                    />
                    <p className="font-bold text-slate-800">{method.label}</p>
                  </div>
                </label>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:col-span-4">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-cream-dark shadow-sm">
              <h3 className="text-xl font-bold serif mb-6 border-b border-cream-dark pb-4 text-forest"><LiveEditable collection="content" docId="checkout" field="orderSummaryTitle">Order Summary</LiveEditable></h3>

              <div className="space-y-5 mb-6">
                {cartItems.length === 0 ? (
                  <p className="text-center text-slate-500 py-4"><LiveEditable collection="content" docId="checkout" field="emptyCart">Your cart is empty.</LiveEditable></p>
                ) : (
                  cartItems.map((item) => {
                    const isPartInBundle = usedProductIds.has(item.product_id);
                    return (
                      <div key={item.id} className="flex gap-4 relative group">
                        <div className="size-20 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                          {item.product?.images?.[0] ? (
                            <img src={item.product.images[0]} className="w-full h-full object-cover" alt={item.product.name} />
                          ) : (
                            <span className="material-symbols-outlined text-slate-300 text-3xl">image</span>
                          )}
                        </div>
                        <div className="flex-1 py-1">
                          <p className="text-sm font-bold leading-tight text-slate-800 line-clamp-2 pr-6">{item.product?.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <button onClick={() => decreaseQty(item.product_id || item.id, item.variant_id)} className="text-slate-500 hover:text-primary">
                              <span className="material-symbols-outlined text-[14px]">remove</span>
                            </button>
                            <p className="text-xs text-slate-500 font-bold">Qty: {item.quantity}</p>
                            <button onClick={() => increaseQty(item.product_id || item.id, item.variant_id)} className="text-slate-500 hover:text-primary">
                              <span className="material-symbols-outlined text-[14px]">add</span>
                            </button>
                          </div>
                          <div className="flex items-baseline gap-2 mt-2">
                            <p className="text-sm font-bold text-primary">₹{(item.product?.price ?? 0) * item.quantity}</p>
                            {isPartInBundle && (
                              <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Bundle Applied</span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.product_id)}
                          className="absolute top-0 right-0 p-1 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-md"
                          title="Remove item"
                        >
                          <span className="material-symbols-outlined text-sm">close</span>
                        </button>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="space-y-3 pt-5 border-t border-cream-dark">
                <div className="flex justify-between text-slate-600 text-sm">
                  <span><LiveEditable collection="content" docId="checkout" field="labelSubtotal">Subtotal</LiveEditable></span>
                  <span className="font-medium">₹{subtotal}</span>
                </div>

                {appliedBundles.length > 0 && (
                  <div className="flex justify-between text-green-600 font-bold text-sm">
                    <span>Bundle Discount</span>
                    <span>-₹{totalBundleDiscount}</span>
                  </div>
                )}

                {appliedCoupon && (
                  <div className="flex justify-between text-green-600 font-bold text-sm">
                    <span>Coupon ({appliedCoupon.code})</span>
                    <span>-₹{couponDiscountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between text-xl font-bold pt-3 border-t border-slate-100 mt-3 text-forest">
                  <span><LiveEditable collection="content" docId="checkout" field="labelTotal">Total</LiveEditable></span>
                  <span className="text-primary">₹{total}</span>
                </div>
              </div>

              {/* Promo Code Section */}
              <div className="mt-6 pt-6 border-t border-cream-dark">
                <h4 className="text-sm font-bold serif mb-3 text-forest"><LiveEditable collection="content" docId="checkout" field="promoTitle">Apply Promo Code</LiveEditable></h4>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-green-50 border border-green-200 p-3.5 rounded-xl">
                    <div className="flex items-center gap-2 text-green-700">
                      <span className="material-symbols-outlined text-lg">check_circle</span>
                      <span className="font-bold text-sm">{appliedCoupon.code} Applied</span>
                    </div>
                    <button
                      onClick={handleRemoveCoupon}
                      className="text-xs text-red-600 hover:text-red-800 font-bold uppercase hover:bg-red-50 px-2 py-1 rounded transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => {
                          setCouponCode(e.target.value);
                          setCouponError('');
                        }}
                        placeholder="Enter coupon code"
                        className="flex-1 rounded-xl border border-cream-dark h-12 px-4 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary uppercase transition-all"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        disabled={!couponCode.trim()}
                        className="bg-slate-900 hover:bg-black disabled:bg-slate-300 text-white px-5 rounded-xl text-sm font-bold transition-colors"
                      >
                        <CMS section="summary" field="applyPromoBtn" fallback="Apply" />
                      </button>
                    </div>
                    {couponError && (
                      <p className="text-sm text-red-600 font-medium animate-in fade-in flex items-center gap-1 mt-1">
                        <span className="material-symbols-outlined text-[16px]">error</span>
                        {couponError}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={isPlacing || cartItems.length === 0}
                className="w-full bg-primary hover:bg-[#c07a28] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl mt-8 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                {isPlacing ? (
                  <div className="size-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span className="material-symbols-outlined">lock</span>
                )}
                {isPlacing ? 'Placing Order...' : <LiveEditable collection="content" docId="checkout" field="placeOrderBtn">Place Order Securely</LiveEditable>}
              </button>
            </div>

            {/* Bundle Suggestions Widget */}
            {suggestedBundleProducts.length > 0 && (
              <div className="bg-gradient-to-br from-[#FFFDF8] to-[#FDF4E7] p-6 rounded-2xl border border-primary/20 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-primary text-xl">auto_awesome</span>
                  <h3 className="text-lg font-bold serif text-forest">
                    <LiveEditable collection="content" docId="checkout" field="bundleTitle">Complete the Bundle</LiveEditable>
                  </h3>
                </div>
                <p className="text-sm text-slate-600 mb-5 leading-snug">
                  <LiveEditable collection="content" docId="checkout" field="bundleDesc" multiline>Add these items to unlock your combo discount instantly!</LiveEditable>
                </p>

                <div className="space-y-4">
                  {suggestedBundleProducts.map(product => (
                    <div key={product.id} className="flex items-center gap-4 bg-white p-3 rounded-xl border border-primary/10 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.1)] transition-all hover:border-primary/40 hover:shadow-md group">
                      <div className="size-16 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                        {product.image ? (
                          <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
                        ) : (
                          <span className="material-symbols-outlined text-slate-300">image</span>
                        )}
                      </div>
                      <div className="flex-1 py-1">
                        <p className="text-sm font-bold text-slate-800 line-clamp-2 pr-2">{product.name}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-sm font-bold text-primary">₹{product.price}</span>
                          <span className="text-[10px] text-primary/70 bg-primary/10 px-1.5 rounded font-bold uppercase">
                            <CMS section="summary" field="recommendedPill" fallback="Recommended" />
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleAddBundleProduct(product)}
                        className="w-10 h-10 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all flex items-center justify-center flex-shrink-0 mr-1"
                        title="Add to order"
                      >
                        <span className="material-symbols-outlined font-bold">add</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
