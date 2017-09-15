import React from 'react';
import {
  AppRegistry,
  Text,
  View
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import HomeScreen from './app/components/Home/HomeScreen';
import ChatScreen from './app/components/Chat/ChatScreen';
import SplashScreen from './app/components/Home/SplashScreen';
import LoginScreen from './app/components/Login/LoginScreen';
import RegisterScreen from './app/components/Register/RegisterScreen';



const SimpleApp = StackNavigator({
  Splash: { screen: SplashScreen },
  Home: { screen: HomeScreen },
  Chat: { screen: ChatScreen },
  Login: { screen: LoginScreen },
  Register: { screen: RegisterScreen },

},{
  mode: 'card',
  cardStyle: { backgroundColor: 'transparent' },
  tintColor: '#ffffff',
  headerMode: 'screen'
});

// class App extends React.Component {
// 	constructor(){
// 		super();
// 		this.navigator && this.navigator.dispatch({ type: 'Navigate' });
// 	}
// 	render() {
// 		return (
// 		      <View>
// 		      	<Text> dsfgdg</Text>
// 		      	<SimpleApp ref={nav => { this.navigator = nav; }} />
// 		      </View>
//     );
//   }
// }



export default SimpleApp;
// AppRegistry.registerComponent('SimpleApp', () => SimpleApp);