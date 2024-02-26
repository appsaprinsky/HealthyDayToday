import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import React, { Component } from 'react';
import {
  Image,
  TouchableOpacity, ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';




export default class ProfileScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: 'no',
      name: 'Your Name',
      job: 'Your Job',
      description: 'Tell us about yourself!',
      prediction: '',
      image_url: 'https://healthydaytoday1.pythonanywhere.com/media/Profile.jpg',
      isNotLoading1:false,
      isNotLoading2:false,
    };
    this._getPredictionFromAPI();
    this._getProfileFromAPI();
  };


  _getPredictionFromAPI = async () => {
          try{
                  const token = await AsyncStorage.getItem('healthy_day_token');
                  const response = await fetch ("https://healthydaytoday1.pythonanywhere.com/api/predictions/",{method: 'GET', headers: {
                                                         "Accept": "application/json",
                                                         "Content-Type": "application/json",
                                                         "Authorization": "Token " + token,
                                                     }, })
                   .then(response => response.json())
                   .then((responseJson) => {this.setState({ prediction: responseJson[0].prediction, isNotLoading2:true, });
                                                console.log(responseJson);})

          } catch(error){
                   console.log(error);
                   this.setState({ prediction: 'No predictions Yet', isNotLoading2:true, });
          }
        };

  _getProfileFromAPI = async () => {
          try{
                  const token = await AsyncStorage.getItem('healthy_day_token');
                  const response = await fetch ("https://healthydaytoday1.pythonanywhere.com/api/profile/",{method: 'GET', headers: {
                                                         "Accept": "application/json",
                                                         "Content-Type": "application/json",
                                                         "Authorization": "Token " + token,
                                                     }, })
                   .then(response => response.json())
                   .then((responseJson) => {this.setState({ name: responseJson[0].fullname,
                                                            job: responseJson[0].job,
                                                            description: responseJson[0].description,
                                                            isNotLoading1:true,
                                                            });
                                                            })

          } catch(error){
                   console.log(error);
                   this.setState({ isNotLoading1:true, });
          }
        };











  render() {

    if(this.state.isNotLoading1 === false & this.state.isNotLoading2 === false){
      return(
            <ActivityIndicator style={{marginTop: 250}} size="large" color='white'/>
      )
    }else{



      return (
          <ScrollView style={styles.container}>
              <View style={styles.header}></View>
              <Image style={styles.avatar} source={{uri: this.state.image_url }}/>
              <View style={styles.body}>
                <View style={styles.bodyContent}>
                  <Text style={styles.name}>{this.state.name}</Text>
                  <Text style={styles.info}>{this.state.job}</Text>
                  <Text style={styles.description}>{this.state.description}</Text>

                  <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('Profileedit')}>
                    <Text>Edit Profile</Text>
                  </TouchableOpacity>




                  <View style={styles.contentBox}>

                    <Text style={styles.bmiPointText}>AI tells:</Text>
                    <Text style={styles.bmiInterpretationText}>
                          {this.state.prediction}
                    </Text>
                  </View>








                </View>
            </View>
          </ScrollView>

      );
   }
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#1d2236",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "#1d2236",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#63dbcf",
  },






  contentBox: {
    flex: 1,
    backgroundColor: "#323344",
    padding: 15,
    borderRadius: 10,
    alignSelf: 'stretch',
    justifyContent: "space-evenly",
    marginVertical: 15,
  },

  bmiPointText: {
    color: "#fff",
    textAlign: "center",

    fontSize: 70,
    fontWeight: "bold",
  },

  bmiInterpretationText: {
    color: "#fff",
    textAlign: "center",

    fontSize: 18,
    lineHeight: 30,
    fontWeight: "500",
  },








});
