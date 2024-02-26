import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Button, TextInput, Alert } from 'react-native';
import CheckboxFormX from 'react-native-checkbox-form';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dimensions } from 'react-native';

var {height, width} = Dimensions.get('window');



export default class SignUpScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
    };
  }


  getRegisterAPI= ()=> {
          return fetch ("https://healthydaytoday1.pythonanywhere.com/api/auth/register/",{method: 'POST', headers: {
                                                 'Accept': 'application/json',
                                                 'Content-Type': 'application/json',
                                             },
                                             body: JSON.stringify({
                                                 "username": this.state.username,
                                                 "password": this.state.password,
                                                 "email": this.state.email,
                                             })})
          .then((response)  => {if (response.status === 201) {
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
                                          Alert.alert("Register Alert", "Some variables are inappropriate or already taken",);
                                    } else{
                                    this.props.navigation.navigate('SignIn');

                                    }
                                    })
          .catch((error) =>{console.error(error);
                            Alert.alert("Register Alert", "Some variables are inappropriate or already taken",)
                            });
                            }





  render() {
    return (
      <ScrollView style={{backgroundColor: "#1d2236",}} >
          <View>
            <Text style={styles.textHeader}>Ready? Change your life!</Text>
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

              <Text style={styles.textQuestion}>email</Text>
              <TextInput
                      style={styles.input}
                      onChangeText={(text)=> this.setState({email: text.trim()
                       })}
                      value={this.state.email}
                      placeholder="Email"
                    />


          </View>


          <View>
              <TouchableOpacity style={styles.buttonContainer} onPress={this.getRegisterAPI}>
                <Text>Sign Up</Text>
              </TouchableOpacity>
          </View>

          <View style={styles.personalInfo}>

            <Text style={styles.personalInfoHeader}>Your Personal Info</Text>

            <Text style={styles.personalInfoText}>
                This app focusing on helping you to monitor your daily calories and for registration we require email from you.
                However, you DO NOT have to provide your main or true email for registration. The only possible drawback, we wont be able
                to recover your account if you will forget your password.
            </Text>
          </View>



          <View>
          <Text>{"\n"}{"\n"}{"\n"}</Text>
          </View>

     </ScrollView>
    );
  }
}



const styles = StyleSheet.create({
  scrollView: {
    paddingTop: 10
  },

  personalInfo: {
    flex: 1,
    backgroundColor: "#323344",
    padding: 15,
    borderRadius: 10,

    justifyContent: "space-evenly",
    marginVertical: 15,
  },
  personalInfoHeader: {
    color: "#fff",
    textAlign: "center",

    fontSize: 70,
    fontWeight: "bold",
  },
  personalInfoText: {
    color: "#fff",
    textAlign: "center",

    fontSize: 18,
    lineHeight: 30,
    fontWeight: "500",
  },







containerKeyboard: {
    flex: 1
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
    marginLeft: width * 0.2,
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
