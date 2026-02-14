import dayjs from 'dayjs';

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
  return dayjs(value).format(format);
};
