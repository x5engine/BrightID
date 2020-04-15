// @flow

import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
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
  render() {
    return (
      <View style={styles.container}>
        <MaterialCommunityIcons size={26} name="bell-alert" color="#28a84a" />
        <Text style={styles.msg}>1 New Connection</Text>
        <TouchableOpacity style={styles.confirm}>
          <Ionicon size={26} name="md-return-right" color="#333" />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'absolute',
    top: 30,
    left: '2.5%',
    width: '95%',
    backgroundColor: '#fcfcfc',
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderBottomColor: '#e3e0e4',
    borderBottomWidth: 1,
    height: DEVICE_TYPE === 'large' ? 94 : 80,
    marginBottom: DEVICE_TYPE === 'large' ? 11.8 : 6,
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
    fontSize: 14,
    marginLeft: 16,
  },
  itemIcon: {
    // marginRight: 16,
  },
});

export default connect(({ groups, user }) => ({ ...groups, ...user }))(PopUp);
