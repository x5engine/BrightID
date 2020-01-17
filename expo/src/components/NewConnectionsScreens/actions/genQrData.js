// @flow

import { getRandomBytesAsync } from 'expo-random';
import { Alert } from 'react-native';
import api from '../../../Api/BrightId';
import {
  b64ToUrlSafeB64,
  uInt8ArrayToB64,
  b64ToUint8Array,
} from '../../../utils/encoding';
import { setConnectQrData } from '../../../actions';
import { Buffer } from 'buffer';

export const genQrData = () => async (dispatch: dispatch) => {
  try {
    var ipAddress = await api.ip();

    const b64Ip = Buffer.from(
      ipAddress.split('.').map((octet) => parseInt(octet, 10)),
    )
      .toString('base64')
      .substring(0, 6);
    const aesKey = await getRandomBytesAsync(16);
    const aesKey64 = uInt8ArrayToB64(aesKey);
    const uuid = await getRandomBytesAsync(9);
    const uuid64 = uInt8ArrayToB64(uuid);
    const qrString = `${aesKey64}${uuid64}${b64Ip}`;
    const user = '1';

    const dataObj = { aesKey, uuid, ipAddress, user, qrString };
    console.log('genQrCodeData', dataObj);

    dispatch(setConnectQrData(dataObj));
  } catch (err) {
    err instanceof Error
      ? console.warn('genQrData', err.message)
      : console.log('genQrData', err);
  }
};
