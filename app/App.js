/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {LogBox, View, Text} from 'react-native';
import Navigation from '@navigation';
import {persistor, store} from '@store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

LogBox.ignoreAllLogs(true);

const App = () => {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </PersistGate>
  );
};

export default App;
