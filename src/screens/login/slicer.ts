import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Error} from './types';

export interface State {
  token?: string | null;
  error?: Error;
  loggedIn: boolean;
  requesting: boolean;
  username: string;
  password: string;
}

export const initialState: State = {
  token: null,
  loggedIn: false,
  requesting: false,
  username: '',
  password: '',
};

export type LoginStateType = typeof initialState;

export const {actions, reducer, name} = createSlice({
  initialState,
  name: 'login',
  reducers: {
    loginStarted: {
      reducer: (
        state,
        action: PayloadAction<{
          username: string;
          password: string;
        }>,
      ) => {
        state.loggedIn = false;
        state.requesting = true;
        state.username = action.payload.username;
      },
      prepare: (username: string, password: string) => ({
        payload: {
          username,
          password,
        },
        meta: {mask: ['payload.password']},
      }),
    },
    loginSucceeded: (
      state,
      action: PayloadAction<{
        username: string;
        password: string;
        token: string;
      }>,
    ) => {
      state.loggedIn = true;
      state.requesting = false;
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.token = action.payload.token;
    },
    loginFailed: (state, action) => {
      state.error = action.payload;
      state.loggedIn = false;
      state.requesting = false;
    },
    clearLoginError: state => {
      delete state.error;
    },
    loggedOut() {
      return initialState;
    },
    registerStarted: {
      reducer: (
        state,
        action: PayloadAction<{
          username: string;
          password: string;
        }>,
      ) => {
        state.requesting = true;
        state.username = action.payload.username;
      },
      prepare: (username: string, password: string) => ({
        payload: {
          username,
          password,
        },
        meta: {mask: ['payload.password']},
      }),
    },
  },
});
