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
  shouldNotLocalize?: boolean,
) => {
  if (!value) return '';
  if (shouldNotLocalize) {
    return dayjs(value).format(format);
  }
  return dayjs(value).tz('Africa/Lagos').format(format);
};

export const checkInvalidDate = (value: string) => {
  if (value === 'Invalid Date') return '';
  return value;
};

interface CombineDateTimeProps {
  date?: string;
  time?: string;
}

export const combineDateTime = (val: CombineDateTimeProps) => {
  const { date, time } = val;

  const startDate = new Date(date ?? '');
  const startTime = new Date(time ?? '');

  const year = startDate.getUTCFullYear();
  const month = startDate.getUTCMonth(); // 0-indexed
  const day = startDate.getUTCDate();

  const hours = startTime.getUTCHours();
  const minutes = startTime.getUTCMinutes();
  const seconds = startTime.getUTCSeconds();
  const milliseconds = startTime.getUTCMilliseconds();

  // Combine into new Date (UTC-aware)
  const combinedUTC = new Date(
    Date.UTC(year, month, day, hours, minutes, seconds, milliseconds),
  );

  // const combinedDateTime = new Date(
  //   year,
  //   month,
  //   day,
  //   hours,
  //   minutes,
  //   seconds,
  //   milliseconds,
  // );

  return combinedUTC?.toISOString();
};

interface ValidateTimeProps {
  startTime: string;
  startDate: string;
  endTime: string;
  endDate: string;
}

export function isStartGreaterOrEqual(props: ValidateTimeProps): boolean {
  const { startDate, startTime, endDate, endTime } = props;

  // Parse the strings into Date objects
  const startDateObj = new Date(startDate);
  const startTimeObj = new Date(startTime);
  const endDateObj = new Date(endDate);
  const endTimeObj = new Date(endTime);

  // Combine start date and time
  const startDateTime = new Date(
    startDateObj.getFullYear(),
    startDateObj.getMonth(),
    startDateObj.getDate(),
    startTimeObj.getHours(),
    startTimeObj.getMinutes(),
    startTimeObj.getSeconds(),
    startTimeObj.getMilliseconds(),
  );

  // Combine end date and time
  const endDateTime = new Date(
    endDateObj.getFullYear(),
    endDateObj.getMonth(),
    endDateObj.getDate(),
    endTimeObj.getHours(),
    endTimeObj.getMinutes(),
    endTimeObj.getSeconds(),
    endTimeObj.getMilliseconds(),
  );

  return startDateTime.getTime() >= endDateTime.getTime();
}
