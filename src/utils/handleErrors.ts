import { ApiResponse } from 'apisauce';
import { appToast } from './appToast';

function removeDoubleQuotes(str?: string): string {
  if (!str) return '';
  if (str.startsWith('"') && str.endsWith('"')) {
    return str.slice(1, -1);
  }
  return str;
}

export const handleToastApiError = (
  props: ApiResponse<any>,
  falbackMessage?: string,
  preventToast?: boolean,
) => {
  const message =
    props?.data?.message ||
    falbackMessage ||
    props?.problem ||
    'FATAL: Invalid error received.';

  const newMessage = removeDoubleQuotes(
    props?.data?.message || JSON.stringify(message),
  );

  if (!preventToast) {
    appToast.Error(newMessage);
  }

  return newMessage;
};
