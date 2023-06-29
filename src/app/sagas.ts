import {takeLatest, put} from 'redux-saga/effects';
import {actions} from './slicer';

export function* stateRehydrated() {
  yield put(actions.fetchAppConfig());
}

export function* persistStateLoadComplete() {
  yield put(actions.persistorReady());
}

export const sagas = () => [
  takeLatest('persist/REHYDRATE', stateRehydrated),
  takeLatest('persist/COMPLETED', persistStateLoadComplete),
];
