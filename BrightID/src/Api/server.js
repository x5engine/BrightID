// @flow

import { SEED_URL, SEED_URL_DEV } from 'react-native-dotenv';
import emitter from '../emitter';

if (__DEV__){
  SEED_URL = SEED_URL_DEV;
}

class Server {
  constructor(seedURL: string) {
    // for now set the baseURL to the seedURL since there is only one server

    this.baseURL = seedURL;

    // TODO: get a list of nodes from the seed node through an API call
    //  https://github.com/BrightID/BrightID/issues/191
    // TODO: select the best server to use through a "promise race"
    //  https://github.com/BrightID/BrightID/issues/202

  }

  /**
   *  Switch servers if the current one is having problems--for example, if the
   *  user you're connecting with can't access it for a profile exchange.
   */
  switch() {
    // TODO: temporarily blacklist the current server and choose another
  }

  update(newBaseUrl) {
    this.baseURL = newBaseUrl;
    emitter.emit('serverUrlChange', newBaseUrl);
  }

  get baseUrl() {
    return this.baseURL;
  }

  get apiUrl() {
    return `${this.baseURL}/brightid`;
  }

  get profileUrl() {
    return `${this.baseURL}/profile`;
  }
}

const server = new Server(SEED_URL);

export default server;
