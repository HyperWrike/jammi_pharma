"use client";
import React, { useState, useEffect, useRef } from 'react';

export default function PantuluWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user'|'bot', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Open by default for quick test, can be toggled
  }, []);

  async function sendMessage() {
    if (!input.trim()) return;
    const userText = input.trim();
    setMessages((m) => [...m, { role: 'user', text: userText }]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/chat/pantulu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText, knowledge: '' }),
      });
      const data = await res.json();
      const reply = data?.reply ?? data?.text ?? 'Sorry I have no response.';
      setMessages((m) => [...m, { role: 'bot', text: reply }]);
    } catch (e) {
      setMessages((m) => [...m, { role: 'bot', text: 'Pantulu could not reach Grok service.' }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div ref={containerRef} style={{ position: 'fixed', bottom: 20, right: 20, width: 360, maxWidth: '90%', zIndex: 9999 }}>
      <div style={{ display: 'flex', flexDirection: 'column', borderRadius: 12, overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,.15)', background: '#fff' }}>
        <div onClick={() => setOpen((o) => !o)} style={{ padding: 12, background: '#F5F5F5', cursor: 'pointer', borderBottom: '1px solid #eee' }}>
          <strong>Pantulu</strong>
          <span style={{ float: 'right' }}>{open ? 'Hide' : 'Show'}</span>
        </div>
        {open && (
          <div style={{ maxHeight: 300, overflow: 'auto', padding: 12, background: '#fff' }}>
            <div style={{ height: 8 }} />
            {messages.map((m, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start', marginBottom: 8 }}>
                <div style={{ padding: '8px 12px', borderRadius: 8, background: m.role === 'user' ? '#e6e3ff' : '#f0f0f0', maxWidth: '80%' }}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && <div style={{ textAlign: 'left', color: '#666' }}>Pantulu is thinking...</div>}
            <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
              <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask Pantulu..." style={{ flex: 1, padding: '8px 10px', borderRadius: 6, border: '1px solid #ccc' }} />
              <button onClick={sendMessage} style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc', background: '#111827', color: '#fff' }}>Send</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
