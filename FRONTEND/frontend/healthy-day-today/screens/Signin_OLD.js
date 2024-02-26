import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Button, TextInput } from 'react-native';
import CheckboxFormX from 'react-native-checkbox-form';
import RNPickerSelect from 'react-native-picker-select';
import { AsyncStorage } from 'react-native';


export default class SignInScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      token: '',
    };
  };

  getDataFromAPI= ()=> {
          return fetch ("https://healthydaytoday1.pythonanywhere.com/api/auth/login/",{method: 'POST', headers: {
                                                 'Accept': 'application/json',
                                                 'Content-Type': 'application/json',
                                             },
                                             body: JSON.stringify({
                                                 "username": 'username1',
                                                 "password": 'password1',
                                             })})
          .then((response) => console.log(response.token))
          .then((response) => response.json())
          .then((responseJson) => { this.setState({ token: responseJson.token }) })
          .catch((error) =>{console.error(error);
                            console.log('data');
                            });
                            }





  getDataFromAPI1= ()=> {
          return fetch ("https://healthydaytoday1.pythonanywhere.com/api/hello/",{method: 'GET', headers: {
                                                 'Accept': 'application/json',
                                                 'Content-Type': 'application/json',
                                                 "Authorization": "Token 605c19ed8edbd76c184ee00d2c7101bbc344491d"
                                             },})
          .then((response) => console.log(response.token))
          .then((response) => response.json())
          .then((responseJson) => { this.setState({ token: responseJson.token }) })
          .catch((error) =>{console.error(error);
                            console.log('data');
                            });
                            }




  getDataFromAPI2= ()=> {
          return fetch ("https://healthydaytoday1.pythonanywhere.com/api/hello/",{method: 'GET', headers: {
                                                 'Accept': 'application/json',
                                                 'Content-Type': 'application/json',
                                                 "Authorization": "Token 605c19ed8edbd76c184ee00d2c7101bbc344491d"
                                             },})
          .then((response) => response.json())
          .then((response) => console.log(response.message))
          .then((responseJson) => { this.setState({ token: responseJson.token }) })
          .catch((error) =>{console.error(error);
                            console.log('data');
                            });
                            }





  render() {
    return (
      <ScrollView style={{backgroundColor: "#1d2236",}}>
          <View>
            <Text style={styles.textHeader}>Sign In!</Text>
          </View>


          <View style={{ marginVertical: 10, backgroundColor: "#E7E7E7", borderRadius: 10, }} >



              <Text style={styles.textQuestion}>username</Text>
              <TextInput
                      style={styles.input}
                      onChangeText={(text)=> this.setState({username: text
                       })}
                      value={this.state.username}
                      placeholder="Username"
                    />



              <Text style={styles.textQuestion}>password</Text>
              <TextInput
                      style={styles.input}
                      onChangeText={(text)=> this.setState({password: text
                       })}
                      value={this.state.password}
                      placeholder="Password"
                    />


          </View>


          <View>
              <TouchableOpacity style={styles.buttonContainer} onPress={this.getDataFromAPI}>
                <Text>Sign In</Text>
              </TouchableOpacity>
          </View>

          <View>
              <TouchableOpacity style={styles.buttonContainer} onPress={this.getDataFromAPI1}>
                <Text>Sign In</Text>
              </TouchableOpacity>
          </View>

          <View>
              <TouchableOpacity style={styles.buttonContainer} onPress={this.getDataFromAPI2}>
                <Text>Sign In</Text>
              </TouchableOpacity>
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
  },

});
