import React from 'react';
import { Alert, ActivityIndicator,Animated, AppRegistry, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import styles from "./styles";
import config from "AwesomeProject/app/config";

export default class RegisterScreen extends React.Component {
  static navigationOptions = {
    title: 'Registration',
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

  async onRegister(){
    this.setState({loading: true, errors: []});
    try {
      let response = await fetch(config.API_URL+'auth/signup', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
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
      else if(responseJson.status == "success")
      {

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