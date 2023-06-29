import React from 'react';
import {LogBox, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {RootState} from './parent';
import {isPersistorReady} from './selectors';
import {Stack, Text} from '@react-native-material/core';

LogBox.ignoreAllLogs();
export interface AppLoaderProps {
  toggleVisibility: () => void;
  isReady?: boolean;
  testID?: string;
}

export const AppLoader: React.FC<AppLoaderProps> = ({
  toggleVisibility,
  isReady,
}) => {
  React.useEffect(() => {
    if (isReady) {
      setTimeout(() => {
        toggleVisibility();
      }, 200);
    }
  }, [isReady, toggleVisibility]);

  return (
    <Stack style={styles.wrapper} m={4} spacing={4}>
      <Text variant="h2" color="green">
        App Loading...
      </Text>
    </Stack>
  );
};

export const mapStateToProps = (state: RootState) => {
  const isReady = isPersistorReady(state);
  return {
    isReady,
  };
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1000,
  },
});
export default connect(mapStateToProps, null)(AppLoader);
