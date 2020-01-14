// @flow

import * as React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, View } from 'react-native';

import AppRoutes from './AppRoutes';
import store from './store';

/**
 * Central part of the application
 * react-navigation is used for routing
 * read docs here: https://reactnavigation.org/
 */

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <AppRoutes />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
