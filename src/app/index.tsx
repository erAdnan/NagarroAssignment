import React from 'react';
import {StatusBar, AppState, ActivityIndicator} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import {actions} from './slicer';
import AppContainer from './AppContainer';
import AppLoader from './AppLoader';
import {SafeAreaWrapper} from './SafeAreaSpacer';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {getStoreInstance} from '@src/store/store';

const App: React.FC = () => {
  const storeInstance = getStoreInstance();
  const _handleAppStateChange = React.useCallback(
    async (nextAppState: any) => {
      storeInstance.store.dispatch(actions.appStateChanged(nextAppState));

      console.log(`App State Changed to:, ${nextAppState}`);
    },
    [storeInstance.store],
  );
  const _handleReadyToNavigate = React.useCallback(
    (ready: boolean) => {
      // If persist will not trigger a rehydrate there is no need to change the app to initial
      const bootstrapped = storeInstance.persist.getState().bootstrapped;
      if (!ready && !bootstrapped) {
        storeInstance.store.dispatch(actions.initApp());
      }
      storeInstance.store.dispatch(actions.readyToNavigate(ready));
    },
    [storeInstance.store, storeInstance.persist],
  );

  React.useEffect(() => {
    const changeListener = AppState.addEventListener(
      'change',
      _handleAppStateChange,
    );
    _handleReadyToNavigate(false);
    return () => {
      changeListener.remove();
    };
  }, [_handleAppStateChange, _handleReadyToNavigate]);

  const [isLoading, setLoading] = React.useState(true);
  const toggleLoader = React.useCallback(() => {
    setLoading(false);
    _handleReadyToNavigate(true);
  }, [setLoading, _handleReadyToNavigate]);
  console.log('RENDER storeInstance isLoading:', isLoading);

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <Provider store={storeInstance.store}>
        {isLoading && (
          <AppLoader testID="app-loader" toggleVisibility={toggleLoader} />
        )}
        <PersistGate
          loading={<ActivityIndicator />}
          persistor={storeInstance.persist}>
          <SafeAreaWrapper>
            <AppContainer />
          </SafeAreaWrapper>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
