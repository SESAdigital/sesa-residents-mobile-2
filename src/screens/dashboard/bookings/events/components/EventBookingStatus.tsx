import { View } from 'react-native';
import { SvgProps } from 'react-native-svg';

import {
  EventStatusType,
  EventStatusTypeData,
} from '@src/api/constants/default';
import AppText from '@src/components/AppText';
import {
  MaterialSymbolsCheckRounded,
  MaterialSymbolsCloseRounded,
  MaterialSymbolsScheduleOutlineRounded,
} from '@src/components/icons';
import colors from '@src/configs/colors';
import Size from '@src/utils/useResponsiveSize';

interface Props {
  status: EventStatusType;
  statusText: string;
}

interface Details {
  Icon: ((val: SvgProps) => React.JSX.Element) | null;
  color: string;
}

const EventBookingStatus = (props: Props): React.JSX.Element => {
  const { status, statusText } = props;
  const StatusDetails = getStatusDetails(status);

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
          color={StatusDetails?.color || colors.GRAY_100}
        />
      )}
      <AppText
        style={{
          color: StatusDetails?.color || colors.GRAY_100,
          fontSize: Size.calcAverage(12),
        }}
      >
        {statusText}
      </AppText>
    </View>
  );
};

export default EventBookingStatus;

function getStatusDetails(value: EventStatusType): Details | null {
  if (
    value === EventStatusTypeData.Declined ||
    value === EventStatusTypeData.Cancelled
  ) {
    return {
      color: colors.RED_100,
      Icon: MaterialSymbolsCloseRounded,
    };
  }

  if (value === EventStatusTypeData.Completed) {
    return {
      color: colors.GREEN_100,
      Icon: MaterialSymbolsCheckRounded,
    };
  }

  if (value === EventStatusTypeData.New) {
    return {
      color: colors.GRAY_100,
      Icon: MaterialSymbolsScheduleOutlineRounded,
    };
  }

  if (value === EventStatusTypeData.Ongoing) {
    return {
      color: colors.YELLOW_100,
      Icon: null,
    };
  }

  return null;
}
