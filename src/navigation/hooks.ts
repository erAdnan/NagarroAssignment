import React, {RefObject} from 'react';

export function useRouteTracker(
  navigationRef: RefObject<any>,
  isReadyRef: React.MutableRefObject<unknown>,
  onRouteChange: (newRoute?: string, oldRoute?: string) => void,
) {
  const routeNameRef = React.useRef<string>();

  const onReady = () => {
    isReadyRef.current = true;
    routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
  };
  const onStateChange = () => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

    if (previousRouteName !== currentRouteName) {
      onRouteChange(currentRouteName, previousRouteName);
    }

    // Save the current route name for later comparison
    routeNameRef.current = currentRouteName;
  };

  return [onReady, onStateChange] as const;
}
