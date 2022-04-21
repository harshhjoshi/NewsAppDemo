import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Splash from './src/screen/splash';
import DashBoard from './src/screen/DashBoard';

const AuthNavigator = createStackNavigator(
  {
    Splash: {
      screen: Splash,
    },
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);

const MainNavigator = createStackNavigator(
  {
    SideDrawer: {
      screen: AuthNavigator,
    },
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);

const AppNavigator = createSwitchNavigator(
  {
    Splash: {screen: Splash},
    DashBoard: {screen: DashBoard},
    MainNavigator: {screen: MainNavigator},
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);

const NavApp = createAppContainer(AppNavigator);

class App extends React.Component {
  render() {
    return <NavApp />;
  }
}

export default App;
