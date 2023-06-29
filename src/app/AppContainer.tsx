import React from 'react';
import {useReduxDevToolsExtension} from '@react-navigation/devtools';
import {NavigationContainer} from '@react-navigation/native';
import type {NavigationState} from '@react-navigation/routers';
import {getStoreInstance} from '@src/store/store';
import RootNavigator from '@src/navigation/RootNavigator';
import {useRouteTracker} from '@src/navigation/hooks';
import {actions} from './slicer';
import {getRoute, getLastOpenedTime} from './selectors';
import {connect} from 'react-redux';
import {Dispatch} from '@reduxjs/toolkit';
import ErrorBoundary from './ErrorBoundary';
import {RootState} from './parent';
import {isReadyRef, navigationRef} from '@src/navigation/navigator';

const notReady = () => {
  isReadyRef.current = false;
};

export interface AppContainerProps {
  reduxRoute: (
    state: NavigationState | undefined,
    onStateChange: () => void,
  ) => void;
  localeTimestamp: number;
}

export const AppContainer: React.FC<AppContainerProps> = ({
  reduxRoute,
  localeTimestamp,
}) => {
  const storeInstance = getStoreInstance();
  const initialState = getRoute(storeInstance.store.getState());

  const onRouteChange = (newRoute?: string, oldRoute?: string) => {
    console.log('App route has changed', {newRoute, oldRoute});
  };
  const [onReady, onStateChange] = useRouteTracker(
    navigationRef,
    isReadyRef,
    onRouteChange,
  );

  useReduxDevToolsExtension(navigationRef);

  const getReduxRoute = React.useCallback(
    (state: any) => {
      return reduxRoute(state, onStateChange);
    },
    [onStateChange, reduxRoute],
  );

  React.useEffect(() => {
    return notReady;
  }, []);

  return (
    <NavigationContainer
      initialState={initialState}
      ref={navigationRef}
      onReady={onReady}
      onStateChange={getReduxRoute}
      key={`${localeTimestamp}`}>
      <ErrorBoundary>
        <RootNavigator />
      </ErrorBoundary>
    </NavigationContainer>
  );
};

export const mapStateToProps = (state: RootState) => {
  return {
    localeTimestamp: getLastOpenedTime(state),
  };
};

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    reduxRoute: (
      state: NavigationState | undefined,
      onStateChange: () => void,
    ) => {
      if (state) {
        dispatch(actions.routeChanged({route: state}));
      }
      onStateChange();
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
