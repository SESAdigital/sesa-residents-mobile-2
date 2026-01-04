import { StatusBar } from 'react-native';
import { getSystemVersion, hasNotch } from 'react-native-device-info';
import Size from './useResponsiveSize';

export function getStatusBarPadding() {
  const height = StatusBar?.currentHeight || Size.calcHeight(30);

  if (!hasNotch() && Number(getSystemVersion()) >= 9) return height;
  return 0;
}
