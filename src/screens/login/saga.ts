import {PayloadAction} from '@reduxjs/toolkit';
import {call, put, takeLatest} from 'redux-saga/effects';
import {actions as loginActions} from './slicer';
import {serializeError} from 'serialize-error';
import {LoginResponseType, Request} from './types';
import {Persistor, persistStore} from 'redux-persist';
import {getStoreInstance} from '@src/store/store';
import ApiClient from '@src/services/request';
import {APIS_CONSTANTS} from '@src/services/constants';

const apiRequest = new ApiClient();

export function* login(
  action: PayloadAction<{clientId: string; username: string; password: string}>,
) {
  try {
    console.log('***loginsaga*** action', action);
    const request: Request = {
      email: action.payload.username,
      password: action.payload.password,
    };
    const loginURL = `${APIS_CONSTANTS.BASE_URL_AUTH}login`;

    const response: LoginResponseType = yield call(
      apiRequest.post,
      loginURL,
      true,
      request,
    );

    console.info('***loginsaga*** api request', {response, request});
    // {"response": {"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkFkbmFuQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiQWRuYW4xMjMiLCJpYXQiOjE2ODc5NTcyNzEsImV4cCI6MTY4Nzk2MDg3MX0.9wjT8RyUtGB4MkzCTvxm7pTN6GrvKmrYXMyRq7pA4Bk"}}
    yield put(
      loginActions.loginSucceeded({
        username: action.payload.username,
        password: action.payload.password,
        token: response.access_token,
      }),
    );
  } catch (err) {
    const e = err as any;
    e.name = 'login';
    console.error('***loginsaga*** api error', {e});
    yield put(loginActions.loggedOut());
    yield put(loginActions.loginFailed(serializeError(e?.context ?? e)));
  }
}

export function* logoutProcess() {
  try {
    console.info('Clearing data on Logout');
    const store: ReturnType<typeof getStoreInstance> = yield call(
      getStoreInstance,
    );
    const persist: Persistor = yield call(persistStore, store.store);
    yield call(persist.purge);
  } catch (e) {
    console.error('logoutProcess saga error', serializeError(e));
  }
}

export function* register(
  action: PayloadAction<{clientId: string; username: string; password: string}>,
) {
  try {
    console.log('***register*** action', action);
    const request: Request = {
      email: action.payload.username,
      password: action.payload.password,
    };
    const registerURL = `${APIS_CONSTANTS.BASE_URL_AUTH}register`;
    const response: LoginResponseType = yield call(
      apiRequest.post,
      registerURL,
      true,
      request,
    );

    console.info('***register*** api request', {response, request});

    yield put(
      loginActions.loginSucceeded({
        username: action.payload.username,
        password: action.payload.password,
        token: response.access_token,
      }),
    );
  } catch (err) {
    const e = err as any;
    e.name = 'login';
    console.error('***register*** api error', {e});
    yield put(loginActions.loggedOut());
    yield put(loginActions.loginFailed(serializeError(e?.context ?? e)));
  }
}
export const sagas = () => [
  takeLatest(loginActions.loginStarted.toString(), login),
  takeLatest(loginActions.registerStarted.toString(), register),
  takeLatest(loginActions.loggedOut.type, logoutProcess),
];
