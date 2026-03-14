import { View } from 'react-native';
import { SvgProps } from 'react-native-svg';

import {
  AccessCodeStatusData,
  AccessCodeStatusType,
} from '@src/api/constants/default';
import AppText from '@src/components/AppText';
import {
  MaterialSymbolsCalendarTodayRounded,
  MaterialSymbolsSchedule,
} from '@src/components/icons';
import colors from '@src/configs/colors';
import { dayJSFormatter, isToday } from '@src/utils/time';
import Size from '@src/utils/useResponsiveSize';

interface Props {
  isAllDay: boolean;
  startDate: string;
  endTime: string;
  status: AccessCodeStatusType;
}

interface Details {
  Icon: ((val: SvgProps) => React.JSX.Element) | null;
  color: string;
  text: string;
}

const GroupAccessBookingStatus = (props: Props): React.JSX.Element => {
  const { endTime, isAllDay, startDate, status } = props;

  const formattedEndTime = dayJSFormatter({
    shouldNotLocalize: true,
    format: 'hh:mm A',
    value: endTime,
  });
  const formattedStartDate = dayJSFormatter({
    shouldNotLocalize: true,
    format: 'MMM D, YYYY',
    value: startDate,
  });

  function getStatusDetails(): Details {
    if (isToday(startDate)) {
      return {
        color: colors.YELLOW_100,
        Icon: MaterialSymbolsSchedule,
        text: `Check-in ends:  ${isAllDay ? 'All Day' : `${formattedEndTime}`}`,
      };
    } else {
      return {
        color: colors.GRAY_100,
        Icon: MaterialSymbolsCalendarTodayRounded,
        text: `${formattedStartDate}  ${
          status === AccessCodeStatusData.Cancel
            ? 'Cancelled'
            : isAllDay
            ? 'All Day'
            : `${formattedEndTime}`
        }`,
      };
    }
  }

  const StatusDetails = getStatusDetails();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: Size.calcWidth(2),
      }}
    >
      {StatusDetails?.Icon && (
        <StatusDetails.Icon
          width={Size.calcAverage(14)}
          height={Size.calcAverage(14)}
          color={StatusDetails?.color}
        />
      )}
      <AppText
        style={{
          color: StatusDetails?.color,
          fontSize: Size.calcAverage(12),
        }}
      >
        {StatusDetails.text}
      </AppText>
    </View>
  );
};

export default GroupAccessBookingStatus;
