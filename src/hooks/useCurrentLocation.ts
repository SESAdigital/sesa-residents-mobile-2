import Geolocation from '@react-native-community/geolocation';
import { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import { useQuery } from '@tanstack/react-query';

import { appToast } from '@src/utils/appToast';
import appConfig from '@src/utils/appConfig';
import { truncateText } from '@src/utils';

export interface GenericLocation {
  longitude: number;
  latitude: number;
}

let isErrorShown = false;

export const useGetCurrentLocation = () => {
  const [location, setLocation] = useState<GenericLocation | null>(null);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: `${appConfig.APP_NAME} needs access to your location.`,
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          appToast.Info('Location permission denied.');
        }
      } catch (err) {
        // TODO ADD LOGGING SERVICE
        if (!isErrorShown) {
          appToast.Warning(
            `Error requesting location permission : ${truncateText(
              JSON.stringify(err),
            )}`,
          );
        }
        isErrorShown = true;
      }
    } else {
      getCurrentLocation();
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      _ => {
        // appToast.Warning(`Error getting location: ${JSON.stringify(err)}`);
      },
      // error => {
      //   appToast.Warning(`Error getting location: ${JSON.stringify(error)}`);
      // },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  return {
    longitude: location?.longitude || 0,
    latitude: location?.latitude || 0,
  };
};

export const useWatchCurrentLocation = (): GenericLocation | null => {
  const [location, setLocation] = useState<GenericLocation | null>(null);

  const startWatchingLocation = (): number => {
    const watchId = Geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      _ => {
        // appToast.Warning(`Error getting location: ${JSON.stringify(err)}`);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 10,
        interval: 1000,
        fastestInterval: 500,
      },
    );

    return watchId;
  };

  const requestLocationPermission = async (): Promise<number> => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: `${appConfig.APP_NAME} needs access to your location for real-time tracking.`,
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          return startWatchingLocation();
        } else {
          appToast.Info('Location permission denied');
          return -1;
        }
      } catch (err) {
        appToast.Warning(`Error requesting permission: ${JSON.stringify(err)}`);
        return -1;
      }
    } else {
      return startWatchingLocation();
    }
  };

  useEffect(() => {
    let watchId: number = -1;

    const initLocationWatch = async () => {
      watchId = await requestLocationPermission();
    };

    initLocationWatch();

    return () => {
      if (watchId !== -1) {
        Geolocation.clearWatch(watchId);
      }
    };
  }, []);

  return location;
};

export const useGetAnyLocation = (): GenericLocation => {
  const watchLocation = useWatchCurrentLocation();
  const currentLocation = useGetCurrentLocation();

  const { data } = useQuery({
    queryKey: [
      'useGetAnyLocationFromDevice',
      currentLocation?.latitude,
      currentLocation?.longitude,
      watchLocation?.latitude,
      watchLocation?.longitude,
    ],
    queryFn: async () => {
      return {
        latitude: watchLocation?.latitude || currentLocation?.latitude || 0,
        longitude: watchLocation?.longitude || currentLocation?.longitude || 0,
      };
    },
  });

  return {
    latitude: data?.latitude || 0,
    longitude: data?.longitude || 0,
  };
};
