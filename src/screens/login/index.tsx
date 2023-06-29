import React, {useCallback, useEffect, useState} from 'react';
import {
  Box,
  Button,
  Stack,
  Surface,
  Text,
  TextInput,
} from '@react-native-material/core';
import * as RootNavigation from '@src/navigation/navigator';
import {commonStyles} from '@src/styles';
import {connect} from 'react-redux';
import {Dispatch} from '@reduxjs/toolkit';
import {RootState} from '@src/app/parent';
import {getLoginError, getRequestStatus} from './selectors';
import {actions} from './slicer';
import {Error} from './types';

export const initialFormState = {
  email: '',
  password: '',
};
export interface MappedDispatchProps {
  loginStart: (username: string, password: string) => void;
  clearError: () => void;
}
export interface MappedStateProps {
  error?: Error;
  requesting: boolean;
}
export type LoginScreenProps = MappedStateProps & MappedDispatchProps;

const LoginScreen = (props: LoginScreenProps) => {
  const [{email, password}, setState] = useState(initialFormState);

  useEffect(() => {
    props.clearError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onInputTextChange = useCallback((fieldName: string, value: string) => {
    setState(prevState => ({...prevState, [fieldName]: value}));
  }, []);

  const onLogin = useCallback(() => {
    props.clearError();
    props.loginStart(email, password);
  }, [email, password, props]);

  return (
    <Stack fill center spacing={4}>
      <Surface
        elevation={6}
        category="large"
        style={commonStyles.surfaceWrapper}>
        <Text testID="card-title-txt" variant="h4">
          Welcome, Login to continue
        </Text>
        <Box style={commonStyles.inputWrapper}>
          <TextInput
            testID="input-email-login"
            placeholder="Enter user email"
            variant="outlined"
            style={commonStyles.input}
            onChangeText={value => onInputTextChange('email', value)}
          />
          <TextInput
            testID="input-password-login"
            placeholder="Enter password"
            variant="outlined"
            style={commonStyles.input}
            secureTextEntry
            onChangeText={value => onInputTextChange('password', value)}
          />
          {props.error?.message && (
            <Text testID="error-msg-txt-login" variant="h6" color="red">
              {props.error.message}
            </Text>
          )}
        </Box>
        <Button
          testID="btn-login"
          title="Login"
          style={commonStyles.button}
          onPress={onLogin}
          loading={props.requesting}
        />
        <Button
          testID="btn-register"
          title="Register"
          variant="outlined"
          style={commonStyles.button}
          onPress={() => {
            RootNavigation.navigate('Register');
          }}
        />
      </Surface>
    </Stack>
  );
};

export const mapStateToProps = (state: RootState): MappedStateProps => {
  return {
    requesting: getRequestStatus(state),
    error: getLoginError(state),
  };
};

export const mapDispatchToProps = (dispatch: Dispatch): MappedDispatchProps => {
  return {
    loginStart: (username: string, password: string) => {
      dispatch(actions.loginStarted(username, password));
    },
    clearError: () => {
      dispatch(actions.clearLoginError());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
