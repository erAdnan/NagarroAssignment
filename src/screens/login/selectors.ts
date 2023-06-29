import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '@src/app/parent';

export const rootLoginSelector = (state: RootState) => state?.login;

export const isUserLoggedIn = createSelector(
  rootLoginSelector,
  loginState => loginState.loggedIn,
);
export const getTokenSelector = createSelector(
  rootLoginSelector,
  (state): string | undefined | null => {
    try {
      return state?.token;
    } catch (e) {
      return undefined;
    }
  },
);
export const getLoginError = createSelector(
  rootLoginSelector,
  loginState => loginState?.error,
);
export const getRequestStatus = createSelector(
  rootLoginSelector,
  (state): boolean => state.requesting,
);
