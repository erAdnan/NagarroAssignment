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
import {MappedStateProps, initialFormState} from '../login';
import {commonStyles} from '@src/styles';
import {RootState} from '@src/app/parent';
import {getLoginError, getRequestStatus} from '../login/selectors';
import {Dispatch} from '@reduxjs/toolkit';
import {actions} from '../login/slicer';
import {connect} from 'react-redux';

export interface RegisterMappedDispatchProps {
  registerStart: (username: string, password: string) => void;
  clearError: () => void;
}

export type ScreenProps = MappedStateProps & RegisterMappedDispatchProps;

const RegisterScreen = (props: ScreenProps) => {
  const [{email, password}, setState] = useState(initialFormState);

  useEffect(() => {
    props.clearError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onInputTextChange = useCallback((fieldName: string, value: string) => {
    setState(prevState => ({...prevState, [fieldName]: value}));
  }, []);

  const onCreateAccount = useCallback(() => {
    props.registerStart(email, password);
  }, [email, password, props]);
  return (
    <Stack fill center spacing={4}>
      <Surface
        elevation={6}
        category="large"
        style={commonStyles.surfaceWrapper}>
        <Button
          title="←"
          style={commonStyles.backButton}
          onPress={() => {
            RootNavigation.goBack();
          }}
        />
        <Text variant="h4">Create your account here</Text>
        <Box style={commonStyles.inputWrapper}>
          <TextInput
            placeholder="Enter your email"
            variant="outlined"
            style={commonStyles.input}
            onChangeText={value => onInputTextChange('email', value)}
          />
          <TextInput
            placeholder="Enter your password"
            variant="outlined"
            style={commonStyles.input}
            secureTextEntry
            onChangeText={value => onInputTextChange('password', value)}
          />
          {props.error?.message && (
            <Text variant="h6" color="red">
              {props.error.message}
            </Text>
          )}
        </Box>
        <Button
          title="Register"
          style={commonStyles.button}
          onPress={onCreateAccount}
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

export const mapDispatchToProps = (
  dispatch: Dispatch,
): RegisterMappedDispatchProps => {
  return {
    registerStart: (username: string, password: string) => {
      dispatch(actions.registerStarted(username, password));
    },
    clearError: () => {
      dispatch(actions.clearLoginError());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
