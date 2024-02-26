import React, { Component } from "react";
import { StyleSheet, View, ScrollView, Text, Button, ActivityIndicator } from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart, Alert} from "react-native-chart-kit";
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';




export default class DashboardScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      calories7:[0,0,0,0,0,0,0],
      calories2:[0, 0, 0],
      total_unhealthy:0,
      total_healthy:0,
      total_moderate:0,
      data: [],
    };
    this._getDashboardFromAPI();
  }

  _getDashboardFromAPI = async () => {
          try{
                  const token = await AsyncStorage.getItem('healthy_day_token');
                  const response = await fetch ("https://healthydaytoday1.pythonanywhere.com/api/dashboard/",{method: 'GET', headers: {
                                                         "Accept": "application/json",
                                                         "Content-Type": "application/json",
                                                         "Authorization": "Token " + token,
                                                     }, })
                   .then(response => response.json())
                   .then((responseJson) => {this.setState({ isLoading: false,
                                                            calories7:responseJson['7calories'],
                                                            calories2:responseJson['2calories'],
                                                            total_unhealthy:responseJson.total_unhealthy,
                                                            total_healthy:responseJson.total_healthy,
                                                            total_moderate:responseJson.total_moderate,
                                                            })
                                                            })

          } catch(error){
                   console.log(error);
          }
        };


  render() {
    if(this.state.isLoading){
      return(
            <ActivityIndicator style={{marginTop: 250}} size="large" color='white'/>
      )
    }else{


        return (
            <ScrollView>
              <View>
                  <View style={styles.button1}>
                    <Text style={styles.navtext1}>Calories Consumption for</Text>
                    <Text style={styles.navtext1}>last 7 days</Text>
                  </View>
                  <LineChart
                    data={{
                      labels: ["6d ago","5d ago", "4d ago", "3d ago", "2d ago", "1d ago", "Today"],
                      datasets: [
                        {
                          data: this.state.calories7
                        }
                      ]
                    }}
                    width={Dimensions.get("window").width} // from react-native
                    height={220}
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                      backgroundColor: "#e26a00",
                      backgroundGradientFrom: "#fb8c00",
                      backgroundGradientTo: "#ffa726",
                      decimalPlaces: 0, // optional, defaults to 2dp
                      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      style: {
                        borderRadius: 16
                      },
                      propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                      }
                    }}
                    bezier
                    style={{
                      marginVertical: 8,
                      borderRadius: 16
                    }}
                  />



                  <View style={styles.button1}>
                    <Text style={styles.navtext1}>Total Calories Consumption</Text>
                    <Text style={styles.navtext1}>PreviousMonth VS ThisMonth</Text>
                  </View>


                  <BarChart
                    data= {{
                             labels: ["0", "PreviousMonth", "ThisMonth"],
                             datasets: [
                               {
                                 data: this.state.calories2,
                                 colors: [ (opacity = 1) => "#1354eb", (opacity = 1) => "#1354eb", (opacity = 1) => "#de1096",]
                               }
                             ]
                           }}

                    width={Dimensions.get("window").width}
                    height={360}
                    chartConfig={{backgroundColor: "#e26a00",
                                   backgroundGradientFrom: "#fb8c00",
                                   backgroundGradientTo: "#ffa726",
                                   color: (opacity = 1) => `rgba(250, 255, 255, ${opacity})`,
                                   labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                   decimalPlaces: 0,
                                   strokeWidth: 2, // optional, default 3
                                   stroke: "#ffa726",
                                   barPercentage: 0.5,
                                   useShadowColorFromDataset: false, // optional
                                 }}
                    verticalLabelRotation={30}
                    withCustomBarColorFromData={true}
                    flatColor={true}
                    style={{marginVertical: 8,borderRadius: 16}}
                  />


                  <View style={styles.button1}>
                    <Text style={styles.navtext1}>Food total Consumption</Text>
                  </View>

                  <PieChart
                    data={[
                            {
                              name: "Healthy",
                              population: this.state.total_healthy,
                              color: "green",
                              legendFontColor: "#7F7F7F",
                              legendFontSize: 15
                            },
                            {
                              name: "Unhealthy",
                              population: this.state.total_unhealthy,
                              color: "red",
                              legendFontColor: "#7F7F7F",
                              legendFontSize: 15
                            },
                            {
                              name: "Moderate",
                              population: this.state.total_moderate,
                              color: "blue",
                              legendFontColor: "#7F7F7F",
                              legendFontSize: 15
                            },
                          ]}
                    width={Dimensions.get("window").width}
                    height={220}
                    chartConfig={{backgroundColor: `rgba(255, 255, 255, 1)`,
                                                           backgroundGradientFrom: `rgba(255, 255, 255, 1)`,
                                                           backgroundGradientFromOpacity: 0,
                                                           backgroundGradientTo: `rgba(255, 255, 255, 1)`,
                                                           backgroundGradientToOpacity: 0.5,
                                                           color: (opacity = 1) => `rgba(255, 255, 255, 1)`,
                                                           labelColor: (opacity = 1) =>`rgba(255, 255, 255, 1)`,
                                                           decimalPlaces: 0,
                                                           strokeWidth: 2, // optional, default 3
                                                           barPercentage: 0.5,
                                                           useShadowColorFromDataset: false // optional
                                                         }}
                    accessor={"population"}
                    backgroundColor={"transparent"}
                    paddingLeft={"15"}
                  />

                  <Text>End</Text>
              </View>
            </ScrollView>
        );
    }
  }
}


const styles = StyleSheet.create({

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

