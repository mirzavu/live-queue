import React from 'react';
import { 
  Animated, 
  AppRegistry, 
  StyleSheet, 
  Text, 
  AsyncStorage,
  ActivityIndicator,
  View} from 'react-native';
  
import Fadein from '../Helpers/Fadein';
import config from "AwesomeProject/app/config";
// import { StackNavigator } from 'react-navigation';

export default class LoadScreen extends React.Component {

	static navigationOptions = {
		header: null
	}

	constructor(){
	    super();
	}

	async componentWillMount(){
    try {
        console.log('start');
        const {navigate} = this.props.navigation;
        const token = await AsyncStorage.getItem('access_token');
        console.log(token);
        if(token)
        {
        	console.log('aaaa');
          let response = await fetch(config.API_URL+'auth/verifyToken?token='+token);
          let responseJson = await response.json();
          console.log(responseJson);
          if(responseJson.user)
          {
            navigate('Home');
          }
          else{
          	navigate('OTP');
          }
        }
        else{
        	navigate('OTP');
        }
        
      } catch (error) {
        alert('Server error');
        // Error retrieving data
      }
  }

	render() {
	    return (
	    	<View style={styles.loading}>
	            <ActivityIndicator
	                 animating = {true}
	                 color = '#e87d7d'
	                 size = "large"/>
	        </View>
	    );
	}
}

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF88'
  }
});