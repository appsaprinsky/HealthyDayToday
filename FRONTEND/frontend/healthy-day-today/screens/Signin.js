import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Button, TextInput, Alert } from 'react-native';
import CheckboxFormX from 'react-native-checkbox-form';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dimensions } from 'react-native';

var {height, width} = Dimensions.get('window');


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
                                                 "username": this.state.username,
                                                 "password": this.state.password,
                                             })})
          .then((response) => {if (response.status === 200) {
                response = response.json();
                return response
          }else{
                console.log(response.status);
                response = 'no';
                return response
            }
          })
          .then((responseJson) => { this.setState({ token: responseJson.token });
                                    if   (responseJson === 'no'){
                                          Alert.alert("Login Alert", "Wrong Username or Password",);
                                    } else{
                                    AsyncStorage.setItem("healthy_day_token", responseJson.token);
                                    this.props.navigation.navigate('Home');

                                    }
                                    })
          .catch((error) =>{console.error(error);
                            Alert.alert("Login Alert", "Wrong Username or Password",)
                            });
                            }





  render() {
    return (
      <ScrollView style={{backgroundColor: "#323344",}}>
          <View>
            <Text style={styles.textHeader}>Sign In!</Text>
          </View>


          <View style={{ marginVertical: 10, backgroundColor: "#E7E7E7", borderRadius: 10, }} >



              <Text style={styles.textQuestion}>username</Text>
              <TextInput
                      style={styles.input}
                      onChangeText={(text)=> this.setState({username: text.trim()
                       })}
                      value={this.state.username}
                      placeholder="Username"
                    />



              <Text style={styles.textQuestion}>password</Text>
              <TextInput
                      style={styles.input}
                      onChangeText={(text)=> this.setState({password: text.trim()
                       })}
                      value={this.state.password}
                      secureTextEntry={true}
                      placeholder="Password"
                    />


          </View>


          <View>
              <TouchableOpacity style={styles.buttonContainer} onPress={this.getDataFromAPI}>
                <Text style={{textAlign: "center",}}>Sign In</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('SignUp')}>
                <Text style={{textAlign: "center",}}>Sign Up</Text>
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
    justifyContent: 'center',
    flexDirection: 'row',
    textAlign: "center",
    alignItems: 'center',
    marginBottom:20,
    width:250,
    marginLeft: width * 0.2,
    borderRadius:30,
    backgroundColor: "#63dbcf",
    padding: 15,
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
