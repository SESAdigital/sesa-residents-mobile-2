import { StyleSheet, TouchableOpacity, View } from 'react-native';

import {
  GetBookingsAttendeesResData,
  GetBookingsVistorResData,
} from '@src/api/bookings.api';
import AppAvatar from '@src/components/AppAvatar';
import AppSkeletonLoader from '@src/components/AppSkeletonLoader';
import AppText from '@src/components/AppText';
import {
  MaterialSymbolsAccountCircle,
  MdiLightArrowLeft,
  MdiLightArrowRight,
} from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import Size from '@src/utils/useResponsiveSize';

export interface MappedVisitorBookingRowData {
  title: string;
  data: GetBookingsVistorResData[];
}

interface Props {
  val: GetBookingsAttendeesResData;
  onPress: (id: number) => void;
}

const AttendeeListRow = ({ val, onPress }: Props): React.JSX.Element => {
  const splittedName = val?.name?.split(' ');

  const checkOutColor =
    !val?.checkOutTime && val?.checkInTime ? colors.GRAY_200 : colors.RED_100;

  return (
    <View style={styles.container}>
      <AppAvatar firstWord={splittedName?.[0]} lastWord={splittedName?.[1]} />

      <TouchableOpacity
        onPress={() => onPress(val?.id)}
        style={styles.contentContainer}
      >
        <View style={styles.descriptionContainer}>
          <AppText style={styles.title}>{val?.phoneNumber}</AppText>

          <View style={styles.row}>
            <MaterialSymbolsAccountCircle
              color={colors.GRAY_100}
              height={Size.calcAverage(12)}
              width={Size.calcAverage(12)}
            />
            <AppText style={styles.text}>{val?.name}</AppText>
          </View>
        </View>
        <View style={{ rowGap: Size.calcHeight(2) }}>
          <View style={styles.row3}>
            <MdiLightArrowRight
              height={Size.calcAverage(20)}
              width={Size.calcAverage(20)}
              color={colors.GREEN_100}
            />
            <AppText style={styles.time}>{val?.checkInTime}</AppText>
          </View>
          <View style={styles.row3}>
            <MdiLightArrowLeft
              height={Size.calcAverage(20)}
              width={Size.calcAverage(20)}
              color={checkOutColor}
            />
            <AppText style={[styles.time, { color: checkOutColor }]}>
              {!val?.checkOutTime ? 'Still in' : val?.checkOutTime}
            </AppText>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const AttendeeListRowLoader = (): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <AppAvatar isLoading />

      <View style={styles.contentContainer}>
        <View style={styles.descriptionContainer}>
          <AppSkeletonLoader width={Size.calcWidth(100)} />

          <View style={styles.row}>
            <MaterialSymbolsAccountCircle
              color={colors.GRAY_100}
              height={Size.calcAverage(12)}
              width={Size.calcAverage(12)}
            />
            <AppSkeletonLoader width={Size.calcWidth(50)} />
          </View>
        </View>
        <View style={{ rowGap: Size.calcHeight(5) }}>
          <AppSkeletonLoader width={Size.calcWidth(80)} />
          <AppSkeletonLoader width={Size.calcWidth(80)} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Size.calcWidth(18),
  },

  contentContainer: {
    flex: 1,
    paddingVertical: Size.calcHeight(13),
    borderBottomWidth: Size.calcHeight(1),
    borderBottomColor: colors.WHITE_300,
    flexDirection: 'row',
    flexShrink: 1,
    alignItems: 'center',
    marginLeft: Size.calcWidth(12),
  },

  descriptionContainer: {
    rowGap: Size.calcHeight(4),
    flex: 1,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: Size.calcWidth(2),
  },

  row3: {
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

  title: {
    fontFamily: fonts.INTER_500,
    color: colors.BLACK_300,
  },

  text: {
    color: colors.GRAY_100,
    fontSize: Size.calcAverage(12),
  },
});

export default AttendeeListRow;
