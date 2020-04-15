// @flow

import * as React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DEVICE_TYPE } from '@/utils/constants';

/**
 * Notification Card in the Notifications Screen
 * each Notification should have:
 * @prop msg
 * @prop icon
 */

class PopUp extends React.Component<Props> {
  handlePress = () => {
    alert('pressed');
  };

  render() {
    const { notificationMsg } = this.props;
    return notificationMsg ? (
      <TouchableHighlight
        style={styles.highlightContainer}
        onPress={this.handlePress}
      >
        <View style={styles.mainContainer}>
          <MaterialCommunityIcons size={26} name="bell-alert" color="#28a84a" />
          <Text style={styles.msg}>{notificationMsg}</Text>
          <TouchableOpacity style={styles.confirm} onPress={this.handlePress}>
            <Ionicon size={26} name="md-return-right" color="#333" />
          </TouchableOpacity>
        </View>
      </TouchableHighlight>
    ) : null;
  }
}

const styles = StyleSheet.create({
  highlightContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 45,
    left: '2.5%',
    width: '95%',
    height: DEVICE_TYPE === 'large' ? 94 : 80,
    borderBottomColor: '#e3e0e4',
    borderBottomWidth: 1,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: DEVICE_TYPE === 'large' ? 94 : 80,
    backgroundColor: '#fcfcfc',
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderRadius: 10,
  },
  confirm: {
    position: 'absolute',
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: 55,
    borderLeftColor: '#e3e0e4',
    borderLeftWidth: 2,
    height: DEVICE_TYPE === 'large' ? 94 : 80,
  },
  msg: {
    fontFamily: 'ApexNew-Book',
    color: 'black',
    fontSize: DEVICE_TYPE === 'large' ? 16 : 14,
    marginLeft: 16,
  },
  itemIcon: {
    // marginRight: 16,
  },
});

export default connect(({ user }) => ({ ...user }))(PopUp);
