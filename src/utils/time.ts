import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(relativeTime);

export function formatRelativeTime(time: string) {
  return dayjs(time).fromNow();
}

type AcceptedDateTimeFormats =
  | 'YYYY-MM-DD'
  | 'MMM D, YYYY'
  | 'MMMM D, YYYY h:mm A'
  | 'MMMM D, YYYY'
  | 'MMM D'
  | 'MMM D, YYYY h:mm A'
  | 'hh:mm A'
  | 'HH:mma';

interface DayJSFormatterProps {
  value: Date | string;
  format: AcceptedDateTimeFormats;
  shouldNotLocalize?: boolean;
  revalidateBackendFormat?: boolean;
}

export const parseBackendDate = (value: string | Date) => {
  if (typeof value === 'string' && value?.includes('/')) {
    const [datePart, ...timeParts] = value?.split(' ');
    const parts = datePart?.split('/');

    if (parts?.length === 3) {
      if (parts[0]?.length === 4) {
        return value?.replace(/\//g, '-');
      }
      const [day, month, year] = parts;
      const fullYear = year.length === 2 ? `20${year}` : year;
      const timeStr = timeParts.length > 0 ? ` ${timeParts.join(' ')}` : '';
      return `${fullYear}-${month}-${day}${timeStr}`;
    }
  }
  return value;
};

export const dayJSFormatter = (props: DayJSFormatterProps) => {
  const { value, format, shouldNotLocalize, revalidateBackendFormat } = props;
  if (!value) return '';

  let newValue = value;

  if (revalidateBackendFormat) {
    newValue = parseBackendDate(value);
  }

  if (shouldNotLocalize) {
    return dayjs(newValue).format(format);
  }

  return dayjs(newValue).tz('Africa/Lagos').format(format);
};

export const checkInvalidDate = (value: string) => {
  if (value === 'Invalid Date') return '';
  return value;
};

interface CombineDateTimeProps {
  date?: string;
  time?: string;
}

// export const combineUTCDateTime = (val: CombineDateTimeProps) => {
//   const { date, time } = val;

//   const startDate = new Date(date ?? '');
//   const startTime = new Date(time ?? '');

//   const year = startDate.getUTCFullYear();
//   const month = startDate.getUTCMonth(); // 0-indexed
//   const day = startDate.getUTCDate();

//   const hours = startTime.getUTCHours();
//   const minutes = startTime.getUTCMinutes();
//   const seconds = startTime.getUTCSeconds();
//   const milliseconds = startTime.getUTCMilliseconds();

//   // Combine into new Date (UTC-aware)
//   const combinedUTC = new Date(
//     Date.UTC(year, month, day, hours, minutes, seconds, milliseconds),
//   );

//   // const combinedDateTime = new Date(
//   //   year,
//   //   month,
//   //   day,
//   //   hours,
//   //   minutes,
//   //   seconds,
//   //   milliseconds,
//   // );

//   return combinedUTC?.toISOString();
// };

export const combineDateTime = (val: CombineDateTimeProps) => {
  const { date, time } = val;

  const startDate = new Date(date ?? '');
  const startTime = new Date(time ?? '');

  const year = startDate.getFullYear();
  const month = startDate.getMonth(); // 0-indexed
  const day = startDate.getDate();

  const hours = startTime.getHours();
  const minutes = startTime.getMinutes();
  const seconds = startTime.getSeconds();
  const milliseconds = startTime.getMilliseconds();

  // Combine into new Date (UTC-aware)
  const combinedDateTime = new Date(
    year,
    month,
    day,
    hours,
    minutes,
    seconds,
    milliseconds,
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

  return combinedDateTime?.toISOString();
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

export function isToday(dateString: string) {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return false;
  }
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}
