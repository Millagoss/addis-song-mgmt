import { all, call, put, select, takeLatest } from 'redux-saga/effects'
import { api } from '../../api/client'
import type { RootState } from '../../app/store'
import { fetchSongsRequested, fetchSongsSucceeded, fetchSongsFailed, createSongRequested, updateSongRequested, deleteSongRequested } from './slice'
import type { Song, SongsResponse } from './types'
import { fetchOverviewRequested, fetchBreakdownsRequested } from '../stats/slice'

function* fetchSongsWorker() {
  try {
    const filters = (yield select((s: RootState) => s.filters)) as RootState['filters']
    const params: Record<string, string | number> = {
      page: filters.page,
      limit: filters.limit,
      sortBy: filters.sortBy,
      sortOrder: filters.sortOrder,
    }
    if (filters.q) params.q = filters.q
    if (filters.genre) params.genre = filters.genre
    if (filters.artist) params.artist = filters.artist
    if (filters.album) params.album = filters.album

    const res: { data: SongsResponse } = yield call(api.get, '/api/songs', { params })
    yield put(fetchSongsSucceeded(res.data))
  } catch (e: any) {
    yield put(fetchSongsFailed(e?.response?.data?.message || e?.message || 'Failed to fetch songs'))
  }
}

function* createSongWorker(action: { type: string; payload: Omit<Song, '_id'|'createdAt'|'updatedAt'> }) {
  try {
    yield call(api.post, '/api/songs', action.payload)
    // Refetch songs and stats after mutation
    yield all([
      put(fetchSongsRequested()),
      put(fetchOverviewRequested()),
      put(fetchBreakdownsRequested())
    ])
  } catch (e) {
    // Could handle error UI via toast or slice in future
  }
}

function* updateSongWorker(action: { type: string; payload: { id: string; update: Partial<Song> } }) {
  try {
    const { id, update } = action.payload
    yield call(api.put, `/api/songs/${id}`, update)
    yield all([
      put(fetchSongsRequested()),
      put(fetchOverviewRequested()),
      put(fetchBreakdownsRequested())
    ])
  } catch (e) {}
}

function* deleteSongWorker(action: { type: string; payload: { id: string } }) {
  try {
    const { id } = action.payload
    yield call(api.delete, `/api/songs/${id}`)
    yield all([
      put(fetchSongsRequested()),
      put(fetchOverviewRequested()),
      put(fetchBreakdownsRequested())
    ])
  } catch (e) {}
}

export function* songsSaga() {
  yield takeLatest(fetchSongsRequested.type, fetchSongsWorker)
  yield takeLatest(createSongRequested.type, createSongWorker)
  yield takeLatest(updateSongRequested.type, updateSongWorker)
  yield takeLatest(deleteSongRequested.type, deleteSongWorker)
}
