import React from 'react';
import {  
  StyleSheet, 
  Text, 
  Alert,
  AsyncStorage,
  ActivityIndicator,
  Image,
  Button,
  TouchableOpacity,
  View} from 'react-native';
  
import config from "AwesomeProject/app/config";
import styles from "./styles";

export default class QRDisplay extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: "QR Display",
      headerRight: 
      <Button 
        color="#ec545a" 
        title="Delete"
        onPress={() => params.handleDelete()} 
      />,
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
    };
  };

  constructor(){
      super();
      global.active_screen = "QRDisplay";
  }

  state = {
    qr: '',
    token: '',
    loading: false
  }

  componentDidMount() {
      this.props.navigation.setParams({ handleDelete: this.alertDelete.bind(this) });
  }

  async componentWillMount(){
    const token = await AsyncStorage.getItem('access_token');
    console.log(token);
    if(token)
    {
      let response = await fetch(config.API_URL+'generateQR', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token
        }
      });
      let responseJson = await response.json();
      console.log(responseJson);
      if(responseJson.status == "ok")
      {
        this.setState({ 
          qr: config.SERVER_URL+'uploads/qr/'+responseJson.qr+'?'+Math.random(),
          token: responseJson.token
        });
        console.log(this.state.qr);
      }
      else{
        console.log(responseJson);
      }
    }
  }


  async onNext(){
    this.setState({loading: true});
    const token = await AsyncStorage.getItem('access_token');
    console.log(token);
    if(token)
    {
      let response = await fetch(config.API_URL+'nextToken', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token
        }
      });
      let responseJson = await response.json();
      console.log(responseJson);
      if(responseJson.status == "ok")
      {
        this.setState({ token: responseJson.next_token});
      }
      else if(responseJson.status == "not started")
      {
        alert('Queue not started');
      }
      else
      {
        alert('Queue completed');
      }
      this.setState({ loading: false});
    }
  }

  alertDelete(){
    console.log(this);
    Alert.alert(
      'Are you sure to delete the queue?',
      'Deleting the queue will remove the queue and its token holders from the database',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Delete', onPress: () => this.onDelete()},
      ],
      { cancelable: false }
    )
  }
      

  async onDelete(){

    this.setState({loading: true});
    const {navigate} = this.props.navigation;
    const token = await AsyncStorage.getItem('access_token');
    if(token)
    {
      let response = await fetch(config.API_URL+'deleteQueue', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token
        }
      });
      let responseJson = await response.json();
      console.log(responseJson);
      this.setState({ loading: false});
      if(responseJson.status == "ok")
      {
        navigate('Home');
      }
      else
      {
        alert('Could not delete');
      }
      
    }
  }

  render() {
      return (

       <View style={styles.container}>
          <View style={styles.box}>
            <Image
              style={{width: 300, height: 300}}
              source={{uri: this.state.qr}}
            />
          </View>
          <View style={styles.text_box}>
            <Text style={styles.text}>Token No: {this.state.token}</Text>
          </View>
          <View style={styles.text_box}>
            <TouchableOpacity
                style={styles.submit}
                onPress={() => this.onNext()}
                underlayColor='#fff'>
                  <Text style={styles.iconText}>Call next</Text>
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
