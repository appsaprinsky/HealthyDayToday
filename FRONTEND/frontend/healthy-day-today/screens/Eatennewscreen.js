import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Button, TextInput, Alert } from 'react-native';
import CheckboxFormX from 'react-native-checkbox-form';
import RNPickerSelect from 'react-native-picker-select';
import DateField from 'react-native-datefield';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class EatennewScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      open: false,
      calories: '0',
      title: "Moderate",
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


  postCaloriesSubmitAPI = async () => {
                                try{
                                        const token = await AsyncStorage.getItem('healthy_day_token');
                                        const response = await fetch ("https://healthydaytoday1.pythonanywhere.com/api/calories/",{method: 'POST', headers: {
                                                                               "Accept": "application/json",
                                                                               "Content-Type": "application/json",
                                                                               "Authorization": "Token " + token,
                                                                           },
                                                                           body: JSON.stringify({
                                                                                        "user":"no",
                                                                                        "title": this.state.title,
                                                                                        "date": this.state.date.toLocaleDateString('en-GB').split('/').reverse().join('-').toString(),
                                                                                        "calories": this.state.calories,

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









  render() {
    return (
      <ScrollView style={{backgroundColor: "#1d2236",}}>
          <View>
            <Text style={styles.textHeader}>Add New Item to Calories List</Text>
          </View>


          <View style={{ marginVertical: 10, backgroundColor: "#E7E7E7", borderRadius: 10, }} >



              <Text style={styles.textQuestion}>What type is this food?</Text>
              <RNPickerSelect
                          onValueChange={(value) => {this.setState({title:value,})}}
                          items={[
                              { label: 'Unhealthy', value: 'Unhealthy' },
                              { label: 'Moderate', value: 'Moderate' },
                              { label: 'Healthy', value: 'Healthy' },
                          ]}
                      />

              <Text style={styles.textQuestion}>How many calories does it weight?</Text>
              <TextInput
                 style={styles.textInput}
                 keyboardType='numeric'
                 onChangeText={(text)=> this.onChanged(text)}
                 value={this.state.calories.toString()}
                 maxLength={10000}  //setting limit of input
              />


              <Text style={styles.textQuestion}>When have you eaten this?</Text>
              <DateField
                defaultValue={new Date()}
                styleInput={{ fontSize: 25 }}
                containerStyle={{ marginVertical: 30 }}
                onSubmit={(value) => {this.setState({date:value,})}}
              />




          </View>


          <View>
              <TouchableOpacity style={styles.buttonContainer} onPress={this.postCaloriesSubmitAPI}>
                <Text>Add Item</Text>
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

});
