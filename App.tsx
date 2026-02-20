import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { Toaster } from 'sonner-native';

import OfflineNotice from '@src/components/OfflineNotice';
import { AppNavigator } from '@src/navigation/AppNavigator';
import navigationTheme from '@src/navigation/navigationTheme';
import AppModal from '@src/modals/AppModal';
import { PaystackProvider } from 'react-native-paystack-webview';
import appConfig from '@src/utils/appConfig';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, //number in milliseconds equals to 5 minutes, suitable time for refetching
      gcTime: 6 * 60 * 60 * 1000, // 6 hours before data is deleted
    },
    mutations: {
      retry: 0,
    },
  },
});

const seconds = 1;

export default function App() {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (timeLeft < 1) return SplashScreen.hide();
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  useEffect(() => {
    SystemNavigationBar.setBarMode('dark');
    SystemNavigationBar.setNavigationColor('white');
  }, []);

  // useRequestNotificationPermissionAndroid();

  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <OfflineNotice />
          <PaystackProvider publicKey={appConfig.APP_PAYSTACK_KEY}>
            <AppNavigator theme={{ ...navigationTheme, dark: true }} />
            <AppModal />
          </PaystackProvider>
          <Toaster visibleToasts={1} richColors theme="light" />
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
