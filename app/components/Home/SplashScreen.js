import React from 'react';
import { Animated, AppRegistry, StyleSheet, Image, Text, View, Button } from 'react-native';
// import { StackNavigator } from 'react-navigation';

export default class SplashScreen extends React.Component {

  static navigationOptions = {
    header: null
  }

  constructor(props){
    super(props);

    this.state = {
      test: "l dfla",
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
    setTimeout(function(){ navigate('Home') }, 2600);               // Starts the animation
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
