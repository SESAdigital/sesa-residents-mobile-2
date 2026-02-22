import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(timezone);
dayjs.extend(utc);

export const dayJSFormatter = (
  value: Date | string,
  format:
    | 'YYYY-MM-DD'
    | 'MMM D, YYYY'
    | 'MMMM D, YYYY h:mm A'
    | 'MMMM D, YYYY'
    | 'MMM D'
    | 'MMM D, YYYY h:mm A'
    | 'hh:mm A',
) => {
  if (!value) return '';
  return dayjs(value).tz('Africa/Lagos').format(format);
  // return dayjs(value).format(format);
};

export const checkInvalidDate = (value: string) => {
  if (value === 'Invalid Date') return '';
  return value;
};
