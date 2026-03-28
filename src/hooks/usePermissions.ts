import messaging from '@react-native-firebase/messaging';
import { useCallback, useEffect, useState } from 'react';
import { Alert, Platform, PermissionsAndroid } from 'react-native';
import {
  PERMISSIONS,
  PermissionStatus,
  RESULTS,
  check,
  openSettings,
  request,
} from 'react-native-permissions';

import { useAppStateStore } from '@src/stores/appState.store';
import { useAuthStore } from '@src/stores/auth.store';
import { appToast } from '@src/utils/appToast';
import { handleSetupAndroidNotificationChannel } from '@src/utils';

type PermissionState = {
  status: PermissionStatus | null;
  loading: boolean;
  error: string | null;
};

export const useCameraPermission = () => {
  const [state, setState] = useState<PermissionState>({
    status: null,
    loading: false,
    error: null,
  });

  const permission =
    Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;

  const checkPermission = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const result: PermissionStatus = await check(permission);
      setState(prev => ({ ...prev, status: result, loading: false }));
      return result;
    } catch (error: unknown) {
      const errorMsg =
        error instanceof Error
          ? error.message
          : 'Unknown error checking permission';
      setState(prev => ({ ...prev, error: errorMsg, loading: false }));
      return RESULTS.UNAVAILABLE;
    }
  }, [permission]);

  const requestPermission = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const result: PermissionStatus = await request(permission);
      setState(prev => ({ ...prev, status: result, loading: false }));

      if (result === RESULTS.BLOCKED) {
        Alert.alert(
          'Camera Permission Required',
          'Please enable camera access in settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Open Settings',
              onPress: () => openSettings().catch(console.error),
            },
          ],
        );
      }

      return result;
    } catch (error: unknown) {
      const errorMsg =
        error instanceof Error
          ? error.message
          : 'Unknown error requesting permission';
      setState(prev => ({ ...prev, error: errorMsg, loading: false }));
      return RESULTS.DENIED;
    }
  }, [permission]);

  useEffect(() => {
    checkPermission().then(result => {
      if (result === RESULTS.DENIED) {
        requestPermission();
      }
    });
  }, [checkPermission, requestPermission]);

  return {
    ...state,
    requestPermission,
    checkPermission,
  };
};

export const useRequestNotificationPermissionAndroid = () => {
  const { setActiveModal, closeActiveModal } = useAppStateStore();
  const { FCMToken, setFCMToken } = useAuthStore();
  handleSetupAndroidNotificationChannel();

  const getFCMToken = async () => {
    if (!FCMToken) {
      try {
        const token = await messaging().getToken();
        setFCMToken(token);
      } catch (error) {
        console.error('Failed to get FCM Token', error);
      }
    }
  };

  const handleNeverAsk = () => {
    // setActiveModal({
    //   modalType: 'SINGLE_PROMPT_MODAL',
    //   singlePromptModal: {
    //     title: 'Enable Notifications',
    //     description:
    //       'We need your permission to send important updates. Open settings to enable notifications.',
    //     onPress: () => {
    //       closeActiveModal();
    //       openSettings().catch(() =>
    //         appToast.Warning('Unable to open settings'),
    //       );
    //     },
    //     buttonTitle: 'Open Settings',
    //   },
    // });
  };

  const handleDenied = () => {
    // setActiveModal({
    //   modalType: 'SINGLE_PROMPT_MODAL',
    //   singlePromptModal: {
    //     title: 'Enable Notifications',
    //     description: "We'd like to send you updates and alerts.",
    //     onPress: () => {
    //       closeActiveModal();
    //       requestNotificationPermissionAndroid();
    //     },
    //     buttonTitle: 'Request Permission',
    //   },
    // });
  };

  const requestNotificationPermissionAndroid = async () => {
    if (Platform.OS !== 'android') return;

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) return;

      if (granted === PermissionsAndroid.RESULTS.DENIED) {
        handleDenied();
        return;
      }

      if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        handleNeverAsk();
        return;
      }
    } catch (error) {
      appToast.Warning(
        `Notification permission request error: ${JSON.stringify(error)}`,
      );
    }
  };

  useEffect(() => {
    requestNotificationPermissionAndroid();
    getFCMToken();
  }, []);
};
