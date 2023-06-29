import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import {PersistConfig} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type {State} from './reducers';

const persistConfig: PersistConfig<State> = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: hardSet,
};

export default persistConfig;
