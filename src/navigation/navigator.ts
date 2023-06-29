import * as React from 'react';
import {CommonActions} from '@react-navigation/native';

export const navigationRef =
  React.createRef<any>() as React.MutableRefObject<any>;
export const isReadyRef = React.createRef() as React.MutableRefObject<unknown>;

export function navigate(
  name: string,
  params?: Record<string, unknown> | undefined,
) {
  if (isReadyRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.navigate(name, params);
  } else {
    console.log("NAVIGATION: app hasn't mounted");
  }
}

export function goBack() {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current.goBack();
  }
}

export function getCurrentRoute() {
  return navigationRef.current?.getCurrentRoute();
}

export const setScreenHome = (index: number) => {
  if (isReadyRef.current && navigationRef.current) {
    const key =
      navigationRef.current.getRootState().routes[0].state?.routes[index].key;
    if (key) {
      navigationRef.current.dispatch(
        CommonActions.navigate({
          key: key,
        }),
      );
    }
  }
};
