import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Button, TouchableOpacity, SafeAreaView, ImageBackground, Alert} from 'react-native';
import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class HomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      token: '',
    };

  };


  getSignOutAPI= async()=> {
                                try{
                                        const token = await AsyncStorage.getItem('healthy_day_token')
                                        const response = await fetch ("https://healthydaytoday1.pythonanywhere.com/api/auth/logout/",{method: 'GET', headers: {
                                                                               "Accept": "application/json",
                                                                               "Content-Type": "application/json",
                                                                               "Authorization": "Token " + token,
                                                                           }, })
                                        .then((responseJson) => { console.log(responseJson.status); console.log(this.state.token);

                                        if (responseJson.status === 200) {
                                                this.props.navigation.navigate('SignIn');

                                        }else{
                                                console.log(responseJson.status);
                                                this.props.navigation.navigate('SignIn');

                                        }


                                         });

                                } catch(error){
                                         console.log(error);
                                         this.props.navigation.navigate('SignIn');
                                }
                              };






  render() {
        return (
        <SafeAreaView style={styles.containerHome}>
          <ScrollView>
              <StatusBar style="light" />
              <View style={styles.containerHome}>
                  <View style={styles.contentHome}>
                    <Text style={styles.headerText}>HealthyDayToday</Text>
                   </View>
               </View>



              <View style={styles.navtext1}>
                  <TouchableOpacity style={styles.button1} title="Go to Profile Screen" onPress={() => this.props.navigation.navigate('Profile')}  >
                      <Text style={styles.navtext1}>Profile</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.button1} title="Go to Dashboard Screen" onPress={() => this.props.navigation.navigate('Dashboard')}  >
                      <Text style={styles.navtext1}>Dashboard</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.button1} title="Go to Calories Screen" onPress={() => this.props.navigation.navigate('Eaten')}  >
                      <Text style={styles.navtext1}>Calories</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.button1} title="Go to AI Screen" onPress={() => this.props.navigation.navigate('AI')}  >
                      <Text style={styles.navtext1}>AI</Text>
                  </TouchableOpacity>



              </View>

              <View style={styles.containerHome}>
                  <View style={styles.contentHome}>
                    <Text style={styles.headerText}>Welcome!</Text>

                    <View style={styles.contentBox}>

                      <Text style={styles.bmiPointText}>About The App</Text>

                      <Text style={styles.bmiInterpretationText}>
                          This app focusing on helping you to monitor your daily calories consumption to reduce them and maintain you in a good form!
                          It also has an AI option available for you to fill form and predict your future weight losses!
                          We also have an SaaS app for daily manager. If you are interested, please search for our website: WonderfulDayToday!
                      </Text>
                    </View>

                  </View>

                  <View>
                      <TouchableOpacity style={styles.button1} title="Go to SignIn" onPress={this.getSignOutAPI}  >
                          <Text style={styles.navtext1}>SignOut</Text>
                      </TouchableOpacity>
                  </View>

              </View>
          </ScrollView>
        </SafeAreaView>

    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    paddingTop: 10
  },
  card: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto'
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

  navtext1: {
    alignItems: "center",
    fontFamily: "Cochin",
    fontSize: 24,
    fontWeight: "bold",
  },



  containerHome: {
    flex: 1,
    backgroundColor: "#1d2236",
  },
  contentHome: {
    flex: 1,
    padding: 15,
  },

  headerText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
  contentBox: {
    flex: 1,
    backgroundColor: "#323344",
    padding: 15,
    borderRadius: 10,

    justifyContent: "space-evenly",
    marginVertical: 15,
  },
  bmiStatusText: {
    color: "#fff",
    textAlign: "center",

    fontSize: 24,
    fontWeight: "bold",
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

