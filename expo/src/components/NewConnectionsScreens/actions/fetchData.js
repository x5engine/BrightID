import { Alert } from 'react-native';
import { decryptData } from './decryptData';
import emitter from '../../../emitter';

// @flow

export const fetchData = (alertErrors = true) => (
  dispatch: () => null,
  getState: () => {},
) => {
  let { ipAddress, channel } = getState().connectQrData;

  console.log(`fetching data for channel ${channel}`);

  const url = `https://${ipAddress}/profile/download/${channel}`;

  let response;

  console.log('url', url);

  fetch(url)
    .then(async (res) => {
      response = await res;
      console.log('response', response);
      if (response.ok) {
        return res.json();
      } else {
        throw new Error(
          `Profile download returned ${response.status}:` +
            `${response.statusText} for url: ${url}`,
        );
      }
    })
    .then((data) => {
      if (data && data.data) {
        response.profileData = data.data;
        console.log('data', response.profileData);
        dispatch(decryptData(data.data));
      } else {
        emitter.emit('profileNotReady');
      }
    })
    .catch((err) => {
      if (alertErrors) {
        let message = `Profile download attempt from url: ${url}
      Response from profile download: ${JSON.stringify(response)}
      Stack trace: ${err.stack}`;
        Alert.alert(err.message || 'Error', message);
      }
      err instanceof Error ? console.warn(err.message) : console.log(err);
      emitter.emit('connectFailure');
    });
};
