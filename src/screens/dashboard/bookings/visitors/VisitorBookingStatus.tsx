import { StyleSheet, View } from 'react-native';

import {
  AccessCodeStatusData,
  AccessCodeStatusType,
} from '@src/api/constants/default';
import AppText from '@src/components/AppText';
import AppPill from '@src/components/common/AppPill';
import { MdiLightArrowLeft, MdiLightArrowRight } from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import Size from '@src/utils/useResponsiveSize';

interface Props {
  status: AccessCodeStatusType;
  statusText: string;
  checkInTime: string;
  checkOutTime: string;
}

const VisitorBookingStatus = (data: Props): React.JSX.Element => {
  if (data?.status === AccessCodeStatusData.Pending) {
    return <AppPill statusText={data?.statusText} status="WARNING" />;
  }

  if (data?.status === AccessCodeStatusData.Cancel) {
    return <AppPill statusText={data?.statusText} status="DANGER" />;
  }

  if (data?.status === AccessCodeStatusData.Expired) {
    return <AppPill statusText={data?.statusText} status="DEFAULT" />;
  }

  if (data?.status === AccessCodeStatusData.SignedOut) {
    return <AppPill statusText={data?.statusText} status="PAUSED" />;
  }

  const checkOutColor =
    !data?.checkOutTime && data?.checkInTime ? colors.GRAY_200 : colors.RED_100;

  return (
    <View style={{ rowGap: Size.calcHeight(2) }}>
      <View style={styles.row}>
        <MdiLightArrowRight
          height={Size.calcAverage(20)}
          width={Size.calcAverage(20)}
          color={colors.GREEN_100}
        />
        <AppText style={styles.time}>{data?.checkInTime}</AppText>
      </View>
      <View style={styles.row}>
        <MdiLightArrowLeft
          height={Size.calcAverage(20)}
          width={Size.calcAverage(20)}
          color={checkOutColor}
        />
        <AppText style={[styles.time, { color: checkOutColor }]}>
          {!data?.checkOutTime ? 'Still in' : data?.checkOutTime}
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },

  time: {
    fontFamily: fonts.INTER_600,
    color: colors.GREEN_100,
    fontSize: Size.calcAverage(12),
    paddingLeft: Size.calcWidth(2),
    textAlign: 'right',
  },
});

export default VisitorBookingStatus;
