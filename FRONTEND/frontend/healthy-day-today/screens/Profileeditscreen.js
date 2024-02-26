import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Button, TextInput, Alert } from 'react-native';
import CheckboxFormX from 'react-native-checkbox-form';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default class ProfileeditScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      job: '',
      description: ''
    };
  }


    onChanged (text) {
        this.setState({
            calories: text.replace(/[^0-9]/g, ''),
        });
}
    _onSelect = ( item ) => {
      console.log(item);
    };


  getEditProfileAPI = async () => {
                                try{
                                        const token = await AsyncStorage.getItem('healthy_day_token');
                                        const response = await fetch ("https://healthydaytoday1.pythonanywhere.com/api/profile/",{method: 'POST', headers: {
                                                                               "Accept": "application/json",
                                                                               "Content-Type": "application/json",
                                                                               "Authorization": "Token " + token,
                                                                           },
                                                                           body: JSON.stringify({
                                                                                        "user":"no",
                                                                                        "fullname": this.state.fullname,
                                                                                        "job": this.state.job,
                                                                                        "description": this.state.description,
                                                                                    })


                                                                           })
                                         .then((responseJson) => { if (responseJson.status === 201) {
                                                this.props.navigation.navigate('Home');

                                         }else{
                                                Alert.alert("Profile Alert", "Some variables are inappropriate",);
                                                console.log(responseJson.status);

                                         }


                                         })

                                } catch(error){
                                         console.log(error);
                                         Alert.alert("Profile Alert", "Something went wrong :(",);
                                }
                              };




  render() {
    return (
      <ScrollView style={{backgroundColor: "#1d2236",}}>
          <View>
            <Text style={styles.textHeader}>Edit Your Profile Data</Text>
          </View>


          <View style={{ marginVertical: 10, backgroundColor: "#E7E7E7", borderRadius: 10, }} >



              <Text style={styles.textQuestion}>What type your Name?</Text>
              <TextInput
                      style={styles.input}
                      onChangeText={(text)=> this.setState({fullname: text
                       })}
                      value={this.state.fullname}
                      placeholder="Name"
                    />



              <Text style={styles.textQuestion}>What is your job position?</Text>
              <TextInput
                      style={styles.input}
                      onChangeText={(text)=> this.setState({job: text
                       })}
                      value={this.state.job}
                      placeholder="Job"
                    />


              <Text style={styles.textQuestion}>What can you tell about yourself in short?</Text>
              <TextInput
                      style={styles.input}
                      onChangeText={(text)=> this.setState({description: text
                       })}
                      value={this.state.description}
                      placeholder="Details"
                    />





          </View>


          <View>
              <TouchableOpacity style={styles.buttonContainer} onPress={this.getEditProfileAPI}>
                <Text>Submit Changes</Text>
              </TouchableOpacity>
          </View>

           <View>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
           </View>
     </ScrollView>
    );
  }
}



const styles = StyleSheet.create({
  scrollView: {
    paddingTop: 10
  },


  contentBox: {
    flex: 1,
    padding: 15,
    borderRadius: 10,

    justifyContent: "space-evenly",
    marginVertical: 15,
  },


  textQuestion: {
    padding: 15,
    textAlign: "center",
    marginVertical: 15,
    borderRadius: 10,
    backgroundColor: "#63dbcf",
  },

  textInput: {
    padding: 15,
    textAlign: "center",
    marginVertical: 15,
    borderRadius: 10,
    backgroundColor: "#E7E7E7",
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

  textHeader: {
    fontSize: 24,
    padding: 15,
    textAlign: "center",
    marginVertical: 15,
    borderRadius: 10,
    backgroundColor: "#323344",
    color: "#fff",
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius:30,
  },

});
