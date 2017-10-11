import React from 'react';
import { 
  AsyncStorage, 
  Easing, 
  TextInput, 
  Alert, 
  ActivityIndicator,
  Animated, 
  AppRegistry, 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity } from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import styles from "./styles";
import config from "AwesomeProject/app/config";
import Fadein from '../Helpers/Fadein';
import {
  Notifications,
} from 'expo';
import Pusher from 'pusher-js/react-native';

export default class HolderScreen extends React.Component {
  static navigationOptions = {
    title: 'In Queue',
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
    titleStyle: {
      textAlign: "center",
      color: 'white'
    }
  };

  constructor(){
    super();
    global.active_screen = "HolderScreen";
    this.state = {
      queue_id: null,
      token: "",
      cur_token: "",
      offsetX: new Animated.Value(0)
    }
  }

  componentWillUnmount(){
    global.active_screen = "";
  }

  _handleNotification = (notification) => {
    console.log(notification);
  };

  async componentWillMount(){
    const { params } = this.props.navigation.state;
    console.log('lalalal');
    try {
        const {navigate} = this.props.navigation;
        const token = await AsyncStorage.getItem('access_token');
        if(token)
        {
          let response = await fetch(config.API_URL+'qrData', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+token
            },
            body: JSON.stringify({
              qr: params.qr
            })
          });
          let responseJson = await response.json();
          this.setState({
            cur_token: responseJson.current,
            token: responseJson.token,
            queue_id: responseJson.queue_id
          });

          console.log(responseJson);

          //Setup pusher
          Pusher.logToConsole = true;

          const socket = new Pusher('cf609109f834e7a8aab8', {
            cluster: 'ap2',
            authEndpoint: config.SERVER_URL+'broadcasting/auth',
          });
          const channel = socket.subscribe('channel-name'+this.state.queue_id);
          // channel.bind_global(function (event, data) {
          //   console.log(`The event ${event} was triggered with data ${data}`);
          // });
          $this = this;
          channel.bind('token-new', function (data) {
            
            $this.setState({ offsetX: new Animated.Value(-500)});
            Animated.timing(                  
              $this.state.offsetX, 
              {
                toValue: 0,
                duration: 500, 
              }
            ).start();
            $this.setState({
              cur_token: data.queue.cur_token,
            });
          });
          
        }
        
      } catch (error) {
        console.log(error);
        // Error retrieving data
      }

     this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  async leaveQueue(){
    console.log('0');
    const {navigate} = this.props.navigation;
    try {
        const token = await AsyncStorage.getItem('access_token');
        if(token)
        {
          let response = await fetch(config.API_URL+'leaveQueue', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+token
            }
           });
          let responseJson = await response.json();
          console.log(responseJson);
          if(responseJson.status=='ok')
          {
            navigate('Home');
          }
        }
        
      } catch (error) {
        console.log(error);
        // Error retrieving data
      }
    
  }

  render() {
    let { offsetX } = this.state;
    return (
      <View style={styles.container}>
          <Animated.View style={{ transform: [{translateX: this.state.offsetX}] }}>
            <View style={styles.token_box}>
               <Text style={styles.token_text}>{this.state.cur_token}</Text>
               
            </View>
          </Animated.View>
          <Text style={styles.text}>Your token number is {this.state.token}</Text>
          {/*<Text style={styles.text}>Estimated wait time is</Text>*/}
          <TouchableOpacity
            style={styles.cancel_button}
            onPress={() => this.leaveQueue()}
            underlayColor='#fff'>
              <Text style={styles.iconText}>Leave Queue</Text>
          </TouchableOpacity>
      </View>
    );
  }
}