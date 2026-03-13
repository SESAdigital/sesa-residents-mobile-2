import { ScrollView, StyleSheet, View } from 'react-native';

import { GetSingleBookingsAttendeeDetailResData } from '@src/api/bookings.api';
import AppAvatar from '@src/components/AppAvatar';
import AppScreen from '@src/components/AppScreen';
import AppSkeletonLoader from '@src/components/AppSkeletonLoader';
import AppText from '@src/components/AppText';
import AppDetailCard, {
  AppDetailCardDetailItem,
} from '@src/components/common/AppDetailCard';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import AppRefreshControl from '@src/components/custom/AppRefreshControl';
import BookingAccessByCard from '@src/components/custom/BookingAccessByCard';
import fonts from '@src/configs/fonts';
import {
  useGetBookingsEventAttendeeDetails,
  useGetBookingsGroupAccessAttendeeDetails,
} from '@src/hooks/useGetRequests';
import { AppScreenProps } from '@src/navigation/AppNavigator';
import Size from '@src/utils/useResponsiveSize';
import { dayJSFormatter } from '@src/utils/time';

interface PageProps {
  data: GetSingleBookingsAttendeeDetailResData | null;
  isLoading: boolean;
  refetch: () => void;
}

type Props = AppScreenProps<'ATTENDEE_DETAIL_SCREEN'>;

const AttendeeDetailScreen = (props: Props): React.JSX.Element => {
  const params = props?.route?.params;
  const isEvent = params?.type === 'EVENT';
  const id = params?.id;
  const parentId = params?.parentId;

  const { customRefetch: customBookingRefetch, queryData: bookingQueryData } =
    useGetBookingsGroupAccessAttendeeDetails({
      enabled: !!id && !isEvent && !!parentId,
      id,
      parentId,
    });

  const { customRefetch: customEventRefetch, queryData: eventQueryData } =
    useGetBookingsEventAttendeeDetails({
      enabled: !!id && isEvent && !!parentId,
      id,
      parentId,
    });

  const getPageProps = (): PageProps => {
    if (isEvent) {
      return {
        data: eventQueryData?.data || null,
        isLoading: eventQueryData?.isPending,
        refetch: customEventRefetch,
      };
    } else {
      return {
        data: bookingQueryData?.data || null,
        isLoading: bookingQueryData?.isPending,
        refetch: customBookingRefetch,
      };
    }
  };

  const { data, isLoading, refetch } = getPageProps();

  const splitedName = data?.name?.split(' ');

  const detailList: AppDetailCardDetailItem = [
    [
      {
        title: 'CHECK-IN DATE',
        value: dayJSFormatter({
          format: 'MMM D, YYYY',
          value: data?.checkInDate || '',
          shouldNotLocalize: true,
        }),
      },
    ],
    [
      {
        title: 'CHECK-IN TIME',
        value: data?.checkInTime || '',
      },
      {
        title: 'CHECK-OUT TIME',
        value: data?.checkOutTime || '--',
      },
    ],
    [
      {
        title: 'MODE OF ENTRY',
        value: data?.modeEntryText || '',
      },
      {
        title: 'NO. Of ENTRANTS ',
        value: data?.noOfEntrants?.toLocaleString() || '',
      },
    ],
    [
      {
        title: 'ATTENDEE NAME',
        value: data?.name || '',
      },
    ],
  ];

  return (
    <AppScreen showDownInset>
      <AppScreenHeader title="Visitor Details" />
      <ScrollView
        refreshControl={
          <AppRefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        contentContainerStyle={styles.container}
      >
        <View style={styles.header}>
          <AppAvatar
            firstWord={splitedName?.[0]}
            lastWord={splitedName?.[1]}
            size={Size.calcAverage(50)}
            isLoading={isLoading}
          />
          {isLoading ? (
            <View style={styles.name}>
              <AppSkeletonLoader width={Size.calcWidth(150)} />
            </View>
          ) : (
            <AppText style={styles.name}>{data?.phoneNumber}</AppText>
          )}
        </View>

        <AppDetailCard isLoading={isLoading} detailList={detailList} />

        {data?.checkInTime && (
          <BookingAccessByCard
            title="Checked-in by"
            name={data?.checkedInBy?.name || ''}
            time={data?.checkedInBy?.checkTime || ''}
            imageURL={data?.checkedInBy?.photo || ''}
            isLoading={isLoading}
          />
        )}
        {data?.checkOutTime && (
          <BookingAccessByCard
            title="Checked-out by"
            name={data?.checkedOutBy?.name || ''}
            time={data?.checkedOutBy?.checkTime || ''}
            imageURL={data?.checkedOutBy?.photo || ''}
            isLoading={isLoading}
          />
        )}
      </ScrollView>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: Size.calcHeight(21),
    paddingHorizontal: Size.calcWidth(21),
  },

  header: {
    alignItems: 'center',
    paddingBottom: Size.calcHeight(20),
  },

  name: {
    paddingTop: Size.calcHeight(16),
    fontSize: Size.calcAverage(16),
    fontFamily: fonts.INTER_600,
    textAlign: 'center',
  },
});

export default AttendeeDetailScreen;
