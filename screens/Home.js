import React, { Component } from 'react'
import { View, FlatList } from 'react-native'

export default class Home extends Component {
  state = {
    placeslist: []
  }

  renderPlace = ({ item }) => (
    <Place
      data={item}
    />
  )

  _keyExtractor = (item, index) => {
    return String(index);
  }
  
  render() {
    return(
      <View>
       <FlatList
        data={this.state.placeslist}
        renderItem={this.renderPlace}
        keyExtractor={this._keyExtractor}
      /> 
      </View>
    )
  }
}