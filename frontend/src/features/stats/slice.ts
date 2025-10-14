import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Overview = {
  songsCount: number
  artistsCount: number
  albumsCount: number
  genresCount: number
}

export type ByGenre = { genre: string; songsCount: number }
export type ByArtist = { artist: string; songsCount: number; albumsCount: number }
export type ByAlbum = { album: string; songsCount: number }

export interface StatsState {
  overview?: Overview
  byGenre: ByGenre[]
  byArtist: ByArtist[]
  byAlbum: ByAlbum[]
  loading: boolean
  error?: string
}

const initialState: StatsState = {
  byGenre: [],
  byArtist: [],
  byAlbum: [],
  loading: false,
}

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    fetchOverviewRequested(state) { state.loading = true; state.error = undefined },
    fetchOverviewSucceeded(state, action: PayloadAction<Overview>) { state.loading = false; state.overview = action.payload },
    fetchOverviewFailed(state, action: PayloadAction<string>) { state.loading = false; state.error = action.payload },

    fetchBreakdownsRequested(state) { state.loading = true; state.error = undefined },
    fetchBreakdownsSucceeded(state, action: PayloadAction<{ byGenre: ByGenre[]; byArtist: ByArtist[]; byAlbum: ByAlbum[] }>) {
      state.loading = false
      state.byGenre = action.payload.byGenre
      state.byArtist = action.payload.byArtist
      state.byAlbum = action.payload.byAlbum
    },
    fetchBreakdownsFailed(state, action: PayloadAction<string>) { state.loading = false; state.error = action.payload },
  }
})

export const {
  fetchOverviewRequested,
  fetchOverviewSucceeded,
  fetchOverviewFailed,
  fetchBreakdownsRequested,
  fetchBreakdownsSucceeded,
  fetchBreakdownsFailed,
} = statsSlice.actions

export default statsSlice.reducer
