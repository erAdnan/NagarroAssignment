import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '@src/app/parent';
import {TopStoriesTypes} from './types';

export const rootSelector = (state: RootState) => state?.dashboard;

export const getRequestStatus = createSelector(
  rootSelector,
  (state): boolean => state.requesting,
);
export const getTopStories = createSelector(
  rootSelector,
  (state): TopStoriesTypes => state.topStories,
);
export const getSelectedStoryDetail = createSelector(
  rootSelector,
  (state): TopStoriesTypes => state.topStories,
);
export const getSearchError = createSelector(
  rootSelector,
  state => state?.searchError,
);
