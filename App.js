import React from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'

import { connect, Provider } from 'react-redux'
import { store } from './src/redux'

import Header from './src/components/Header'

class AppInner extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header />
      </View>
    )
  }
}

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    alignItems: 'center',
  },
})

/**
 * can split this into AppContainer.js
 */
const mapStateToProps = (state) => ({
})

const AppContainer = connect(
  mapStateToProps,
)(AppInner)