import {PayloadAction} from '@reduxjs/toolkit';
import {call, put, takeLatest} from 'redux-saga/effects';
import {actions as dashboardActions} from './slicer';
import {serializeError} from 'serialize-error';
import ApiClient from '@src/services/request';
import {APIS_CONSTANTS} from '@src/services/constants';
import {GenericSearchResponse, GenericTopResponse} from './types';

export function* fetchTopStories(
  action: PayloadAction<{categoryName: string}>,
) {
  try {
    const apiRequest = new ApiClient();

    console.log('***fetchTopStories*** started');
    const request = {};
    const topStoriesURL = `${APIS_CONSTANTS.BASE_URL_NYT}${APIS_CONSTANTS.TOP_STORIES}${action.payload.categoryName}.json?api-key=${APIS_CONSTANTS.NY_API_KEY}`;
    const response: GenericTopResponse = yield call(
      apiRequest.get,
      topStoriesURL,
      false,
      request,
    );

    console.info('***fetchTopStories*** api request', {response, request});

    yield put(dashboardActions.topStoriesSuccess({data: response?.results}));
  } catch (err) {
    const e = err as any;
    e.name = 'login';
    console.error('***fetchTopStories*** api error', {e});
    yield put(
      dashboardActions.topStoriesFailed(serializeError(e?.context ?? e)),
    );
  }
}

export function* searchArticles(
  action: PayloadAction<{query: string; page: number}>,
) {
  const {query, page} = action.payload;
  try {
    const apiRequest = new ApiClient();
    const searchURL = `${APIS_CONSTANTS.BASE_URL_NYT}${APIS_CONSTANTS.SEARCH_STORIES}??q=${query}&page=${page}&api-key=${APIS_CONSTANTS.NY_API_KEY}`;
    const response: GenericSearchResponse = yield call(
      apiRequest.get,
      searchURL,
      false,
    );
    console.info('***searchArticles*** api request', {response});
    // Dispatch a success action with the results
    yield put(dashboardActions.searchSuccess({data: response.response.docs}));

    // Add the search query to recent searches
    yield put(dashboardActions.addRecentSearches(query));
  } catch (error) {
    // Dispatch a failure action with the error
    // yield put(searchFailure(error.message));
    yield put(dashboardActions.searchSuccess({data: []}));
  }
}

export const sagas = () => [
  takeLatest(dashboardActions.fetchTopStories.toString(), fetchTopStories),
  takeLatest(dashboardActions.searchArticle.toString(), searchArticles),
];
