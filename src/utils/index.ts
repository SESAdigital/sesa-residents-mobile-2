import Clipboard from '@react-native-clipboard/clipboard';
import { Alert, Linking } from 'react-native';

import appConfig from './appConfig';
import { appToast } from './appToast';

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

export const printConsole = (data: any) => {
  console.log(JSON.stringify(data, null, undefined));
};

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
