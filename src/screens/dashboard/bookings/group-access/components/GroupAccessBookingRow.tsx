import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { GetBookingsGroupAccessResData } from '@src/api/bookings.api';
import AppAvatar from '@src/components/AppAvatar';
import AppSkeletonLoader from '@src/components/AppSkeletonLoader';
import AppText from '@src/components/AppText';
import DuplicateLoader from '@src/components/DuplicateLoader';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import Size from '@src/utils/useResponsiveSize';
import GroupAccessBookingStatus from './GroupAccessBookingStatus';

export interface MappedGroupAccessBookingRowData {
  title: string;
  data: GetBookingsGroupAccessResData[];
}

interface Props {
  val: MappedGroupAccessBookingRowData;
  onPress: (id: number) => void;
}

const GroupAccessBookingRow = ({ val, onPress }: Props): React.JSX.Element => {
  return (
    <View>
      <View style={styles.dateContainer}>
        <AppText style={styles.date}>{val?.title}</AppText>
      </View>
      {val?.data?.map((value, index) => (
        <View style={styles.container} key={index}>
          <AppAvatar firstWord={value?.code?.[0]} lastWord={value?.code?.[1]} />

          <TouchableOpacity
            onPress={() => onPress(value?.id)}
            style={styles.contentContainer}
          >
            <View style={styles.descriptionContainer}>
              <AppText style={styles.title}>{value?.code}</AppText>

              <GroupAccessBookingStatus
                isAllDay={value?.isAllDay}
                endTime={value?.endTime}
                startDate={value?.startDate}
              />
            </View>
            {!!value?.totalCheckInCount && (
              <AppText style={[styles.text, { fontFamily: fonts.INTER_500 }]}>
                {value?.totalCheckInCount?.toLocaleString()} Check-ins
              </AppText>
            )}
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export const GroupAccessBookingRowLoader = (): React.JSX.Element => {
  return (
    <View>
      <View style={styles.dateContainer}>
        <AppSkeletonLoader width={Size.calcWidth(100)} />
      </View>
      <DuplicateLoader
        loader={
          <View style={styles.container}>
            <AppAvatar isLoading />

            <View style={styles.contentContainer}>
              <View style={styles.descriptionContainer}>
                <AppSkeletonLoader width={Size.calcWidth(100)} />

                <AppSkeletonLoader width={Size.calcWidth(100)} />
              </View>
            </View>
          </View>
        }
      />
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

  date: {
    fontSize: Size.calcAverage(12),
    fontFamily: fonts.INTER_500,
    color: colors.GRAY_100,
  },

  dateContainer: {
    borderTopWidth: Size.calcHeight(0.5),
    borderBottomWidth: Size.calcHeight(0.5),
    borderColor: colors.LIGHT_GRAY_200,
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(8),
  },

  descriptionContainer: {
    rowGap: Size.calcHeight(4),
    flex: 1,
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

export default GroupAccessBookingRow;
