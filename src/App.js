import React, { Component } from 'react'

import Routes from './Routes/Routes'
import { NavigationContainer } from '@react-navigation/native'

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Routes/>
      </NavigationContainer>
    )
  }
}
