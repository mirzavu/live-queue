import React from 'react';
import { 
  Animated, 
  AppRegistry, 
  StyleSheet, 
  Text, 
  View, 
  StatusBar,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  Keyboard,
  BackHandler } from 'react-native';
  
import Fadein from '../Helpers/Fadein';
import { Button, Icon } from 'react-native-elements';
import config from "AwesomeProject/app/config";
// import Pusher from 'pusher-js/react-native';
// import Echo from "laravel-echo";
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
      },
    headerTintColor: '#f44268'
  };

  constructor(props){
    super(props);
    global.active_screen = "HomeScreen";
    this.state = {
      fadeAnim: new Animated.Value(0)
    };
  }

  componentWillFocus(){
    console.log('componentWillFocus');
  }

  componentDidFocus(){
    console.log('componentDidFocus');
  }

  async componentDidMount() {
    // window.Pusher = Pusher;

    // window.Echo = new Echo({
    //     namespace: false,
    //     authEndpoint: config.SERVER_URL+'broadcasting/auth',
    //     broadcaster: 'pusher',
    //     key: 'cf609109f834e7a8aab8',
    //     cluster: 'ap2',
    //     encrypted: true
    // });
    // console.log(window.Echo);

    // window.Echo.private('channel-name')
    // .listen('.token-new', (e) => {
    //     console.log(e);
    // }).listen('token-new', (e) => {
    //     console.log(e);
    // });
    
    

    Keyboard.dismiss();
    const {navigate} = this.props.navigation;
    const token = await AsyncStorage.getItem('access_token');
    if(token)
    {
      let response = await fetch(config.API_URL+'checkQueue', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token
        }
      });
      let responseJson = await response.json();
      console.log(responseJson);
      if(responseJson.status == "inqueue")
      {
        navigate('Holder', {qr: responseJson.qr});
      }
      else if(responseJson.status == "runningqueue")
      {
        navigate('QRDisplay');
      }

    }
    
    
    
    Animated.timing(                  // Animate over time
      this.state.fadeAnim,            // The animated value to drive
      {
        toValue: 1,                   // Animate to opacity: 1 (opaque)
        duration: 1000,              // Make it take a while
      }
    ).start();                        // Starts the animation


    BackHandler.addEventListener('hardwareBackPress', () => {

      switch(global.active_screen) {
          case "HolderScreen":
              alert('Please leave the queue to go back');
              return true;
              break;
          case "HomeScreen":
              BackHandler.exitApp();
              return true;
              break;
          case "QRDisplay":
              global.active_screen = "HomeScreen";
              return false;
              break;
          case "QRJoin":
              global.active_screen = "HomeScreen";
              return false;
              break;
          default:
              return false;
      }
    });
  }



  render() {
    let { fadeAnim } = this.state;
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="blue"
        barStyle="light-content" />
        {/* <Fadein style={{opacity: fadeAnim}}>
          <Text style={styles.bigblue}>Helo {this.state.test}</Text>
        </Fadein>
      */}
          <Fadein style={{flex:1,flexDirection: 'row', alignItems: 'center', }}>
            <TouchableOpacity 
              style={styles.icon}
              onPress={() => navigate('QRJoin')} >

              <Icon
                raised
                name='login'
                type='entypo'
                color='#68a0cf'
                />
              <Text style={styles.iconText}>Join Queue</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon}
            onPress={() => navigate('QRDisplay')} >

              <Icon
                raised
                name='add-user'
                type='entypo'
                color='#68a0cf'
                />
              <Text style={styles.iconText}>Create Queue</Text>
            </TouchableOpacity>
          </Fadein>
          <Fadein style={{flex:2,flexDirection: 'row', alignItems: 'center', }}>
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
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#232f3e'
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
  iconText:{
      color:'#edf3ff',
      fontWeight: 'bold',
      fontSize: 18
  }
});

AppRegistry.registerComponent('HomeScreen', () => HomeScreen);