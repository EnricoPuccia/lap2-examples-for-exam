import React, { Component } from 'react';
import { View, TextInput, Button } from "react-native";

export default class AddToDo extends Component {
  state = {
    title: '',
  }

  render() {
    return(
      <View>
        <TextInput 
          placeholder='Insert name of task' 
          onChangeText={ (title) => this.setState({title}) }
          onSubmitEditing={this._save}
        />
      </View>
    )
  }

  _save = () => {
    const task = {
      title: this.state.title,
      done: false,
      id: {}
    }
    this.props.navigation.state.params.onAdd(task)
    this.props.navigation.goBack()
  }
}