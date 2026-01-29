import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { BackHandler } from 'react-native';

export default function (customFunc: () => void, val: number) {
  useFocusEffect(
    useCallback(() => {
      const handleBackButton = () => {
        customFunc?.();
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        handleBackButton,
      );

      return () => backHandler.remove();
    }, [val]),
  );
}
