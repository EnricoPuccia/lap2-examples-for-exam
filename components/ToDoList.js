import React, { Component } from 'react';
import { View, Stylesheet, Button, AsyncStorage, ActivityIndicator, FlatList } from 'react-native';

import ToDoElement from './ToDoElement'

export default class ToDoList extends Component {
  static naviagationOptions = ({navigation}) => {
    const params = navigation.state.params || {}

    return ({
      title: 'To-Do list',
      headerTintColor: 'deepskyblue',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerRight: (
        <Button
          onPress = {() =>
            {
              navigation.navigate('AddToDo', {onAdd: params.onAddTask})
            }
          }
          title='+' />

      )
    })
  }

  componentWillMount() {
    this.props.navigation.setParams({ onAddTask: this._addTask })
  }

  _addTask = (task) => {
    listOfTasks2 = [...listOfTask]
    task.id = this.state.lastID+1
    listOfTasks2.push(task)
    this.setState({
      listOfTask: listOfTasks2,
      lastID: this.state.lastID+1
    })
    AsyncStorage.setItem('todolist', JSON.stringify(this.state.listOfTask))
    AsyncStorage.setItem('lastID', this.state.lastID)
  }

  componentDidMount() {
    AsyncStorage.getItem('todolist').then(response => this.setState({
      listOfTask: response ? JSON.parse(listOfTask) : [],
      loading: false
    }))
    AsyncStorage.getItem('lastid').then(response => this.setState({lastID: response}))
  }

  constructor(props) {
    super(props)
    this.state = {
      listOfTask: [],
      loading: true,
      lastID: {}
    }
  }

  render() { 
    return(
      <View>
        this.state.loading === true ? <ActivityIndicator/> :
        <FlatList
          data={this.state.listOfTask}
          renderItem={this._renderTask}
          //keyExtractor={}
        />
      </View>
    )
  }

  _renderTask = ({item}) => {
    console.log(item)
    return(
      <ToDoElement item={item} onToggle={this._toggleTask} onEdit={ () => {
        this.props.navigation.navigate('EditToDo', {onEdit: this._onEdit, task: item})
      }}/>
    )
  }

  _toggleTask = (id) => {
    const listOfTasks2 = [...this.state.listOfTask]
    index = listOfTasks2.findIndex(t => t.id === id)
    listOfTasks2[index].done = !listOfTasks2[index].done
    this.setState({
      listOfTask: listOfTasks2
    })
    AsyncStorage.setItem('todolist', JSON.stringify(this.state.listOfTasks))
  }

  _onEdit = task => {
    const listOfTasks2 = [...this.state.listOfTask]
    index = listOfTasks2.findIndex(t => t.id === id)
    listOfTasks2[index] = task
    this.setState({
      listOfTasks: listOfTasks2
    })
    AsyncStorage.setItem('todolist', JSON.stringify(this.state.listOfTasks))
  }
}