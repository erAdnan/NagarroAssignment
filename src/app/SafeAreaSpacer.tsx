import * as React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {View, ViewStyle} from 'react-native';

type SpacerProps = {
  style?: ViewStyle;
};

/**
 * View spacer to get the safe area for top edge components
 * @param param0
 * @returns
 */

export const SafeAreaSpacer: React.FC<SpacerProps> = ({style}): JSX.Element => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        ...style,
        paddingTop: insets.top,
      }}
    />
  );
};

/**
 * View spacer to get the safe area for bottom edge components
 * @param param0
 * @returns
 */

export const SafeAreaBottomSpacer: React.FC<SpacerProps> = ({
  style,
}): JSX.Element => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        ...style,
        paddingBottom: insets.bottom,
      }}
    />
  );
};

/**
 * View wrapper with a negative margin to properly fill the non safe area style
 * @param param0
 * @returns
 */
export interface ChildrenProps {
  children: React.ReactNode;
}
export const SafeAreaWrapper: React.FC<ChildrenProps> = ({
  children,
}): JSX.Element => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        marginTop: -1 * insets.top,
      }}>
      <SafeAreaSpacer />
      {children}
    </View>
  );
};
