import React from 'react';
import { AsyncStorage, Animated, AppRegistry, StyleSheet, Image, Text, View, Button } from 'react-native';
// import { StackNavigator } from 'react-navigation';
import config from "AwesomeProject/app/config";

export default class SplashScreen extends React.Component {

  static navigationOptions = {
    header: null
  }

  constructor(props){
    super(props);

    this.state = {
      fadeAnim: new Animated.Value(0)
    };
  }

  componentDidMount() {
    const {navigate} = this.props.navigation;
    Animated.timing(                  // Animate over time
      this.state.fadeAnim,            // The animated value to drive
      {
        toValue: 1,                   // Animate to opacity: 1 (opaque)
        duration: 300,              // Make it take a while
      }
    ).start();
    setTimeout(() => {
     Animated.timing(                  // Animate over time
      this.state.fadeAnim,            // The animated value to drive
      {
        toValue: 0,                   // Animate to opacity: 1 (opaque)
        duration: 300,              // Make it take a while
      }
    ).start();

     }, 2000); 

    setTimeout(async function(){
       try {
         console.log('start')
        const token = await AsyncStorage.getItem('access_token');
        if(token)
        {
          let response = await fetch(config.API_URL+'auth/verifyToken?token='+token);
          let responseJson = await response.json();
          if(responseJson.user)
          {
            navigate('Home');
          }
          else
          {
            navigate('OTP');
          }
        }
        else {
          navigate('OTP');
        }
        
      } catch (error) {
        console.log(error);
        // Error retrieving data
      }

    }, 2500);               // Starts the animation
  }



  render() {
    let { fadeAnim } = this.state;
    const { navigate } = this.props.navigation;

    return (
      <View style={{flex: 1}}>
        <Animated.View style={{opacity: fadeAnim, flex: 1}}>
          <Image
          style={{ flex: 1}}
          resizeMode="cover"
          source={{uri: 'http://images.mobile-patterns.com/1418337663850-2014-12-11%2015.16.39.png'}}
        />
          
        </Animated.View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  splash: {
    flex:1,
    backgroundColor: '#fff',
    height: 30,
    width: 50
  },
  bigblue: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    backgroundColor: '#3587f9',
    padding: 5,
    margin: 10
  },
  red: {
    color: 'red',
  },
  p:{"borderStyle":"solid"}
});
