// @flow

import { getRandomBytesAsync } from 'expo-random';
import { Alert } from 'react-native';
import api from '../../../Api/BrightId';
import { b64ToUrlSafeB64 } from '../../../utils/encoding';
import { setConnectQrData } from '../../../actions';

export const genQrData = () => async (dispatch: dispatch) => {
  try {
    var ipAddress = await api.ip();

    const b64Ip = Buffer.from(
      ipAddress.split('.').map((octet) => parseInt(octet, 10)),
    )
      .toString('base64')
      .substring(0, 6);
    const aesKey = await getRandomBytesAsync(16);
    const uuidKey = await getRandomBytesAsync(9);
    const uuid = b64ToUrlSafeB64(uuidKey.toString('base64'));
    const qrString = `${aesKey.toString('base64')}${uuid}${b64Ip}`;
    const user = '1';

    const dataObj = { aesKey, uuid, ipAddress, user, qrString };

    dispatch(setConnectQrData(dataObj));
  } catch (err) {
    err instanceof Error ? console.warn(err.message) : console.log(err);
  }
};
