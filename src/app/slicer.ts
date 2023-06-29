import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NavigationState} from '@react-navigation/native';
import {AppStateStatus} from 'react-native';

export interface State {
  route: NavigationState;
  appState: AppStateStatus;
  readyToNavigate: boolean;
  localeTimestamp: number;
  persistorReady: boolean;
}
export const initialState: State = {
  route: {
    key: '',
    routes: [],
    routeNames: [],
    index: 0,
    type: '',
    stale: false,
  },
  appState: 'active',
  readyToNavigate: false,
  localeTimestamp: 0,
  persistorReady: false,
};

export const GlobalStateType = typeof initialState;

export const {actions, reducer, name} = createSlice({
  initialState,
  name: 'app',
  reducers: {
    routeChanged(state, action: PayloadAction<{route: NavigationState}>) {
      state.route = action.payload.route;
    },
    appStateChanged: (state, action) => {
      state.appState = action.payload;
    },
    readyToNavigate: (state, action: PayloadAction<boolean>) => {
      state.readyToNavigate = action.payload;
    },
    localeTimestamp: (state, action: PayloadAction<number>) => {
      state.localeTimestamp = action.payload;
    },
    initApp: state => {
      state.persistorReady = false;
    },
    persistorReady: state => {
      state.persistorReady = true;
    },
    fetchAppConfig() {
      // action dispatch only, no state change
    },
  },
});
