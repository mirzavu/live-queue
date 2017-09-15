import React from 'react';
import { Animated, AppRegistry, StyleSheet, Text, View } from 'react-native';
// import { StackNavigator } from 'react-navigation';


export default class ChatScreen extends React.Component {
  static navigationOptions = {
    title: 'Chat with Lucy',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>Chat with Lucy</Text>
      </View>
    );
  }
}


AppRegistry.registerComponent('ChatScreen', () => ChatScreen);