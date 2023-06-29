import * as React from 'react';
import {persistStore} from 'redux-persist';
import {getStoreInstance} from '@src/store/store';
import {Flex, Text} from '@react-native-material/core';

/**
 * TODO: PLEASE MOVE THIS COMPONENT TO ERROR SERVICE.
 * Design system components should not be aware of redux store, and only take props.
 */

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | undefined;
  errorInfo: React.ErrorInfo | undefined;
  reportSent: boolean;
}
export interface ChildrenProps {
  children: React.ReactNode;
}
export default class ErrorBoundary extends React.Component<
  ChildrenProps,
  ErrorBoundaryState
> {
  public errorCode = 4404;
  public state: ErrorBoundaryState = {
    hasError: false,
    error: undefined,
    errorInfo: undefined,
    reportSent: false,
  };

  public componentDidCatch = async (e: Error, info: React.ErrorInfo) => {
    this.setState({hasError: true, error: e, errorInfo: info});
  };

  public exitApp = async () => {
    const store = getStoreInstance().store;
    await persistStore(store).purge();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <Flex fill justify="center" items="center">
          <Text variant="h2" color="red">
            An error occured...
          </Text>
        </Flex>
      );
    } else {
      return this.props.children;
    }
  }
}
