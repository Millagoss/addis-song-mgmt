import { all, fork } from "redux-saga/effects";
import { songsSaga } from "../features/songs/sagas";
import { statsSaga } from "../features/stats/sagas";

export function* rootSaga() {
  yield all([fork(songsSaga), fork(statsSaga)]);
}
