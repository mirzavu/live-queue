import React from 'react';
import Expo from 'expo';
import {
  AppRegistry,
  Text,
  View,
  Platform,
  BackHandler
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import HomeScreen from './app/components/Home/HomeScreen';
import SplashScreen from './app/components/Home/SplashScreen';
import RegisterScreen from './app/components/Register/RegisterScreen';
import OTPScreen from './app/components/OTP/OTPScreen';
import LoadScreen from './app/components/Home/LoadScreen';
import QRDisplay from './app/components/QR/QRDisplay';
import QRJoin from './app/components/QR/QRJoin';
import HolderScreen from './app/components/Holder/HolderScreen.js';



const SimpleApp = StackNavigator({
  Load: { screen: LoadScreen},
  OTP: { screen: OTPScreen },
  Splash: { screen: SplashScreen },
  Home: { screen: HomeScreen },
  Register: { screen: RegisterScreen },
  QRDisplay: { screen: QRDisplay },
  QRJoin: { screen: QRJoin },
  Holder: { screen: HolderScreen },

},{
  mode: 'card',
  cardStyle: {  //To avoid status bar overlapping
  	paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight
   },
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
// 		      	<SimpleApp/>
// 		      </View>
//     );
//   }
// }


global.active_screen = "";
export default SimpleApp;
// AppRegistry.registerComponent('SimpleApp', () => SimpleApp);