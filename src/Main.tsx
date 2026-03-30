import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';
import { PaystackProvider } from 'react-native-paystack-webview';

import { useRequestNotificationPermissionAndroid } from './hooks/usePermissions';
import AppModal from './modals/AppModal';
import { AppNavigator } from './navigation/AppNavigator';
import navigationTheme from './navigation/navigationTheme';
import { handlePushNotifiee } from './utils';
import appConfig from './utils/appConfig';
import { appToast } from './utils/appToast';

const Main = (): React.JSX.Element => {
  useRequestNotificationPermissionAndroid();

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async val => {
      const values = {
        title: val?.data?.title?.toString() || val?.notification?.title || '',
        body: val?.data?.body?.toString() || val?.notification?.body || '',
        largeIcon: val?.notification?.android?.imageUrl,
      };
      const { title, body, largeIcon } = values;

      handlePushNotifiee({ title, body, largeIcon });
      appToast.Info(title + '\n' + body);
    });

    return unsubscribe;
  }, []);
  return (
    <PaystackProvider publicKey={appConfig.APP_PAYSTACK_KEY}>
      <AppNavigator theme={{ ...navigationTheme, dark: true }} />
      <AppModal />
    </PaystackProvider>
  );
};

export default Main;
