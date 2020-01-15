// @flow

import { AsyncStorage } from 'react-native';
import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, createStore, compose } from 'redux';
import reducer from '../reducer';
// eslint-disable-next-line import/no-cycle

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunkMiddleware)),
);

export const saveStore = async () => {
  try {
    const data = JSON.stringify(store.getState());
    await AsyncStorage.setItem('store@v1', data);
  } catch (err) {
    err instanceof Error
      ? console.warn('saveStore', err.message)
      : console.log('saveStore', err);
  }
};

// saves the store after every action
// TODO: disable this feature for certain actions
store.subscribe(() => {
  setTimeout(() => saveStore());
});

export default store;
