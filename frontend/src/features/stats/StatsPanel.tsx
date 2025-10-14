import { useState } from 'react'
import { useAppSelector } from '../../app/hooks'
import { Box } from '../../components/Box'

export function StatsPanel({ compact = false }: { compact?: boolean }) {
  const { overview, byGenre, byArtist, byAlbum, loading, error } = useAppSelector(s => s.stats)

  if (compact) {
    return (
      <Box>
        {loading && <Box mb={2}>Loading...</Box>}
        {error && <Box mb={2} color="danger">{error}</Box>}
        <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(140px, 1fr))" gap={3}>
          <StatCard label="Songs" value={overview?.songsCount ?? 0} />
          <StatCard label="Artists" value={overview?.artistsCount ?? 0} />
          <StatCard label="Albums" value={overview?.albumsCount ?? 0} />
          <StatCard label="Genres" value={overview?.genresCount ?? 0} />
        </Box>
      </Box>
    )
  }

  // Full panel with simple accordion
  return (
    <Box>
      {loading && <Box mb={2}>Loading...</Box>}
      {error && <Box mb={2} color="danger">{error}</Box>}

      <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(160px, 1fr))" gap={3} mb={3}>
        <StatCard label="Songs" value={overview?.songsCount ?? 0} />
        <StatCard label="Artists" value={overview?.artistsCount ?? 0} />
        <StatCard label="Albums" value={overview?.albumsCount ?? 0} />
        <StatCard label="Genres" value={overview?.genresCount ?? 0} />
      </Box>

      <Accordion title="By Genre">
        <ul style={ulStyle}>
          {byGenre.map(g => (<li key={g.genre} style={liStyle}><strong>{g.genre}</strong><span>{g.songsCount}</span></li>))}
        </ul>
      </Accordion>

      <Accordion title="By Artist">
        <ul style={ulStyle}>
          {byArtist.map(a => (<li key={a.artist} style={liStyle}><strong>{a.artist}</strong><span>{a.songsCount} songs · {a.albumsCount} albums</span></li>))}
        </ul>
      </Accordion>

      <Accordion title="By Album">
        <ul style={ulStyle}>
          {byAlbum.map(a => (<li key={a.album} style={liStyle}><strong>{a.album}</strong><span>{a.songsCount}</span></li>))}
        </ul>
      </Accordion>
    </Box>
  )
}

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true)
  return (
    <Box mb={3}>
      <button onClick={() => setOpen(o => !o)} style={accBtnStyle}>
        <span>{title}</span>
        <span style={{ transform: `rotate(${open ? 90 : 0}deg)`, transition: 'transform 150ms ease' }}>▶</span>
      </button>
      <div style={{ maxHeight: open ? 1000 : 0, overflow: 'hidden', transition: 'max-height 240ms ease' }}>
        <Box mt={2}>
          {children}
        </Box>
      </div>
    </Box>
  )
}

function StatCard({ label, value }: { label: string; value: number }) {
  const base: React.CSSProperties = {
    background: '#0b1220',
    borderRadius: 10,
    border: '1px solid #1f2937',
    padding: 12,
    transition: 'all 180ms ease',
  }
  return (
    <div
      style={base}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.borderColor = '#06b6d4'
        e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.25)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.borderColor = '#1f2937'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <Box color="muted" fontSize={12} mb={1}>{label}</Box>
      <Box fontSize={24} fontWeight={700}>{value}</Box>
    </div>
  )
}

const accBtnStyle: React.CSSProperties = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: '#0b1220',
  color: '#e5e7eb',
  border: '1px solid #1f2937',
  borderRadius: 10,
  padding: '10px 12px',
  cursor: 'pointer',
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <Box mb={2} fontWeight={600} color="muted">{children}</Box>
}

const ulStyle: React.CSSProperties = { listStyle: 'none', padding: 0, margin: 0 }
const liStyle: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #1f2937' }
