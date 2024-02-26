import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

var {height, width} = Dimensions.get('window');

const mockData = [
    {
        label: 'I prefer productive and efficient lifestyle.',
        value: '1'
    },
    {
        label: 'I am very lazy, I prefer to relax for the whole day.',
        value: '2'
    },
    {
        label: 'I have very fast metabolism.',
        value: '3'
    },

    {
        label: 'I am well discipline and purposeful.',
        value: '4'
    },

    {
        label: 'I feel, it is very hard for me to change.',
        value: '5'
    },

];

export default class AIScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      token: '',
      user:'no',
      q1: '0',
      q2: '0',
      q3: '0',
      q4: '0',
      q5: '0',

    };

  };


  getAIsubmitAPI = async () => {
                                try{
                                        const token = await AsyncStorage.getItem('healthy_day_token');
                                        const response = await fetch ("https://healthydaytoday1.pythonanywhere.com/api/model/",{method: 'POST', headers: {
                                                                               "Accept": "application/json",
                                                                               "Content-Type": "application/json",
                                                                               "Authorization": "Token " + token,
                                                                           },
                                                                           body: JSON.stringify({
                                                                                        "user":"no",
                                                                                        "q1": this.state.q1,
                                                                                        "q2": this.state.q2,
                                                                                        "q3": this.state.q3,
                                                                                        "q4": this.state.q4,
                                                                                        "q5": this.state.q5,
                                                                                    })


                                                                           });
                                        const answer = await response.json();

                                        const response1 = await fetch ("https://healthydaytoday1.pythonanywhere.com/api/predictions/",{method: 'POST', headers: {
                                                                               "Accept": "application/json",
                                                                               "Content-Type": "application/json",
                                                                               "Authorization": "Token " + token,
                                                                           },
                                                                           body: JSON.stringify({
                                                                                        "user":"no",
                                                                                        "prediction": answer.prediction,
                                                                                    })


                                                                           })



                                        .then((responseJson) => { if (responseJson.status === 201) {
                                                this.props.navigation.navigate('Home');

                                         }else{
                                                Alert.alert("Uuups", "Something went wrong, please try again later!",);
                                                console.log(responseJson.status);

                                         }


                                         })

                                } catch(error){
                                         console.log(error);
                                         Alert.alert("AI Alert", "please try again later!",);
                                }
                              };










  _onSelect = ( item ) => {
      console.log(item);
   };



  render() {
    return (
      <ScrollView style={{backgroundColor: "#1d2236",}}>
          <View>
           <Text style={styles.textHeader}>Prediction of your success within 3 monthes</Text>
          </View>


          <View style={{ marginVertical: 10, backgroundColor: "#E7E7E7", borderRadius: 10, marginBottom: 13, }} >


              <Text style={styles.textQuestion}>I prefer productive and efficient lifestyle.</Text>
              <RNPickerSelect
                          onValueChange={(value) => {this.setState({q1:value,})}}
                          items={[
                              { label: 'No', value: '0' },
                              { label: 'Not sure', value: '1' },
                              { label: 'Yes', value: '2' },
                          ]}
                      />


              <Text style={styles.textQuestion}>How Often are you doing sport a week?</Text>
              <RNPickerSelect
                          onValueChange={(value) => {this.setState({q2:value,})}}
                          items={[
                              { label: 'None', value: '0' },
                              { label: 'Often (1-3 times a week)', value: '1' },
                              { label: 'Very Often (4-6 times a week)', value: '2' },
                              { label: 'Everyday', value: '3' },
                          ]}
                      />

              <Text style={styles.textQuestion}>Are you doing cardio regularly?</Text>
              <RNPickerSelect
                          onValueChange={(value) => {this.setState({q3:value,})}}
                          items={[
                              { label: 'No', value: '0' },
                              { label: 'Yes', value: '1l' },
                          ]}
                      />


              <Text style={styles.textQuestion}>How Often do you eat a day?</Text>
              <RNPickerSelect
                          onValueChange={(value) => {this.setState({q4:value,})}}
                          items={[
                              { label: '< 2 times a day', value: '0' },
                              { label: '3-4 times a day', value: '1' },
                              { label: 'more than 5 times a day', value: '2' },
                          ]}
                      />


              <Text style={styles.textQuestion}>For how long are you doing sport already?</Text>
              <RNPickerSelect
                          onValueChange={(value) => {this.setState({q5:value,})}}
                          items={[
                              { label: '< 1 month', value: '0' },
                              { label: 'between 1 to 6 months', value: '1' },
                              { label: 'between 6 month to 1 year', value: '2' },
                              { label: 'between 1 to 5 years', value: '3' },
                              { label: '> 5 years', value: '4' },
                          ]}
                      />
              <Text></Text>

          </View>


          <View>
              <TouchableOpacity style={styles.buttonContainer}  onPress={this.getAIsubmitAPI}>
                <Text>Submit</Text>
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
    justifyContent: "space-evenly",
    marginVertical: 15,
    borderRadius: 10,
    backgroundColor: "#63dbcf",
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

  textPicker: {
    justifyContent: 'center',
    textAlign: "center",
    fontSize: 24,
  },

});
