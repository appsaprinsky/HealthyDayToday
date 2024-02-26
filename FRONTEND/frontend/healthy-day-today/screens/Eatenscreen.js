            
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
  TouchableOpacity, ActivityIndicator
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class EatenScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchedText: "" ,
      colorGoodUrl:"https://healthydaytoday1.pythonanywhere.com/media/Green.png",
      colorNeutralUrl:"https://healthydaytoday1.pythonanywhere.com/media/Yellow.png",
      colorBadUrl:"https://healthydaytoday1.pythonanywhere.com/media/Red.png",
      foodUrl:"https://healthydaytoday1.pythonanywhere.com/media/food.jpg",
      isLoading: true,
      data: [],

      searchText: "",
      filteredData: [] ,

    };
    this._getCaloriesFromAPI();
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
                                                            console.log(responseJson)
                                                            })

          } catch(error){
                   console.log(error);
          }
        };



  _postCaloriesDeleteAPI = async (id_delete, title_delete) => {
                                try{
                                        const token = await AsyncStorage.getItem('healthy_day_token');
                                        const response = await fetch ("https://healthydaytoday1.pythonanywhere.com/api/calories/" + id_delete.toString() + "/delete",{method: 'DELETE', headers: {
                                                                               "Accept": "application/json",
                                                                               "Content-Type": "application/json",
                                                                               "Authorization": "Token " + token,
                                                                           },
                                                                           })
                                        .then(response => response.text())
                                        .then(this.setState({ isLoading: true,}),this._getCaloriesFromAPI());

                                } catch(error){
                                         console.log(error);
                                         Alert.alert("Delete Alert", "please try again later!",);
                                }
                              };

    search = (searchText) => {
      this.setState({searchText: searchText});

      let filteredData = this.state.data.filter(function (item) {
        const total_filtered = item.date.includes(searchText);
        return total_filtered;
      });

      this.setState({filteredData: filteredData});
    };









  _renderItem = ({item, index}) =>{



      return(
              <View style={styles.notificationBox}>
                <Image style={styles.image}
                  source={{ uri: this.state.foodUrl }}/>

                <Text style={styles.name}>{item.title}, Calories: {item.calories}{"\n"}
                Date: {item.date}</Text>
                <TouchableOpacity style={styles.deleteButton} onPress={() => this._postCaloriesDeleteAPI(item.id, item.title)} key={item.id}>
                    <Text>Delete</Text>
                </TouchableOpacity>
              </View>
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
                placeholder="Search on a Date"
                autoCapitalize='none'
                autoCorrect={false}
                round={true}
                lightTheme={true}
                value={this.state.searchText}
                onChangeText={this.search}

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
          data={this.state.filteredData && this.state.filteredData.length > 0 ? this.state.filteredData : this.state.data}
          keyExtractor= {(item) => {
            return item.id;
          }}
          renderItem={this._renderItem}/>
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
    flexDirection: 'row',
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


  deleteButton:{
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 14,
    backgroundColor: 'red',
    marginLeft: 'auto',
    marginRight: 3,

  },







}); 