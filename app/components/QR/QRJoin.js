import React from 'react';
import {  
  StyleSheet, 
  Text, 
  AsyncStorage,
  ActivityIndicator,
  BackHandler,
  View} from 'react-native';
  
import config from "AwesomeProject/app/config";
import { BarCodeScanner, Permissions } from 'expo';

export default class QRJoin extends React.Component {

  static navigationOptions = {
    title: "Scan QR code",
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
  }

  constructor(){
      super();
      global.active_screen = "QRJoin";
  }

  state = {
    hasCameraPermission: null,
    scan: false
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
  }

  _handleBarCodeRead = ({ type, data }) => {
    console.log(this.state.scan)
    const {navigate} = this.props.navigation;
    console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
    this.setState({scan: true});
    if(!this.state.scan)
    {
      navigate('Holder', {qr: data});
    }
    
    
  }

  _onBarCodeRead = (data) =>{    
    console.log(this.state.status)
    this.setState({status: 2});
                 if (this.props.onBarCodeRead) {
                  console.log('2222')
                  navigate('Holder');
                        this.componentWillUnmount()
                       this.props.onBarCodeRead(data)
                       setTimeout(() => {
                                 this.componentWillMount();
                      }, 3000);

               }
        };


  render() {
      const { hasCameraPermission } = this.state;

      if (hasCameraPermission === null) {
        return <Text>Requesting for camera permission</Text>;
      } else if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
      } else {
        return (
          <View style={{ flex: 1 }}>
            <BarCodeScanner
              onBarCodeRead={this._handleBarCodeRead}
              style={StyleSheet.absoluteFill}
            />
          </View>
        );
      }
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