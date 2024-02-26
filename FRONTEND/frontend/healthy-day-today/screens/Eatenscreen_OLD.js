            
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Alert,
  ScrollView,
  TextInput,
  FlatList,
  TouchableOpacity, Alert, ActivityIndicator
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class EatenScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {id:1, icon:"https://healthydaytoday1.pythonanywhere.com/media/Green.png", description: "User 1"},
        {id:2, icon:"https://bootdey.com/img/Content/avatar/avatar2.png", description: "User 2"}, 
        {id:3, icon:"https://bootdey.com/img/Content/avatar/avatar3.png", description: "User 3"}, 
        {id:4, icon:"https://bootdey.com/img/Content/avatar/avatar4.png", description: "User 4"}, 
        {id:5, icon:"https://bootdey.com/img/Content/avatar/avatar5.png", description: "User 5"}, 
        {id:6, icon:"https://bootdey.com/img/Content/avatar/avatar6.png", description: "User 6"}, 
        {id:7, icon:"https://bootdey.com/img/Content/avatar/avatar1.png", description: "User 7"}, 
        {id:8, icon:"https://bootdey.com/img/Content/avatar/avatar2.png", description: "User 8"},
        {id:9, icon:"https://bootdey.com/img/Content/avatar/avatar3.png", description: "User 9"},
        {id:10, icon:"https://bootdey.com/img/Content/avatar/avatar3.png", description: "User 10"},
        {id:11, icon:"https://bootdey.com/img/Content/avatar/avatar3.png", description: "User 11"},
        {id:12, icon:"https://bootdey.com/img/Content/avatar/avatar3.png", description: "User 12"},
        {id:13, icon:"https://bootdey.com/img/Content/avatar/avatar3.png", description: "User 13"},
      ],
      colorGoodUrl:"https://healthydaytoday1.pythonanywhere.com/media/Green.png",
      colorNeutralUrl:"https://healthydaytoday1.pythonanywhere.com/media/Yellow.png",
      colorBadUrl:"https://healthydaytoday1.pythonanywhere.com/media/Red.png",
      isLoading: true,
      data: [],
    };
  }

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed "+viewId);
  };

  _getCaloriesFromAPI = async () => {
          try{
                  const token = await AsyncStorage.getItem('healthy_day_token');
                  const response = await fetch ("https://healthydaytoday1.pythonanywhere.com/api/calories/",{method: 'GET', headers: {
                                                         "Accept": "application/json",
                                                         "Content-Type": "application/json",
                                                         "Authorization": "Token " + token,
                                                     }, })
                   .then(response => response.json())
                   .then((responseJson) => {this.setState({ isLoading: false,
                                                            data: responseJson,});
                                                            })

          } catch(error){
                   console.log(error);
                   this.setState({ prediction: 'No predictions Yet' });
          }
        };


  _renderItem = ({item, index}) =>{
      return(
            <Text>{item.title}</Text>
      )
    };




  render() {
    if(this.state.isLoading){
      return(
            <ActivityIndicator style={{marginTop: 250}} size="large" color='white'/>
      )
    }else{


    return (
      <View style={styles.container}>
        <View style={styles.formContent}>
          <SearchBar style={styles.inputContainer}
                placeholder="Search..."
                inputContainerStyle={{ backgroundColor: "#e9e9e9" }}
                containerStyle={{ backgroundColor: "transparent" }}
                lightTheme={true}
                round={true}
            />
        </View>

        <View>
          <TouchableOpacity style={styles.button1} onPress={() => this.props.navigation.navigate('Eatennew')}>
              <Text style={styles.navtext1}>Add New</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          style={styles.notificationList}
          data={this.state.data}
          keyExtractor= {(item) => {
            return item.id;
          }}
          renderItem={({item}) => {
            return (
              <View style={styles.notificationBox}>
                <Image style={styles.image}
                  source={{uri: item.icon}}/>

                <Text style={styles.name}>{item.description}</Text>
              </View>
            )}}/>
      </View>
    );
  }
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1d2236",
  },
  formContent:{
    marginTop:30,
    alignSelf: 'stretch',
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:10,
      borderBottomWidth: 1,
      height:45,
      alignItems:'center',
      flex:1,
      margin:10,
      alignSelf: 'stretch',
  },
  icon:{
    width:30,
    height:30,
  },
  iconBtnSearch:{
    alignSelf:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    marginLeft:15,
    justifyContent: 'center'
  },
  notificationList:{
    marginTop:20,
    padding:10,
  },
  notificationBox: {
    paddingTop:10,
    paddingBottom:10,
    marginTop:5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderRadius:10,
  },
  image:{
    width:45,
    height:45,
    borderRadius:20,
    marginLeft:20
  },
  name:{
    fontSize:20,
    fontWeight: 'bold',
    color: "#000000",
    marginLeft:10,
    alignSelf: 'center'
  },

  navtext1: {
    alignItems: "center",
    fontFamily: "Cochin",
    fontSize: 24,
    fontWeight: "bold",
  },

  button1: {
    alignItems: "center",
    backgroundColor: "#63dbcf",
    padding: 10,
    marginLeft:1,
    marginRight: 1,
    marginTop: 1,
    marginBottom: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    alignSelf: 'stretch',
    borderRadius: 5,
    marginTop: 15,
  },







}); 