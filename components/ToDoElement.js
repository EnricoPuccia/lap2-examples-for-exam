import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default class ToDoElement extends Component {
  render() {
    const { item } = this.props
    const iconName = item.done ? "ios-checkmark-circle" : "ios-checkmark-circle-outline"
    return(
      <View>
        <TouchableOpacity onPress={ () => this.props.onToggle(item.id) }>
          <Ionicons name={iconName} size={24} color="bronw"/>
          <Text> {item.title} </Text>
        </TouchableOpacity>
        <TouchableHighlight onPress={ () => this.props.onEdit(item) }>
          <MaterialIcons name="chevron-right" size={24} color="black" /> 
        </TouchableHighlight>
      </View>
    )
  }
}