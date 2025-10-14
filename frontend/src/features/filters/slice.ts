import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type SortBy = 'title' | 'artist' | 'album' | 'genre' | 'createdAt' | 'updatedAt'
export type SortOrder = 'asc' | 'desc'

export interface FiltersState {
  q: string
  genre: string
  artist: string
  album: string
  sortBy: SortBy
  sortOrder: SortOrder
  page: number
  limit: number
}

const initialState: FiltersState = {
  q: '',
  genre: '',
  artist: '',
  album: '',
  sortBy: 'createdAt',
  sortOrder: 'desc',
  page: 1,
  limit: 10,
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) { state.q = action.payload; state.page = 1 },
    setGenre(state, action: PayloadAction<string>) { state.genre = action.payload; state.page = 1 },
    setArtist(state, action: PayloadAction<string>) { state.artist = action.payload; state.page = 1 },
    setAlbum(state, action: PayloadAction<string>) { state.album = action.payload; state.page = 1 },
    setSort(state, action: PayloadAction<{ sortBy: SortBy; sortOrder: SortOrder }>) { state.sortBy = action.payload.sortBy; state.sortOrder = action.payload.sortOrder; },
    setPage(state, action: PayloadAction<number>) { state.page = action.payload },
    setLimit(state, action: PayloadAction<number>) { state.limit = action.payload; state.page = 1 },
    resetFilters() { return initialState },
  }
})

export const { setQuery, setGenre, setArtist, setAlbum, setSort, setPage, setLimit, resetFilters } = filtersSlice.actions
export default filtersSlice.reducer
