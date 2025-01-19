/**
 * @format
 */
// Only import react-native-gesture-handler on native platforms
import 'react-native-gesture-handler';

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import Store from './src/Store/Store';

const Application =()=>(
    <Provider store={Store}>
      <App/>
    </Provider>
)


AppRegistry.registerComponent(appName, () => Application);
