import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { EventStatusTypeData } from '@src/api/constants/default';
import { GetPropertyDependentsGroupAccessResData } from '@src/api/household.api';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import GroupAccessBookingStatus from '@src/screens/dashboard/bookings/group-access/components/GroupAccessBookingStatus';
import Size from '@src/utils/useResponsiveSize';
import AppAvatar from '../AppAvatar';
import AppText from '../AppText';
import AppSkeletonLoader from '../AppSkeletonLoader';

interface Props {
  value: GetPropertyDependentsGroupAccessResData;
  onPress?: () => void;
}

const GenericGroupAccessRow = (props: Props): React.JSX.Element => {
  const { value, onPress } = props;

  return (
    <View style={styles.container}>
      <AppAvatar firstWord={value?.code?.[0]} lastWord={value?.code?.[1]} />

      <TouchableOpacity onPress={onPress} style={styles.contentContainer}>
        <View style={styles.descriptionContainer}>
          <AppText style={styles.title}>{value?.code}</AppText>

          <GroupAccessBookingStatus
            isAllDay={!!value?.isAllDay}
            endTime={value?.endDate}
            startDate={value?.startDate}
            status={value?.status || EventStatusTypeData.Completed}
          />
        </View>
        {!!value?.totalCheckInCount && (
          <AppText style={[styles.text, { fontFamily: fonts.INTER_500 }]}>
            {value?.totalCheckInCount?.toLocaleString()} Check-ins
          </AppText>
        )}
      </TouchableOpacity>
    </View>
  );
};

export const GenericGroupAccessRowLoader = (): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <AppAvatar isLoading />

      <View style={styles.contentContainer}>
        <View style={styles.descriptionContainer}>
          <AppSkeletonLoader width={Size.calcWidth(100)} />

          <AppSkeletonLoader width={Size.calcWidth(100)} />
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

  title: {
    fontFamily: fonts.INTER_500,
    color: colors.BLACK_300,
  },

  text: {
    color: colors.GRAY_100,
    fontSize: Size.calcAverage(12),
  },
});

export default GenericGroupAccessRow;
