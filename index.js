/**
 * @format
 */

import messaging from '@react-native-firebase/messaging';
import { AppRegistry } from 'react-native';
import notifee from '@notifee/react-native';

import { handlePushNotifiee } from '@src/utils';
import App from './App';
import { name as appName } from './app.json';

async function handleMessage(val) {
  handlePushNotifiee({
    body: val?.data?.body || val?.notification?.body || '',
    title: val?.data?.title || val?.notification?.title || '',
    largeIcon:
      val?.data?.android?.imageUrl ||
      val?.notification?.android?.imageUrl ||
      '',
  });
}

notifee.onBackgroundEvent(async ({ type, detail }) => {
  //NOTIFIE EventType.PRESS
  if (type === 1 ) {
    console.log('User pressed notification in the background ', JSON.stringify(detail, null, 3));
  }
});

// async function handleOnMessage(val) {
//   handleMessage(val);
// }

// messaging().onMessage(handleOnMessage);

async function handleBackgroundMessage(val) {
  handleMessage(val);
}

messaging().setBackgroundMessageHandler(handleBackgroundMessage);

AppRegistry.registerComponent(appName, () => App);
