import React from 'react';
import { AsyncStorage, Easing, TextInput, Alert, ActivityIndicator,Animated, AppRegistry, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import styles from "./styles";
import config from "AwesomeProject/app/config";
import Fadein from '../Helpers/Fadein';

export default class OTPScreen extends React.Component {
  static navigationOptions = {
    title: 'OTP Verification',
  };

  constructor(){
    super();
    this.state = {
      loading: false,
      mobile: "",
      otp: "",
      errors: [],
      offsetY: new Animated.Value(500),
    }
  }

  componentDidMount(){
    this.mobileInput.focus();
  }

  async onSubmit(){
    this.setState({loading: true, errors: []});
    try {
      let response = await fetch(config.API_URL+'auth/sendOTP', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobile: this.state.mobile
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
      }
      else if(responseJson.status == "ok")
      {
        this.otpInput.focus();
         Animated.timing(                  
          this.state.offsetY, 
          {
            toValue: 0,
            duration: 500, 
          }
        ).start(); 
         
         
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

  
  async onVerify(){
    const {navigate} = this.props.navigation;
    this.setState({loading: true, errors: []});
    try {
      let response = await fetch(config.API_URL+'auth/verifyOTP', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobile: this.state.mobile,
          otp: this.state.otp
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
      }
      else if(responseJson.status == "ok")
      {
        await AsyncStorage.setItem('access_token', responseJson.token);
        navigate(responseJson.navigate);
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
    let { offsetY } = this.state;
    return (
      <View style={styles.container}>
        <View>

          <FormLabel labelStyle={styles.label}>Enter your Mobile number</FormLabel>
          <FormInput 
            ref={ input => {this.mobileInput = input;}}
            onChangeText={(val) => this.setState({mobile: val})}
            underlineColorAndroid="transparent" 
            inputStyle={styles.forminput} 
            keyboardType={'phone-pad'}
            containerStyle={styles.c}
          />
          <FormValidationMessage>{this.state.errors['mobile']}</FormValidationMessage>
        </View>
        
        <View>
          <TouchableOpacity
            style={styles.submit}
            onPress={() => this.onSubmit(this.props)}
            underlayColor='#fff'>
              <Text style={styles.iconText}>Send OTP</Text>
          </TouchableOpacity>
        </View>

        <Animated.View style={{ transform: [{translateY: this.state.offsetY}] }}
        >
          <View style={styles.otpContainer}>
            <Text style={styles.label}>Enter OTP</Text>
            <TextInput
              ref={ input => {this.otpInput = input;}}
              style={styles.otpinput}
              onChangeText={(val) => this.setState({otp: val})}
              keyboardType={'phone-pad'}
              maxLength={4}
              underlayColor='white' />
            <TouchableOpacity
              style={styles.otpSubmit}
              onPress={() => this.onVerify(this.props)}
              underlayColor='#fff'>
                <Text style={styles.iconText}>Verify</Text>
            </TouchableOpacity>
            
          </View>
          <View style={styles.otpContainer}>
            <FormValidationMessage>{this.state.errors['otp']}</FormValidationMessage>
          </View>
        </Animated.View>

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