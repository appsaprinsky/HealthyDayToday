import React, { Component } from "react";
import { View, Text, Button } from "react-native";





class AIpredictionScreen extends Component {

  render() {
    return (
      <View>
        <View style={{ backgroundColor: "blue", flex: 0.3 }} />
        <View style={{ backgroundColor: "red", flex: 0.5 }} />
        <Text>AI Screen</Text>
      </View>
    );
  }
}

export default AIpredictionScreen;