import {
  persistStore,
  persistReducer,
  PersistConfig,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import type {State, ReduxStore, RootReducer} from './reducers';

export const COMPLETED = 'persist/COMPLETED';

export default {
  actions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, COMPLETED],
  reducer: (config: PersistConfig<State>, root: RootReducer) =>
    persistReducer(config, root),
  store: (store: ReduxStore) =>
    persistStore(store, undefined, () => store.dispatch({type: COMPLETED})),
};
