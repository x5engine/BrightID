// @flow

// import { createDecipher } from 'react-native-crypto';
import aesjs, { ModeOfOperation } from 'aes-js';
import {
  setConnectUserData,
  removeConnectUserData,
} from '../../../actions/index';
import emitter from '../../../emitter';
import { b64ToUint8Array } from '../../../utils/encoding';

export const decryptData = (data: string) => async (
  dispatch: dispatch,
  getState: getState,
) => {
  try {
    const { connectQrData } = getState();

    const { aesKey } = connectQrData;

    // TODO CHANGE THIS
    const key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    const aesCtr = new ModeOfOperation.ctr(key);
    // const decipher = createDecipher('aes128', aesKey);

    // const decrypted =
    //   decipher.update(data, 'base64', 'utf8') + decipher.final('utf8');
    const decryptedBytes = aesCtr.decrypt(b64ToUint8Array(data));
    console.log('decryptedBytes', decryptedBytes);

    var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
    console.log('decryptedText', decryptedText);

    const decryptedObj = JSON.parse(decryptedText);

    dispatch(removeConnectUserData());
    dispatch(setConnectUserData(decryptedObj));
    emitter.emit('connectDataReady');
  } catch (err) {
    err instanceof Error
      ? console.warn('decryptData', err.message)
      : console.log('decryptData', err);
  }
};
