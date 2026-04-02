import * as React from 'react';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface InternalOrderEmailProps {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  discount?: number;
  total: number;
  shippingAddress: string;
  paymentMethod?: string;
  orderedAt: string;
}

export function OrderConfirmationInternal({
  customerName,
  customerEmail,
  customerPhone,
  orderNumber,
  items,
  subtotal,
  discount = 0,
  total,
  shippingAddress,
  paymentMethod,
  orderedAt,
}: InternalOrderEmailProps) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#F1F5F9', padding: '20px' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto', backgroundColor: '#FFFFFF', borderRadius: '8px', overflow: 'hidden', border: '1px solid #E2E8F0' }}>

        {/* Internal header banner */}
        <div style={{ backgroundColor: '#DC2626', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ color: '#FFFFFF', margin: '0', fontSize: '16px', fontWeight: 'bold' }}>🔔 NEW ORDER RECEIVED</h1>
            <p style={{ color: '#FECACA', margin: '2px 0 0', fontSize: '12px' }}>Jammi Pharmaceuticals — Internal Notification</p>
          </div>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '6px', padding: '8px 12px', textAlign: 'center' }}>
            <p style={{ color: '#FFFFFF', margin: '0', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Order ID</p>
            <p style={{ color: '#FDE68A', margin: '2px 0 0', fontSize: '14px', fontWeight: 'bold' }}>{orderNumber}</p>
          </div>
        </div>

        <div style={{ padding: '24px' }}>
          {/* Order meta */}
          <p style={{ margin: '0 0 20px', fontSize: '13px', color: '#6B7280' }}>
            <strong>Ordered at:</strong> {new Date(orderedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
          </p>

          {/* Customer info */}
          <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '16px', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '13px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 12px', color: '#6B7280' }}>
              Customer Details
            </h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                {[
                  ['Name', customerName],
                  ['Email', customerEmail],
                  ['Phone', customerPhone || '—'],
                  ['Payment', paymentMethod || 'Razorpay'],
                ].map(([label, value]) => (
                  <tr key={label}>
                    <td style={{ padding: '5px 0', fontSize: '13px', color: '#94A3B8', width: '80px', verticalAlign: 'top' }}>{label}</td>
                    <td style={{ padding: '5px 0', fontSize: '13px', color: '#1E293B', fontWeight: '500' }}>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Shipping address */}
          <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '16px', marginBottom: '20px' }}>
            <p style={{ color: '#6B7280', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 8px' }}>Ship To</p>
            <p style={{ color: '#1E293B', fontSize: '13px', margin: '0', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>{shippingAddress}</p>
          </div>

          {/* Items table */}
          <div style={{ marginBottom: '20px' }}>
            <p style={{ color: '#6B7280', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 8px' }}>
              Items ({items.length})
            </p>
            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #E2E8F0', borderRadius: '6px', overflow: 'hidden' }}>
              <thead>
                <tr style={{ backgroundColor: '#F1F5F9' }}>
                  <th style={{ padding: '8px 12px', textAlign: 'left', fontSize: '11px', color: '#6B7280', fontWeight: '600' }}>PRODUCT</th>
                  <th style={{ padding: '8px 12px', textAlign: 'center', fontSize: '11px', color: '#6B7280', fontWeight: '600' }}>QTY</th>
                  <th style={{ padding: '8px 12px', textAlign: 'right', fontSize: '11px', color: '#6B7280', fontWeight: '600' }}>PRICE</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr key={i} style={{ borderTop: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '10px 12px', fontSize: '13px', color: '#1E293B' }}>{item.name}</td>
                    <td style={{ padding: '10px 12px', textAlign: 'center', fontSize: '13px', color: '#64748B' }}>×{item.quantity}</td>
                    <td style={{ padding: '10px 12px', textAlign: 'right', fontSize: '13px', color: '#1E293B', fontWeight: '600' }}>
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot style={{ backgroundColor: '#F8FAFC' }}>
                {discount > 0 && (
                  <tr>
                    <td colSpan={2} style={{ padding: '8px 12px', fontSize: '13px', color: '#16A34A', textAlign: 'right' }}>Discount</td>
                    <td style={{ padding: '8px 12px', fontSize: '13px', color: '#16A34A', textAlign: 'right' }}>-₹{discount.toLocaleString('en-IN')}</td>
                  </tr>
                )}
                <tr>
                  <td colSpan={2} style={{ padding: '12px', fontSize: '14px', fontWeight: 'bold', color: '#1E293B', textAlign: 'right' }}>TOTAL</td>
                  <td style={{ padding: '12px', fontSize: '16px', fontWeight: 'bold', color: '#DC2626', textAlign: 'right' }}>
                    ₹{total.toLocaleString('en-IN')}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Action reminder */}
          <div style={{ backgroundColor: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: '8px', padding: '14px 16px' }}>
            <p style={{ margin: '0', fontSize: '13px', color: '#92400E', lineHeight: '1.6' }}>
              ⚡ <strong>Action Required:</strong> Please pack and ship this order. Once shipped, update the order status to <em>"Completed"</em> in the Admin Panel to automatically notify the customer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
