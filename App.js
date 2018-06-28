import React from 'react';
import { createStackNavigator } from 'react-navigation';

import Place from './components/Place'
import Home from './screens/Home'

export default createStackNavigator(
  {
    Home: Home,
    Place: Place,
  },
  {
    initialRouteName: 'Home',
  }
)