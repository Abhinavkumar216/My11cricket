/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  // console.log('Message handled in the background!', remoteMessage);
});

messaging().getInitialNotification(async remoteMessage => {
  // console.log('Message received in the kill state!', remoteMessage);
});

AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));
