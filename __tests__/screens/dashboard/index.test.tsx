import 'react-native';
import React from 'react';
import Dashboard from '@src/screens/dashboard';
import {Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';
import {it, describe, expect} from '@jest/globals';
import renderer from 'react-test-renderer';
const mockStore = configureMockStore();

describe('Dashboard', () => {
  it('Dashboard should renders correctly', async () => {
    const store = mockStore({
      dashboard: {
        topStories: {loading: false},
        requesting: false,
      },
      login: {},
    });
    renderer.create(
      <Provider store={store}>
        <Dashboard />,
      </Provider>,
    );
  });
  it('should check for loader', async () => {
    const store2 = mockStore({
      dashboard: {
        topStories: {loading: true},
        requesting: false,
      },
      login: {},
    });

    const wrapper = renderer.create(
      <Provider store={store2}>
        <Dashboard />
      </Provider>,
    );
    const rootInstance = wrapper.root;
    const element = rootInstance.findByProps({testID: 'loader'});

    expect(element.props.size).toBe('large');
  });
  it('should show list with mock data', async () => {
    const store2 = mockStore({
      dashboard: {
        topStories: {
          loading: false,
          data: [
            {title: 'ny times'},
            {title: 'ny times 2'},
            {title: 'ny times', multimedia: [{url: 'https://www.google.com'}]},
          ],
        },
        requesting: false,
      },
      login: {},
    });

    const wrapper = renderer.create(
      <Provider store={store2}>
        <Dashboard />
      </Provider>,
    );
    const rootInstance = wrapper.root;
    const listElement = rootInstance.findByProps({testID: 'news-item-0'});

    expect(listElement.props.leadingMode).toBe('avatar');
  });
});
