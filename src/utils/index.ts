import Clipboard from '@react-native-clipboard/clipboard';
import { Alert, Linking, Platform } from 'react-native';
import notifee, {
  AndroidImportance,
  AndroidVisibility,
} from '@notifee/react-native';

import appConfig from './appConfig';
import { appToast } from './appToast';
import colors from '@src/configs/colors';
import {
  GenderTypeData,
  TransactionEntryType,
  TransactionEntryTypeData,
} from '@src/api/constants/default';

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

interface FormatMoneyToTwoDecimalsProps {
  amount: number | null;
  hideCurrency?: boolean;
}

export function formatMoneyToTwoDecimals(
  props: FormatMoneyToTwoDecimalsProps,
): string {
  const { amount, hideCurrency } = props;
  let formattedValue = '';

  if (!amount) {
    formattedValue = '0';
  } else {
    formattedValue = amount?.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  if (!hideCurrency) {
    formattedValue = `${appConfig.NAIRA_SYMBOL} ${formattedValue}`;
  }

  return formattedValue;
}

// TODO DELETE

export function maskEmail(email: string): string {
  if (!email) return '';
  const [username, domain] = email?.split('@');

  if (!username || !domain) {
    return email; // invalid email, return as-is
  }

  if (username.length <= 2) {
    return `${username[0]}*@${domain}`;
  }

  const maskedUsername =
    username[0] +
    '*'.repeat(username.length - 2) +
    username[username.length - 1];

  return `${maskedUsername}@${domain}`;
}

export const openURL = async (url: string) => {
  try {
    await Linking.openURL(url);
  } catch (error) {
    Alert.alert(`Don't know how to open this URL: ${url} ${error}`);
  }
};

interface CopyTextToClipboardProps {
  text: string;
  successText: string;
  errorText?: string;
}

export function copyTextToClipboard(props: CopyTextToClipboardProps) {
  const { successText, text, errorText } = props;

  if (!text) return;

  try {
    Clipboard?.setString(text);
    appToast.Success(successText);
  } catch (error) {
    appToast.Warning(`${errorText} ${error}`);
  }
}

export function getTransactionTypeColor(entryType: TransactionEntryType) {
  if (entryType === TransactionEntryTypeData.Credit) {
    return colors.GREEN_100;
  }

  if (entryType === TransactionEntryTypeData.Debit) {
    return colors.RED_100;
  }

  return colors.GRAY_100;
}

export const getTotalPages = ({
  pageSize,
  totalItems,
}: {
  pageSize: number;
  totalItems: number;
}) => {
  return Math.max(1, Math.ceil(totalItems / pageSize));
};

export const formatMoneyValue = (inputValue: string) => {
  const cleanedValue = inputValue?.toString().replace(/[^0-9.]/g, '');

  const [integerPart, decimalPart] = cleanedValue?.split('.');

  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ',',
  );

  const formattedDecimalPart = decimalPart ? decimalPart.substring(0, 2) : '';

  const result = inputValue.includes('.')
    ? `${formattedIntegerPart}.${formattedDecimalPart}`
    : formattedIntegerPart;

  return result;
};

export const formatMoneyValueIntoNumber = (value: string) => {
  if (!value) return 0;
  return Number(value?.replace(/,/g, ''));
};

export const normalizePhoneNumber = (phoneNumber: string) => {
  if (!phoneNumber) return '';
  return phoneNumber
    ?.replace(/\s+/g, '')
    ?.replace(/^\+234/, '0')
    ?.toLowerCase();
};

export const generateFileName = (index: number, type: string) => {
  return `image_${Date.now()}_${index}.${type?.split('/')[1] || 'jpg'}`;
};

function detectBase64ImageType(base64String: string) {
  if (base64String.startsWith('iVBORw0KG')) {
    return 'image/png';
  }

  if (base64String.startsWith('/9j/')) {
    return 'image/jpeg';
  }

  if (
    base64String.startsWith('R0lGODdh') ||
    base64String.startsWith('R0lGODlh')
  ) {
    return 'image/gif';
  }

  if (base64String.startsWith('UklGR')) {
    return 'image/webp';
  }

  if (base64String.startsWith('Qk')) {
    return 'image/bmp';
  }

  if (base64String.trim().startsWith('<svg')) {
    return 'image/svg+xml';
  }
  console.warn('Unknown image format');
  return '';
}

export const formatBase64Image = (image: string) => {
  if (!image) return '';

  const prefix = detectBase64ImageType(image);

  return `data:${prefix};base64,${image}`;
};

export const isBase64Image = (value: string) => {
  if (value?.startsWith('data:image')) return true;

  return false;
};

export const mapGenderTitle = (gender?: string | number) => {
  if (gender?.toString() === GenderTypeData.Male?.toString()) return 'Male';
  if (gender?.toString() === GenderTypeData.Female?.toString()) return 'Female';
  return 'Unknown';
};

export const formatKYCGender = (value?: string | null | number): string => {
  if (!value) return '';

  const stringValue = value?.toString()?.trim()?.toLowerCase();

  if (stringValue === 'male' || stringValue == 'm')
    return GenderTypeData.Male?.toString();
  if (stringValue === 'female' || stringValue == 'f')
    return GenderTypeData.Female?.toString();

  return stringValue;
};

export const handleSetupAndroidNotificationChannel = async () => {
  let channelId = '';

  const name = `${appConfig.APP_NAME}_CHANNEL1_${appConfig.APP_CUSTOM_FLAVOUR}`;
  if (Platform.OS === 'android') {
    // Create or update a channel
    channelId = await notifee.createChannel({
      id: name,
      sound: 'sesanotifsound2',
      name,
      vibration: true,
      importance: AndroidImportance.HIGH,
      visibility: AndroidVisibility.PUBLIC,
      bypassDnd: true,
      lights: true,
      description: 'Receive timely important alerts and reminders.',
      vibrationPattern: [300, 500],
    });
  }
  return channelId;
};

export interface NotifProps {
  title: string;
  body: string;
  largeIcon?: string;
}

export const handlePushNotifiee = async (props: NotifProps) => {
  const { title, body, largeIcon } = props;

  try {
    const channelId = await handleSetupAndroidNotificationChannel();

    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId,
        largeIcon: largeIcon || appConfig.APP_ICON,
        importance: AndroidImportance.HIGH,
        visibility: AndroidVisibility.PUBLIC,
        color: colors.WHITE_100,
        smallIcon: 'ic_notification',
        // sound: 'sesanotifsound2',
        vibrationPattern: [300, 500],
        pressAction: {
          id: 'default',
        },
      },
    });
  } catch (error) {
    console.log(`An error occured while handling notification ${error}`);
    appToast.Android(`An error occured while handling notification ${error}`);
  }
};

export function formatPhoneNumberPrefill(val: string | number) {
  const normalizedNumber = val?.toString()?.trim();

  if (normalizedNumber?.startsWith('+234')) {
    return '0' + normalizedNumber.slice(4);
  } else if (normalizedNumber?.startsWith('234')) {
    return '0' + normalizedNumber.slice(3);
  } else {
    return normalizedNumber;
  }
}
