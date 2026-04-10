export default function DataTable({ columns, data, loading, onRowClick }) {
  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{ 
            height: '48px', background: 'rgba(255,255,255,0.02)', 
            borderRadius: '8px', animation: 'pulse 1.5s infinite' 
          }} />
        ))}
        <style dangerouslySetInnerHTML={{__html:`@keyframes pulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }`}}/>
      </div>
    )
  }

  if (!data || data.length === 0) {
    return <div style={{ textAlign: 'center', padding: '48px', color: 'var(--text-muted)' }}>No data available</div>
  }

  return (
    <div style={{ overflowX: 'auto', border: '1px solid var(--border)', borderRadius: '8px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
        <thead style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)' }}>
          <tr>
            {columns.map(col => (
              <th key={col.key} style={{ padding: '16px', color: 'var(--text-secondary)', fontWeight: 500 }}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr 
              key={row.id || i} 
              onClick={() => onRowClick && onRowClick(row)}
              style={{ 
                borderBottom: '1px solid var(--border)',
                background: i % 2 === 0 ? 'var(--bg-primary)' : 'var(--bg-card)',
                cursor: onRowClick ? 'pointer' : 'default',
                transition: 'background 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-glass)'}
              onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? 'var(--bg-primary)' : 'var(--bg-card)'}
            >
              {columns.map(col => (
                <td key={col.key} style={{ padding: '16px', color: 'var(--text-primary)' }}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
