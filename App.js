import React from 'react';
import { StyleSheet, Text, TextInput, Button, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfTasks: [],
      loading: true,
    }
  }

  componentDidMount() {
    this.takeTask()
  }

  render() {
    const {listOfTasks, loading} = this.state;
    return (
      <View style={styles.container}>
        {
          loading === true ? <ActivityIndicator/> :
            <FlatList
              data={listOfTasks}
              renderItem={this.renderTask}
              keyExtractor={task => task.id.toString()}
              ItemSeparatorComponent={this.renderSeparator}
              ListHeaderComponent={this.renderHeader}
            />
        }
      </View>
    );
  }

  takeTask() {
    try {
      const tasks = require("./data/tasks.json");
      const lastID = Math.max(...tasks.map(t => t.id));
      this.setState({
        listOfTasks: tasks,
        loading: false,
        lastID: lastID,
      })
    }
    catch(err) {
      console.log("something went wrong!");
      console.error(err);
    }
  }

  renderTask = ({item}) => {
    console.log(item)
    const iconName = item.completed ? "ios-checkmark-circle" : "ios-checkmark-circle-outline"
    return(
      <TouchableOpacity style={styles.task} onPress={() => this.toggleTask(item.id)}>
        <Ionicons style={styles.icon} name={iconName} size={24} color="brown"/>
        <Text>{item.title}</Text>
      </TouchableOpacity>
    )
  }

  toggleTask = (id) => {
    const listOfTasks2 = [...this.state.listOfTasks]
    index = listOfTasks2.findIndex(t => t.id === id)
    listOfTasks2[index].completed = !listOfTasks2[index].completed
    this.setState({
      listOfTasks: listOfTasks2
    })
  }

  renderSeparator() {
    return(
      <View style={styles.separator}/>
    )
  }

  renderHeader = () => {
    return(
      <View style={styles.header}>
        <TextInput style={styles.text} placeholder="Add a task" onChangeText={(text)=>this.setState({newTask: text})}/>
        <Button onPress={this.createTask} title="+"/>
      </View>
    )
  }

  createTask = () => {
    const task = {
      title: this.setState.newTask,
      completed: false,
      id: (this.state.lastID+1),
    }
    const listOfTasks2 = [...this.state.listOfTasks]
    listOfTasks2.push(task)
    this.setState({
      listOfTasks: listOfTasks2,
      lastID: (this.state.lastID+1),
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    //justifyContent: 'center',
    marginTop: 30,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text: {
    width: '80%',
    fontSize: 20,
  },
  separator: {
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    height: 0.5,
    //padding: 18,
    backgroundColor: "#1f82ad"
  },
  task: {
    flexDirection: 'row',
    alignItems: 'center',
    //justifyContent: 'flex-start',
    //padding: 10,
    height: 50,
  },
  icon: {
    paddingRight: 10,
    paddingLeft: 12
  },
});
