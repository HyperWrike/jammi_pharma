import * as React from 'react';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

interface OrderConfirmationEmailProps {
  customerName: string;
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  discount?: number;
  total: number;
  shippingAddress: string;
  phone?: string;
}

export function OrderConfirmationEmail({
  customerName,
  orderNumber,
  items,
  subtotal,
  discount = 0,
  total,
  shippingAddress,
  phone,
}: OrderConfirmationEmailProps) {
  return (
    <div style={{ fontFamily: 'Georgia, serif', backgroundColor: '#FAF8F2', padding: '0', margin: '0' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#1A3C34', padding: '32px 40px', textAlign: 'center' }}>
        <h1 style={{ color: '#D4A853', margin: '0', fontSize: '28px', letterSpacing: '2px', fontFamily: 'Georgia, serif' }}>
          JAMMI PHARMACEUTICALS
        </h1>
        <p style={{ color: '#A8C4B8', margin: '8px 0 0', fontSize: '13px', letterSpacing: '1px' }}>
          128 YEARS OF AYURVEDIC HEALING
        </p>
      </div>

      {/* Body */}
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 32px', backgroundColor: '#FFFFFF' }}>
        {/* Greeting */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '40px', marginBottom: '8px' }}>🌿</div>
          <h2 style={{ color: '#1A3C34', fontSize: '24px', margin: '0 0 12px', fontFamily: 'Georgia, serif' }}>
            Order Confirmed!
          </h2>
          <p style={{ color: '#64748B', fontSize: '15px', margin: '0', lineHeight: '1.6' }}>
            Namaste <strong style={{ color: '#1A3C34' }}>{customerName}</strong>,<br />
            Thank you for choosing Jammi. Your order has been received and is being prepared with care.
          </p>
        </div>

        {/* Order details pill */}
        <div style={{ backgroundColor: '#F0F9F4', border: '1px solid #D1FAE5', borderRadius: '12px', padding: '16px 24px', marginBottom: '32px', textAlign: 'center' }}>
          <p style={{ margin: '0', fontSize: '13px', color: '#6B7280', letterSpacing: '1px', textTransform: 'uppercase' }}>Order Number</p>
          <p style={{ margin: '4px 0 0', fontSize: '22px', fontWeight: 'bold', color: '#1A3C34', fontFamily: 'Georgia, serif' }}>
            {orderNumber}
          </p>
        </div>

        {/* Items */}
        <h3 style={{ color: '#1A3C34', fontSize: '16px', fontFamily: 'Georgia, serif', marginBottom: '16px', borderBottom: '2px solid #F0F9F4', paddingBottom: '8px' }}>
          Items Ordered
        </h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8F5EE' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', fontSize: '12px', color: '#6B7280', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Product</th>
              <th style={{ padding: '10px 12px', textAlign: 'center', fontSize: '12px', color: '#6B7280', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Qty</th>
              <th style={{ padding: '10px 12px', textAlign: 'right', fontSize: '12px', color: '#6B7280', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Price</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px', fontSize: '14px', color: '#1E293B', fontWeight: '500' }}>{item.name}</td>
                <td style={{ padding: '12px', textAlign: 'center', fontSize: '14px', color: '#64748B' }}>×{item.quantity}</td>
                <td style={{ padding: '12px', textAlign: 'right', fontSize: '14px', color: '#1E293B', fontWeight: '600' }}>
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div style={{ backgroundColor: '#F8F5EE', borderRadius: '8px', padding: '16px 20px', marginBottom: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '14px', color: '#64748B' }}>Subtotal</span>
            <span style={{ fontSize: '14px', color: '#1E293B' }}>₹{subtotal.toLocaleString('en-IN')}</span>
          </div>
          {discount > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '14px', color: '#16A34A' }}>Discount</span>
              <span style={{ fontSize: '14px', color: '#16A34A' }}>-₹{discount.toLocaleString('en-IN')}</span>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid #E2E8F0', marginTop: '8px' }}>
            <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#1A3C34', fontFamily: 'Georgia, serif' }}>Total</span>
            <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#D4A853' }}>₹{total.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Shipping address */}
        <h3 style={{ color: '#1A3C34', fontSize: '16px', fontFamily: 'Georgia, serif', marginBottom: '10px', borderBottom: '2px solid #F0F9F4', paddingBottom: '8px' }}>
          Shipping To
        </h3>
        <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.7', margin: '0 0 24px', whiteSpace: 'pre-wrap' }}>
          {shippingAddress}
        </p>

        {/* Note */}
        <div style={{ backgroundColor: '#FFFBF0', border: '1px solid #FDE68A', borderRadius: '8px', padding: '16px 20px', marginBottom: '32px' }}>
          <p style={{ margin: '0', fontSize: '13px', color: '#92400E', lineHeight: '1.6' }}>
            📦 We will send you another email as soon as your order is packed and on its way. For questions, reply to this email or WhatsApp us.
          </p>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <a
            href="https://jammi.org/shop"
            style={{ display: 'inline-block', backgroundColor: '#1A3C34', color: '#FFFFFF', padding: '14px 32px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold', letterSpacing: '0.5px' }}
          >
            Continue Shopping →
          </a>
        </div>
      </div>

      {/* Footer */}
      <div style={{ backgroundColor: '#1A3C34', padding: '24px 40px', textAlign: 'center' }}>
        <p style={{ color: '#A8C4B8', margin: '0 0 6px', fontSize: '12px' }}>
          Jammi Pharmaceuticals Pvt. Ltd. | Hyderabad, India
        </p>
        <p style={{ color: '#6B9B8E', margin: '0', fontSize: '11px' }}>
          This is an automated order confirmation email. Please do not reply directly.
        </p>
      </div>
    </div>
  );
}
