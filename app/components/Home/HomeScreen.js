import React from 'react';
import { 
  Animated, 
  AppRegistry, 
  StyleSheet, 
  Text, 
  View, 
  TouchableHighlight,
  TouchableOpacity,
  Alert,
  BackHandler } from 'react-native';
  
import Fadein from '../Helpers/Fadein';
import { Button, Icon } from 'react-native-elements';
// import { StackNavigator } from 'react-navigation';

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Welcome',
    headerLeft: null,
    headerTitleStyle: {
        color: 'white',
        fontWeight: '700',
        justifyContent: 'space-between',
        alignSelf: 'center'
      },
    headerStyle: {
        backgroundColor: '#4ac7ff',
        shadowOpacity: 0,
        marginTop: 24,
      },
    headerTintColor: '#f44268'
  };

  constructor(props){
    super(props);

    this.state = {
      test: "l dfla",
      fadeAnim: new Animated.Value(0)
    };
  }

  componentDidMount() {
    Animated.timing(                  // Animate over time
      this.state.fadeAnim,            // The animated value to drive
      {
        toValue: 1,                   // Animate to opacity: 1 (opaque)
        duration: 1000,              // Make it take a while
      }
    ).start();                        // Starts the animation


    BackHandler.addEventListener('hardwareBackPress', () => {
      console.log(this);
      return false;
      if(this.props.navigation.state.routeName == "Home")
      {
        console.log('2')
      }
      console.log('dfdfd')
      return false;
    });
  }



  render() {
    let { fadeAnim } = this.state;
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        {/* <Fadein style={{opacity: fadeAnim}}>
          <Text style={styles.bigblue}>Helo {this.state.test}</Text>
        </Fadein>
      */}
          {/*<Button
          large
          iconTop
          icon={{name: 'rowing'}}
          textStyle={styles.submitText}
          buttonStyle={styles.submit}
          title='Login' />
          <Button
          large
          icon={{name: 'add-user'}}
          textStyle={styles.submitText}
          buttonStyle={styles.submit}
          title='Register' />*/}
          <Fadein style={{flex:1,flexDirection: 'row', alignItems: 'center', }}>
            <TouchableOpacity 
              style={styles.icon}
              onPress={() => console.log(this.props.navigation.state.routeName)} >

              <Icon
                raised
                name='login'
                type='entypo'
                color='#68a0cf'
                />
              <Text style={styles.iconText}>Join Queue</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon}
            onPress={() => navigate('Register')} >

              <Icon
                raised
                name='add-user'
                type='entypo'
                color='#68a0cf'
                />
              <Text style={styles.iconText}>Create Queue</Text>
            </TouchableOpacity>
          </Fadein>
          <Fadein style={{flex:1,flexDirection: 'row', alignItems: 'center', }}>
            <TouchableOpacity 
              style={styles.icon}
              onPress={() => console.log(this.props.navigation.state.routeName)} >

              <Icon
                raised
                name='add-user'
                type='entypo'
                color='#68a0cf'
                />
              <Text style={styles.iconText}>My Queue</Text>
            </TouchableOpacity>
          </Fadein>
          <TouchableOpacity
            style={styles.submit}
            onPress={() => this.submitSuggestion(this.props)}
            underlayColor='#fff'>
              <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  icon: {
    flex: 1, 
    flexDirection: 'column',
    alignItems: 'center',
  },
  red: {
    color: 'red',
  },
  submit:{
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#68a0cf',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  submitText:{
      color:'#fff',
      textAlign:'center',
      fontWeight: 'bold'
  },
  iconText:{
      color:'#68a0cf',
      fontWeight: 'bold',
      fontSize: 18
  }
});

AppRegistry.registerComponent('HomeScreen', () => HomeScreen);