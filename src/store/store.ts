import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import sagaManger from '@src/store/sagas';
import persist from './persist';
import {State} from './reducers';

let store: ReturnType<typeof createStore>;
export const getStoreInstance = (initialState?: State) =>
  store ?? (store = createStore(initialState));
export const createStore = (initialState?: State) => {
  if (process.env.NODE_ENV !== 'test' && typeof store !== 'undefined') {
    console.error(
      'Destroying the already created Redux store. This should not happen outside of unit tests',
    );
  }

  let sagaMiddleware;

  const middleware = [];
  const enhancers = [];

  /* istanbul ignore if */
  if (__DEV__) {
    const devToolsExtension = window && window.__REDUX_DEVTOOLS_EXTENSION__;
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
    sagaMiddleware = createSagaMiddleware({});
    middleware.push(sagaMiddleware);
  } else {
    sagaMiddleware = createSagaMiddleware();

    middleware.push(sagaMiddleware);
  }

  // Install modifications on the root reducer
  const reducer = persist.reducer(
    require('./config').default,
    require('./reducers').default,
  );

  const newStore = configureStore({
    devTools: process.env.NODE_ENV === 'development',
    middleware: [
      ...getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }),
      ...middleware,
    ],
    preloadedState: initialState,
    reducer,
    enhancers: [],
  });

  sagaManger.startSagas(sagaMiddleware);

  console.log('store created');
  return {store: newStore, persist: persist.store(newStore)};
};

/* istanbul ignore if */
if (__DEV__ && module.hot && sagaManger) {
  module.hot.dispose(data => {
    console.log('hot reload', data);
    sagaManger.cancelSagas(store.store);
  });

  module.hot.accept('./reducers', () => {
    const newRootReducer = require('./reducers').default;
    store.store.replaceReducer(newRootReducer);
  });
}
