import * as React from 'react';

interface OrderShippedEmailProps {
  customerName: string;
  orderNumber: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  shippingAddress: string;
  courierName?: string;
  trackingId?: string;
}

export function OrderShippedEmail({
  customerName,
  orderNumber,
  items,
  total,
  shippingAddress,
  courierName,
  trackingId,
}: OrderShippedEmailProps) {
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

      {/* Hero section */}
      <div style={{ background: 'linear-gradient(135deg, #1A3C34 0%, #2D6A4F 100%)', padding: '48px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: '56px', marginBottom: '16px' }}>🎉</div>
        <h2 style={{ color: '#FFFFFF', fontSize: '28px', margin: '0 0 12px', fontFamily: 'Georgia, serif', lineHeight: '1.3' }}>
          Congratulations!<br />Your Goodies Are On The Way!
        </h2>
        <p style={{ color: '#A8C4B8', fontSize: '16px', margin: '0', lineHeight: '1.6' }}>
          Your Ayurvedic wellness products have been packed with love<br />and are heading your way, <strong style={{ color: '#D4A853' }}>{customerName}</strong>! 🌿
        </p>
      </div>

      {/* Body */}
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 32px', backgroundColor: '#FFFFFF' }}>

        {/* Order pill */}
        <div style={{ backgroundColor: '#F0F9F4', border: '1px solid #D1FAE5', borderRadius: '12px', padding: '16px 24px', marginBottom: '32px', textAlign: 'center' }}>
          <p style={{ margin: '0', fontSize: '13px', color: '#6B7280', letterSpacing: '1px', textTransform: 'uppercase' }}>Order Number</p>
          <p style={{ margin: '4px 0 0', fontSize: '22px', fontWeight: 'bold', color: '#1A3C34', fontFamily: 'Georgia, serif' }}>
            {orderNumber}
          </p>
        </div>

        {/* Tracking info */}
        {(courierName || trackingId) && (
          <div style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '8px', padding: '16px 20px', marginBottom: '28px' }}>
            <p style={{ margin: '0 0 8px', fontSize: '13px', color: '#1D4ED8', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              📦 Tracking Information
            </p>
            {courierName && (
              <p style={{ margin: '0 0 4px', fontSize: '14px', color: '#1E293B' }}>
                <strong>Courier:</strong> {courierName}
              </p>
            )}
            {trackingId && (
              <p style={{ margin: '0', fontSize: '14px', color: '#1E293B' }}>
                <strong>Tracking ID:</strong> <span style={{ fontFamily: 'monospace', backgroundColor: '#DBEAFE', padding: '2px 8px', borderRadius: '4px' }}>{trackingId}</span>
              </p>
            )}
          </div>
        )}

        {/* Items recap */}
        <h3 style={{ color: '#1A3C34', fontSize: '16px', fontFamily: 'Georgia, serif', marginBottom: '16px', borderBottom: '2px solid #F0F9F4', paddingBottom: '8px' }}>
          Your Order
        </h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px' }}>
          <tbody>
            {items.map((item, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '10px 0', fontSize: '14px', color: '#1E293B' }}>
                  🌿 {item.name}
                </td>
                <td style={{ padding: '10px 0', fontSize: '14px', color: '#64748B', textAlign: 'center' }}>×{item.quantity}</td>
                <td style={{ padding: '10px 0', fontSize: '14px', color: '#1E293B', fontWeight: '600', textAlign: 'right' }}>
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={2} style={{ padding: '14px 0 0', fontSize: '16px', fontWeight: 'bold', color: '#1A3C34', fontFamily: 'Georgia, serif' }}>Total Paid</td>
              <td style={{ padding: '14px 0 0', fontSize: '18px', fontWeight: 'bold', color: '#D4A853', textAlign: 'right' }}>
                ₹{total.toLocaleString('en-IN')}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Delivery address */}
        <div style={{ backgroundColor: '#F8F5EE', borderRadius: '8px', padding: '16px 20px', marginBottom: '32px' }}>
          <p style={{ margin: '0 0 6px', fontSize: '12px', color: '#94A3B8', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Delivering To
          </p>
          <p style={{ margin: '0', fontSize: '14px', color: '#475569', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>
            {shippingAddress}
          </p>
        </div>

        {/* Wellness tip */}
        <div style={{ backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '8px', padding: '20px', marginBottom: '32px', textAlign: 'center' }}>
          <p style={{ margin: '0 0 8px', fontSize: '20px' }}>🌸</p>
          <p style={{ margin: '0', fontSize: '14px', color: '#065F46', fontStyle: 'italic', lineHeight: '1.6' }}>
            "Health is the greatest gift, contentment the greatest wealth."<br />
            <span style={{ fontStyle: 'normal', fontWeight: 'bold' }}>— Ayurvedic Wisdom</span>
          </p>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <a
            href="https://jammi.org/shop"
            style={{ display: 'inline-block', backgroundColor: '#1A3C34', color: '#FFFFFF', padding: '14px 32px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold', letterSpacing: '0.5px' }}
          >
            Shop More Wellness →
          </a>
        </div>
      </div>

      {/* Footer */}
      <div style={{ backgroundColor: '#1A3C34', padding: '24px 40px', textAlign: 'center' }}>
        <p style={{ color: '#A8C4B8', margin: '0 0 6px', fontSize: '12px' }}>
          Jammi Pharmaceuticals Pvt. Ltd. | Hyderabad, India
        </p>
        <p style={{ color: '#6B9B8E', margin: '0', fontSize: '11px' }}>
          Questions? Reply to this email or contact us at frontdesk@jammi.org
        </p>
      </div>
    </div>
  );
}
