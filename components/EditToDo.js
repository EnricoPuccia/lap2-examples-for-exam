import React, { Component } from 'react'
import { View, TextInput } from 'react-native'

export default class EditToDo extends Component {
  constructor(props) {
    super(props)
    const { old_task } = this.props.navigation.state.params.task
    this.state = {
      title: this.old_task.title,
      done: this.old_task.done,
      id: this.old_task.id
    }
  }

  render() {
    return(
      <View>
        <TextInput 
          placeholder='Insert the new title'
          onChangeText={ (title) => {this.setState({title})} }
          onSubmitEditing={ this._save }
        />
      </View>
    )
  }

  _save = () => {
    const task = {
      title: this.state.title,
      done: this.state.done,
      id: this.state.id
    }
    this.props._onEdit(task)
    this.props.navigation.goBack()
  }
}