import { ThemeProvider, Global, css } from '@emotion/react'
import { useEffect, useState } from 'react'
import { theme } from './theme/theme'
import { useAppDispatch } from './app/hooks'
import { fetchSongsRequested } from './features/songs/slice'
import { fetchOverviewRequested, fetchBreakdownsRequested } from './features/stats/slice'
import { Box } from './components/Box'
import { FilterBar } from './features/filters/FilterBar'
import { SongForm } from './features/songs/components/SongForm'
import { SongTable } from './features/songs/components/SongTable'
import { StatsPanel } from './features/stats/StatsPanel'

export default function App() {
  const dispatch = useAppDispatch()
  const [view, setView] = useState<'songs' | 'stats'>('songs')

  useEffect(() => {
    dispatch(fetchSongsRequested())
    dispatch(fetchOverviewRequested())
    dispatch(fetchBreakdownsRequested())
  }, [dispatch])

  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <Box p={5}>
        <Box display="flex" alignItems="center" gap={3} mb={4}>
          <Box as="h1" css={{ color: theme.colors.text, fontSize: 24, fontWeight: 700 }}>Songs Manager</Box>
          <NavBtn active={view === 'songs'} onClick={() => setView('songs')}>Songs</NavBtn>
          <NavBtn active={view === 'stats'} onClick={() => setView('stats')}>Statistics</NavBtn>
        </Box>

        {/* Songs Page */}
        <AnimatedPage visible={view === 'songs'}>
          <FilterBar />
          <Box display="flex" gap={4} mt={4} flexWrap="wrap">
            <Box flex="2 1 600px" bg="surface" p={4} borderRadius={8}>
              <SongForm />
              <SongTable />
            </Box>
            <Box flex="1 1 280px" bg="surface" p={4} borderRadius={8}>
              <StatsPanel compact />
            </Box>
          </Box>
        </AnimatedPage>

        {/* Statistics Page */}
        <AnimatedPage visible={view === 'stats'}>
          <Box bg="surface" p={4} borderRadius={8}>
            <StatsPanel />
          </Box>
        </AnimatedPage>
      </Box>
    </ThemeProvider>
  )
}

const globalStyles = css`
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: ${theme.fonts.body};
    background: ${theme.colors.background};
    color: ${theme.colors.text};
  }
  input, select, button {
    transition: all 160ms ease;
  }
  input, select {
    padding: 10px 12px;
    margin-right: 8px;
    border-radius: 8px;
    border: 1px solid ${theme.colors.border};
    background: #0b1220;
    color: ${theme.colors.text};
  }
  input:focus, select:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${theme.colors.primary};
    border-color: ${theme.colors.primary};
  }
`;

function NavBtn({ children, onClick, active }: { children: React.ReactNode; onClick: () => void; active?: boolean }) {
  return (
    <button onClick={onClick} style={{
      padding: '8px 12px',
      borderRadius: 8,
      border: `1px solid ${active ? theme.colors.primary : theme.colors.border}`,
      background: active ? '#0b1220' : theme.colors.surface,
      color: active ? theme.colors.text : '#cbd5e1',
      cursor: 'pointer',
      marginLeft: 8,
    }}>{children}</button>
  )
}

function AnimatedPage({ visible, children }: { visible: boolean; children: React.ReactNode }) {
  return (
    <div style={{
      transition: 'opacity 240ms ease, transform 240ms ease',
      opacity: visible ? 1 : 0,
      transform: `translateY(${visible ? 0 : 6}px)`,
      pointerEvents: visible ? 'auto' : 'none',
      position: 'relative',
      display: visible ? 'block' : 'none',
    }}>
      {children}
    </div>
  )
}
