import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';
import SignUp from './containers/signUp';
import Home from './containers/home';
import Auth from './auth';

const AppStack = createStackNavigator({Home});
const AuthStack = createStackNavigator({SignUp});

console.disableYellowBox = true;

let Routes = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: Auth,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);

export default Routes;
