import React, { Component } from 'react';
import { View, Text, Stylesheet, Button, AsyncStorage, ActivityIndicator, FlatList } from 'react-native';

import ToDoElement from './ToDoElement'

export default class ToDoList extends Component {
  static navigationOptions = ({navigation}) => {
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
    const listOfTasks2 = [...this.state.listOfTask]
    task.id = this.state.lastID+1
    listOfTasks2.push(task)
    this.setState({
      listOfTask: listOfTasks2,
      lastID: this.state.lastID+1
    })
    AsyncStorage.setItem('todolist', JSON.stringify(this.state.listOfTask))
    AsyncStorage.setItem('lastID', JSON.stringify(this.state.lastID))
  }

  componentDidMount() {
    AsyncStorage.getItem('todolist').then(response => this.setState({
      //listOfTask: response ? JSON.parse(this.state.listOfTask) : [],
      listOfTask: response ? JSON.parse(response) : [],
      loading: false
    })).catch(err => console.error(err))
    AsyncStorage.getItem('lastid').then(response => this.setState({
      lastID: response ? JSON.parse(response) : 0
    })).catch(err => console.error(err))
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
    const { listOfTask, loading } = this.state;
    console.log(listOfTask)
    return(
      <View style={{flex:1}}>
      {
        loading == true ? <ActivityIndicator/> :
        <FlatList
          data={listOfTask}
          renderItem={this._renderTask}
          keyExtractor={ (item, index) => String(index) }
        />
      }
      <Text>Ciao a tutti!</Text>
      </View>
    )
  }

  _renderTask = ({item}) => {
    console.log(item)
    return(
      <View>
        <Text> Hello a all! </Text>
        <ToDoElement item={item} onToggle={this._toggleTask} onEdit={ () => {
          this.props.navigation.navigate('EditToDo', {onEdit: this._onEdit, task: item})
        }}/>
      </View>

    )
  }

  _toggleTask = (id) => {
    const listOfTask2 = [...this.state.listOfTask]
    const index = listOfTask2.findIndex(t => t.id === id)
    listOfTask2[index].done = !listOfTask2[index].done
    this.setState({
      listOfTask: listOfTask2
    })
    AsyncStorage.setItem('todolist', JSON.stringify(this.state.listOfTask))
  }

  _onEdit = task => {
    const listOfTask2 = [...this.state.listOfTask]
    index = listOfTask2.findIndex(t => t.id === task.id)
    listOfTask2[index] = task
    this.setState({
      listOfTask: listOfTask2
    })
    AsyncStorage.setItem('todolist', JSON.stringify(this.state.listOfTask))
  }
}