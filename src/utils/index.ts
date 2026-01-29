import { StatusBar } from 'react-native';
import { getSystemVersion, hasNotch } from 'react-native-device-info';
import Size from './useResponsiveSize';

export function getStatusBarPadding() {
  const height = StatusBar?.currentHeight || Size.calcHeight(30);

  if (!hasNotch() && Number(getSystemVersion()) >= 9) return height;
  return 0;
}

export function truncateText(text: string, maxLength = 100) {
  if (!text) return '';

  if (text?.length <= maxLength) {
    return text;
  }
  return text?.slice(0, maxLength) + '...';
}

export const formatNumberInput = (
  inputValue: string | number | undefined | null,
): string => {
  if (!inputValue && inputValue !== 0) return ''; // Handle null, undefined, and empty values

  return String(inputValue).replace(/[^0-9]/g, ''); // Remove non-numeric characters
};

// TODO DELETE

export const printConsole = (data: any) => {
  console.log(JSON.stringify(data, null, undefined));
};
