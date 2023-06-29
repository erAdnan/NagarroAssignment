import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Error} from '../login/types';
import {
  SearchArticlesTypes,
  SearchDataTypes,
  TopStoriesResultsTypes,
  TopStoriesTypes,
} from './types';

export interface State {
  topStories: TopStoriesTypes;
  searchedList: SearchDataTypes;
  recentSearches: string[];
  searchError?: Error;
  requesting: boolean;
}

export const initialState: State = {
  topStories: {
    data: [],
    loading: false,
    moreLoading: false,
    error: undefined,
    isListEnd: false,
    pageNumber: 1,
    categoryName: 'world',
  },
  requesting: false,
  searchedList: {
    data: [],
    loading: false,
    moreLoading: false,
    error: undefined,
    isListEnd: false,
    pageNumber: 1,
  },
  recentSearches: [],
};

export type LoginStateType = typeof initialState;

export const {actions, reducer, name} = createSlice({
  initialState,
  name: 'dashboard',
  reducers: {
    fetchTopStories: (
      state,
      action: PayloadAction<{
        categoryName: string;
        page: number;
      }>,
    ) => {
      state.topStories = {
        ...state.topStories,
        loading: true,
        categoryName: action.payload.categoryName,
        pageNumber: action.payload.page,
      };
    },
    topStoriesSuccess: (
      state,
      action: PayloadAction<{data: TopStoriesResultsTypes[]}>,
    ) => {
      state.topStories = {
        ...state.topStories,
        loading: false,
        data: action.payload.data,
      };
    },
    topStoriesFailed: (state, action) => {
      state.topStories = {
        ...state.topStories,
        loading: false,
        error: action.payload,
      };
    },
    searchArticle: (state, _action) => {
      state.requesting = true;
      state.searchedList = {
        ...state.searchedList,
        loading: true,
      };
    },
    searchSuccess: (
      state,
      action: PayloadAction<{data: SearchArticlesTypes[]}>,
    ) => {
      state.searchedList = {
        ...state.searchedList,
        loading: false,
        moreLoading: false,
        data: action.payload.data,
      };
      state.requesting = false;
    },
    searchFailed: (state, action) => {
      state.searchError = action.payload;
      state.requesting = false;
      state.searchedList = {
        ...state.searchedList,
        loading: false,
        moreLoading: false,
        error: action.payload,
      };
    },
    addRecentSearches: (state, action) => {
      const {payload: query} = action;
      if (!state.recentSearches.includes(query)) {
        const updatedSearches = [query, ...state.recentSearches.slice(0, 4)];
        return {
          ...state,
          recentSearches: updatedSearches,
        };
      } else {
        return state;
      }
    },
  },
});
