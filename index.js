/**
 * @format
 */

import messaging from '@react-native-firebase/messaging';
import { AppRegistry } from 'react-native';

import { handlePushNotifiee } from '@src/utils';
import App from './App';
import { name as appName } from './app.json';

async function handleMessage(val) {
  handlePushNotifiee({
    body: val?.notification?.body || '',
    title: val?.notification?.title || '',
    largeIcon: val?.notification?.android?.imageUrl,
  });
}

async function handleOnMessage(val) {
  handleMessage(val);
}
async function handleBackgroundMessage(val) {
//   handleMessage(val);
}

messaging().setBackgroundMessageHandler(handleBackgroundMessage);

messaging().onMessage(handleOnMessage);


AppRegistry.registerComponent(appName, () => App);
