import React from 'react';
import { Keyboard, AsyncStorage, Alert, ActivityIndicator,Animated, AppRegistry, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import styles from "./styles";
import config from "AwesomeProject/app/config";
import { Permissions, Notifications } from 'expo';

export default class RegisterScreen extends React.Component {
  static navigationOptions = {
    title: 'Registration',
    headerLeft: null,
    headerTitleStyle: {
      alignSelf: 'center'
    },
  };

  constructor(){
    super();
    this.state = {
      loading: false,
      name: "",
      email: "",
      errors: []
    }
  }

  async registerForPushNotificationsAsync() {
    const { existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    console.log(token);
    // POST the token to our backend so we can use it to send pushes from there
    return fetch(PUSH_ENDPOINT, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: {
          value: token,
         },
         user: {
          username: 'Brent',
         },
      }),
    });
  }


  async onRegister(){
    Keyboard.dismiss();
    const token = await AsyncStorage.getItem('access_token');
    const {navigate} = this.props.navigation;
    this.setState({loading: true, errors: []});
    try {
      let response = await fetch(config.API_URL+'auth/signup', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token
        },
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email
        })
      });
      let responseJson = await response.json();
      console.log(responseJson);
      this.setState({loading: false});
      if(responseJson.status == "fail") //validation fail
      {
        var error_arr = Object.keys(responseJson.error).reduce((errors, err) => {
          errors[err] = responseJson.error[err];
          return errors;
        }, []);
        this.setState({ errors: error_arr});
        console.log(this.state.errors['email']);
      }
      else if(responseJson.status == "ok")
      {
        navigate('Home');
      }
      else{
        Alert.alert('Error', responseJson.error.message,
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: true }
        )
      }
    } catch(error) {
      this.setState({loading: false});
      console.log(error);
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    console.log(this.state.loading);
    return (
      <View style={styles.container}>
        <View>

          <FormLabel>Name</FormLabel>
          <FormInput 
            onChangeText={(val) => this.setState({name: val})}
            underlineColorAndroid="transparent" 
            inputStyle={styles.forminput} 
            containerStyle={styles.c}
          />
          <FormValidationMessage>{this.state.errors['name']}</FormValidationMessage>
        </View>
        <View>
          <FormLabel>Email</FormLabel>
          <FormInput 
            onChangeText={(val) => this.setState({email: val})}
            underlineColorAndroid="transparent" 
            inputStyle={styles.forminput} 
            containerStyle={styles.c}
          />
          <FormValidationMessage>{this.state.errors['email']}</FormValidationMessage>
        </View>
        <View>
          <TouchableOpacity
            style={styles.submit}
            onPress={() => this.onRegister(this.props)}
            underlayColor='#fff'>
              <Text style={styles.iconText}>REGISTER</Text>
          </TouchableOpacity>
        </View>
        {this.state.loading &&
           <View style={styles.loading}>
            <ActivityIndicator
                 animating = {true}
                 color = '#e87d7d'
                 size = "large"/>
          </View>
        }
        
      </View>
    );
  }
}