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
  if (props?.status === 401 || props?.status === 403) {
    return;
  }
  const message =
    props?.data?.message ||
    getFirstValidationError(props?.data) ||
    falbackMessage ||
    props?.problem ||
    'FATAL: Invalid error received.';

  const newMessage = removeDoubleQuotes(JSON.stringify(message));

  if (!preventToast) {
    appToast.Error(newMessage);
  }

  return newMessage;
};

type ValidationErrorResponse = {
  errors?: Record<string, string[]>;
};

function getFirstValidationError(
  errorResponse: ValidationErrorResponse,
): string | null {
  const errors = errorResponse?.errors;

  if (!errors) return null;

  const firstKey = Object.keys(errors)?.[0];
  if (!firstKey) return null;

  const firstErrorArray = errors?.[firstKey];
  if (!Array.isArray(firstErrorArray) || firstErrorArray?.length < 1) {
    return null;
  }

  return firstErrorArray?.[0];
}
