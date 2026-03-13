import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { GetBookingsEventsResData } from '@src/api/bookings.api';
import AppAvatar from '@src/components/AppAvatar';
import AppSkeletonLoader from '@src/components/AppSkeletonLoader';
import AppText from '@src/components/AppText';
import DuplicateLoader from '@src/components/DuplicateLoader';
import { MaterialSymbolsCalendarTodayRounded } from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { dayJSFormatter } from '@src/utils/time';
import Size from '@src/utils/useResponsiveSize';
import EventBookingStatus from './EventBookingStatus';

export interface MappedEventBookingRowData {
  title: string;
  data: GetBookingsEventsResData[];
}

interface Props {
  val: MappedEventBookingRowData;
  onPress: (id: number) => void;
}

const EventBookingRow = ({ val, onPress }: Props): React.JSX.Element => {
  return (
    <View>
      <View style={styles.dateContainer}>
        <AppText style={styles.date}>{val?.title}</AppText>
      </View>
      {val?.data?.map((value, index) => (
        <View style={styles.container} key={index}>
          <AppAvatar
            firstWord={value?.name?.split(' ')?.[0]}
            lastWord={value?.name?.split(' ')?.[1]}
            imageURL={value?.images?.[0]}
            style={styles.image}
          />

          <TouchableOpacity
            onPress={() => onPress(value?.id)}
            style={styles.contentContainer}
          >
            <View style={styles.descriptionContainer}>
              <AppText style={styles.title}>{value?.name}</AppText>

              <View style={styles.row2}>
                <View style={styles.row}>
                  <MaterialSymbolsCalendarTodayRounded
                    color={colors.GRAY_100}
                    height={Size.calcAverage(12)}
                    width={Size.calcAverage(12)}
                  />
                  <AppText style={styles.text}>
                    {dayJSFormatter({
                      value: value?.startDate,
                      format: 'MMM D, YYYY h:mm A',
                    })}
                  </AppText>
                </View>
                <EventBookingStatus
                  status={value?.status}
                  statusText={value?.statusText}
                />
              </View>
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

export const EventBookingRowLoader = (): React.JSX.Element => {
  return (
    <View>
      <View style={styles.dateContainer}>
        <AppSkeletonLoader width={Size.calcWidth(100)} />
      </View>
      <DuplicateLoader
        loader={
          <View style={styles.container}>
            <AppSkeletonLoader
              width={Size.calcAverage(40)}
              height={Size.calcAverage(40)}
              style={styles.image}
            />

            <View style={styles.contentContainer}>
              <View style={styles.descriptionContainer}>
                <AppSkeletonLoader width={Size.calcWidth(100)} />

                <View style={styles.row2}>
                  <View style={styles.row}>
                    <MaterialSymbolsCalendarTodayRounded
                      color={colors.GRAY_100}
                      height={Size.calcAverage(12)}
                      width={Size.calcAverage(12)}
                    />
                    <AppSkeletonLoader width={Size.calcWidth(100)} />
                  </View>
                  <AppSkeletonLoader width={Size.calcWidth(100)} />
                </View>
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

  image: {
    height: Size.calcAverage(40),
    borderRadius: Size.calcAverage(8),
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: Size.calcWidth(2),
  },

  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: Size.calcWidth(10),
    flexWrap: 'wrap',
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

export default EventBookingRow;
