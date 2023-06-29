import {StackNavigationOptions} from '@react-navigation/stack';

export const getScreenOptions = (
  options?: StackNavigationOptions,
): StackNavigationOptions => {
  return {
    gestureDirection: 'horizontal',
    ...options,
    headerShown: false,
  };
};
