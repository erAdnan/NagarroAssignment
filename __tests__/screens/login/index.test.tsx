import 'react-native';
import React from 'react';
import Login from '@src/screens/login';
import {Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';
import {it, describe, expect} from '@jest/globals';
import renderer from 'react-test-renderer';
import {actions} from '@src/screens/login/slicer';

const mockStore = configureMockStore();

describe('Dashboard', () => {
  it('Dashboard should renders correctly', async () => {
    const store = mockStore({
      dashboard: {},
      login: {requesting: false, error: null},
    });
    renderer.create(
      <Provider store={store}>
        <Login />,
      </Provider>,
    );
  });
  it('should check for loader', async () => {
    const store2 = mockStore({
      dashboard: {},
      login: {requesting: false, error: null},
    });

    const wrapper = renderer.create(
      <Provider store={store2}>
        <Login />
      </Provider>,
    );
    const rootInstance = wrapper.root;
    const elementTitleTxt = rootInstance.findByProps({
      testID: 'card-title-txt',
    });
    expect(elementTitleTxt.props.variant).toBe('hv');
    const btnLogin = rootInstance.findByProps({
      testID: 'btn-login',
    });
    btnLogin.props.onPress();
    store2.dispatch(actions.clearLoginError());
    expect(store2.getActions()).toEqual('login/clearLoginError');
  });
});
