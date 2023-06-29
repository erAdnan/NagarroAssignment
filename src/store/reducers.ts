import {name as appName, reducer as appReducer} from '@src/app/slicer';
import {
  name as dashboardName,
  reducer as dashboardReducer,
} from '@src/screens/dashboard/slicer';
import {
  name as loginName,
  reducer as loginReducer,
} from '@src/screens/login/slicer';

import {
  AnyAction,
  CombinedState,
  combineReducers,
  EnhancedStore,
  Middleware,
  Reducer,
  StateFromReducersMapObject,
} from '@reduxjs/toolkit';
import {SagaMiddleware} from 'redux-saga';

const reducersMap = {
  [appName]: appReducer,
  [loginName]: loginReducer,
  [dashboardName]: dashboardReducer,
};
export default combineReducers(reducersMap);

export type State = StateFromReducersMapObject<typeof reducersMap>;
export type ReduxStore = EnhancedStore<
  CombinedState<State>,
  AnyAction,
  Middleware<SagaMiddleware>[]
>;
export type RootReducer = Reducer<CombinedState<State>, AnyAction>;
