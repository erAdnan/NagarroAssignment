import {createSelector} from '@reduxjs/toolkit';
import {RootState} from './parent';

export const rootGlobalSelector = (state: RootState) => state.app;

export const getLastOpenedTime = createSelector([rootGlobalSelector], app => {
  return app.localeTimestamp;
});

export const getRoute = createSelector(rootGlobalSelector, app => {
  return app?.route?.routes?.length ? app?.route : {routes: []};
});

/**
 * Returns the persistor status
 *   false if the persisStore is not loaded from the persist file yet
 *   true if the state was loaded from the persist file
 */
export const isPersistorReady = createSelector(
  rootGlobalSelector,
  (state): boolean => {
    return state.persistorReady;
  },
);
