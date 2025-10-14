import { useMemo, useState } from 'react'
import { Box } from '../../../components/Box'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { deleteSongRequested, fetchSongsRequested, updateSongRequested } from '../slice'
import type { Song } from '../types'
import { setPage } from '../../filters/slice'
import type { RootState } from '../../../app/store'

export function SongTable() {
  const dispatch = useAppDispatch()
  const { items, loading, error, page, totalPages } = useAppSelector((s: RootState) => s.songs)
  const [editId, setEditId] = useState<string>('')
  const [form, setForm] = useState<Partial<Song>>({})

  const startEdit = (song: Song) => {
    setEditId(song._id!)
    setForm({ title: song.title, artist: song.artist, album: song.album, genre: song.genre })
  }
  const cancelEdit = () => { setEditId(''); setForm({}) }
  const saveEdit = () => {
    if (!editId) return
    dispatch(updateSongRequested({ id: editId, update: { title: form.title?.trim() || '', artist: form.artist?.trim() || '', album: form.album?.trim() || '', genre: form.genre?.trim() || '' } }))
    cancelEdit()
  }

  const onDelete = (id: string) => {
    if (confirm('Delete this song?')) dispatch(deleteSongRequested({ id }))
  }

  const table = useMemo(() => (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <Th>Title</Th>
          <Th>Artist</Th>
          <Th>Album</Th>
          <Th>Genre</Th>
          <Th>Actions</Th>
        </tr>
      </thead>
      <tbody>
        {items.map((s: Song) => (
          <tr key={s._id}>
            <Td>
              {editId === s._id ? <Input value={form.title || ''} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /> : s.title}
            </Td>
            <Td>
              {editId === s._id ? <Input value={form.artist || ''} onChange={e => setForm(f => ({ ...f, artist: e.target.value }))} /> : s.artist}
            </Td>
            <Td>
              {editId === s._id ? <Input value={form.album || ''} onChange={e => setForm(f => ({ ...f, album: e.target.value }))} /> : s.album}
            </Td>
            <Td>
              {editId === s._id ? <Input value={form.genre || ''} onChange={e => setForm(f => ({ ...f, genre: e.target.value }))} /> : s.genre}
            </Td>
            <Td>
              {editId === s._id ? (
                <>
                  <IconBtn title="Save" onClick={saveEdit}>{IconCheck()}</IconBtn>
                  <IconBtn title="Cancel" variant="muted" onClick={cancelEdit}>{IconX()}</IconBtn>
                </>
              ) : (
                <>
                  <IconBtn title="Edit" onClick={() => startEdit(s)}>{IconEdit()}</IconBtn>
                  <IconBtn title="Delete" variant="danger" onClick={() => onDelete(s._id!)}>{IconTrash()}</IconBtn>
                </>
              )}
            </Td>
          </tr>
        ))}
      </tbody>
    </table>
  ), [items, editId, form])

  return (
    <Box>
      {loading && <Box my={3}>Loading...</Box>}
      {error && <Box my={3} color="danger">{error}</Box>}
      {table}
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={3}>
        <SmallBtn disabled={page <= 1} onClick={() => { dispatch(setPage(page - 1)); dispatch(fetchSongsRequested()) }}>Prev</SmallBtn>
        <Box>Page {page} of {totalPages || 1}</Box>
        <SmallBtn disabled={totalPages === 0 || page >= totalPages} onClick={() => { dispatch(setPage(page + 1)); dispatch(fetchSongsRequested()) }}>Next</SmallBtn>
      </Box>
    </Box>
  )
}

function Th({ children }: { children: React.ReactNode }) { return <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #1f2937', color: '#9ca3af' }}>{children}</th> }
function Td({ children }: { children: React.ReactNode }) { return <td style={{ padding: 8, borderBottom: '1px solid #1f2937' }}>{children}</td> }

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} style={{ padding: 8, borderRadius: 8, border: '1px solid #1f2937', background: '#0b1220', color: '#e5e7eb', ...(props.style || {}) }} />
}

function IconBtn({ children, onClick, disabled, variant = 'primary', title }: { children: React.ReactNode; onClick?: () => void; disabled?: boolean; variant?: 'primary' | 'danger' | 'muted'; title?: string }) {
  const colors: Record<string, string> = {
    primary: '#1f2937',
    danger: '#3b1d1d',
    muted: '#1f2937',
  }
  const borders: Record<string, string> = {
    primary: '#374151',
    danger: '#7f1d1d',
    muted: '#374151',
  }
  const hoverBg: Record<string, string> = {
    primary: '#2a3546',
    danger: '#5b2525',
    muted: '#2a3546',
  }
  return (
    <button title={title} disabled={disabled} onClick={onClick} style={{
      width: 34,
      height: 34,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      border: `1px solid ${borders[variant]}`,
      background: colors[variant],
      color: '#e5e7eb',
      cursor: disabled ? 'not-allowed' : 'pointer',
      marginRight: 8,
    }}
      onMouseEnter={(e) => (e.currentTarget.style.background = hoverBg[variant])}
      onMouseLeave={(e) => (e.currentTarget.style.background = colors[variant])}
    >{children}</button>
  )
}

function IconEdit() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" fill="#cbd5e1"/>
      <path d="M20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z" fill="#cbd5e1"/>
    </svg>
  )
}

function IconTrash() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 7h12m-9 4v6m6-6v6M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-9 0h12l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 7z" stroke="#fca5a5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function IconCheck() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 13l4 4L19 7" stroke="#a7f3d0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function IconX() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 18L18 6M6 6l12 12" stroke="#fde68a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function SmallBtn({ children, onClick, disabled }: { children: React.ReactNode; onClick?: () => void; disabled?: boolean }) {
  return (
    <button disabled={disabled} onClick={onClick} style={{
      padding: '8px 12px',
      borderRadius: 8,
      border: '1px solid #1f2937',
      background: '#1f2937',
      color: '#e5e7eb',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1,
    }}>{children}</button>
  )
}
