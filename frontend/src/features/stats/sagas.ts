import { all, call, put, takeLatest } from 'redux-saga/effects'
import { api } from '../../api/client'
import { fetchOverviewRequested, fetchOverviewSucceeded, fetchOverviewFailed, fetchBreakdownsRequested, fetchBreakdownsSucceeded, fetchBreakdownsFailed } from './slice'

function* fetchOverviewWorker() {
  try {
    const res: { data: any } = yield call(api.get, '/api/stats/overview')
    yield put(fetchOverviewSucceeded(res.data))
  } catch (e: any) {
    yield put(fetchOverviewFailed(e?.response?.data?.message || e?.message || 'Failed to fetch overview'))
  }
}

function* fetchBreakdownsWorker() {
  try {
    const [byGenreRes, byArtistRes, byAlbumRes]: [{ data: any[] }, { data: any[] }, { data: any[] }] = yield all([
      call(api.get, '/api/stats/by-genre'),
      call(api.get, '/api/stats/by-artist'),
      call(api.get, '/api/stats/by-album'),
    ])
    yield put(fetchBreakdownsSucceeded({ byGenre: byGenreRes.data, byArtist: byArtistRes.data, byAlbum: byAlbumRes.data }))
  } catch (e: any) {
    yield put(fetchBreakdownsFailed(e?.response?.data?.message || e?.message || 'Failed to fetch breakdowns'))
  }
}

export function* statsSaga() {
  yield takeLatest(fetchOverviewRequested.type, fetchOverviewWorker)
  yield takeLatest(fetchBreakdownsRequested.type, fetchBreakdownsWorker)
}
