import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {connect} from 'react-redux';
import LoginScreen from '@src/screens/login';
import {rootLoginSelector} from '@src/screens/login/selectors';
import {getScreenOptions} from './utilities';
import {RootState} from '@src/app/parent';

import RegisterScreen from '@src/screens/registeration';
import DashboardScreen from '@src/screens/dashboard';
import StoryDetailScreen from '@src/screens/dashboard/children/StoryDetailView';
import SearchScreen from '@src/screens/dashboard/children/SearchScreen';

const Stack = createStackNavigator();

export type Props = {
  isLoggedIn: boolean;
  isProcessing: boolean;
};
type State = {
  rebuildingUI: boolean;
};
export class RootNavigator extends React.Component<Props, State> {
  public state = {
    rebuildingUI: false,
  };
  render() {
    const {isLoggedIn} = this.props;
    const mode = 'card';
    const screenOptions = getScreenOptions({
      cardOverlayEnabled: true,
      headerShown: false,
      presentation: mode,
    });
    return (
      <>
        <Stack.Navigator
          initialRouteName={isLoggedIn ? 'Dashboard' : 'Login'}
          screenOptions={screenOptions}>
          {isLoggedIn ? (
            <>
              <Stack.Screen name="Dashboard" component={DashboardScreen} />
              <Stack.Screen name="StoryDetail" component={StoryDetailScreen} />
              <Stack.Screen name="SearchScreen" component={SearchScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
            </>
          )}
        </Stack.Navigator>
      </>
    );
  }
}

export const mapStateToProps = (state: RootState) => {
  const logInSelector = rootLoginSelector(state);
  const isProcessing = logInSelector.requesting;
  return {
    isLoggedIn: logInSelector.loggedIn && !isProcessing,
    isProcessing,
  };
};

export default connect(mapStateToProps)(RootNavigator);
