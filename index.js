/**
 * @format
 */
// Only import react-native-gesture-handler on native platforms
import 'react-native-gesture-handler';

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import Store, { persistor } from './src/Store/Store';
import { PersistGate } from 'redux-persist/integration/react';

const Application =()=>(
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
      <App/>
      </PersistGate>
    </Provider>
)


AppRegistry.registerComponent(appName, () => Application);
