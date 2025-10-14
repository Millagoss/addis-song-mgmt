import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Song, SongsResponse } from './types'

export interface SongsState {
  items: Song[]
  loading: boolean
  error?: string
  page: number
  limit: number
  total: number
  totalPages: number
}

const initialState: SongsState = {
  items: [],
  loading: false,
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,
}

const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    fetchSongsRequested(state) { state.loading = true; state.error = undefined },
    fetchSongsSucceeded(state, action: PayloadAction<SongsResponse>) {
      state.loading = false
      state.items = action.payload.data
      state.page = action.payload.page
      state.limit = action.payload.limit
      state.total = action.payload.total
      state.totalPages = action.payload.totalPages
    },
    fetchSongsFailed(state, action: PayloadAction<string>) { state.loading = false; state.error = action.payload },

    createSongRequested(_state, _action: PayloadAction<Omit<Song, '_id'|'createdAt'|'updatedAt'>>){},
    updateSongRequested(_state, _action: PayloadAction<{ id: string; update: Partial<Song> }>) {},
    deleteSongRequested(_state, _action: PayloadAction<{ id: string }>) {},
  }
})

export const {
  fetchSongsRequested,
  fetchSongsSucceeded,
  fetchSongsFailed,
  createSongRequested,
  updateSongRequested,
  deleteSongRequested,
} = songsSlice.actions

export default songsSlice.reducer
