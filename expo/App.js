import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import './patches/engineIoHeadWarning';
import App from './src/App';

export default class Main extends React.Component {
  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      'ApexNew-Book': require('./assets/fonts/ApexNew-Book.otf'),
      'ApexNew-Light': require('./assets/fonts/ApexNew-Light.otf'),
      'ApexNew-Medium': require('./assets/fonts/ApexNew-Medium.otf'),
      EurostileRegular: require('./assets/fonts/EurostileRegular.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    return this.state.fontLoaded ? <App /> : null;
  }
}
