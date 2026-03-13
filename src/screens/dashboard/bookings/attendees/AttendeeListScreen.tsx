import { FlatList, StyleSheet, View } from 'react-native';

import { GetBookingsAttendeesResData } from '@src/api/bookings.api';
import AppScreen from '@src/components/AppScreen';
import AppText from '@src/components/AppText';
import AppListFooterLoader from '@src/components/common/AppListFooterLoader';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import AppRefreshControl from '@src/components/custom/AppRefreshControl';
import DuplicateLoader from '@src/components/DuplicateLoader';
import EmptyTableComponent from '@src/components/EmptyTableComponent';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import {
  useGetBookingsEventAttendees,
  useGetBookingsGroupAccessAttendees,
} from '@src/hooks/useGetRequests';
import { AppScreenProps } from '@src/navigation/AppNavigator';
import Size from '@src/utils/useResponsiveSize';
import AttendeeListRow, { AttendeeListRowLoader } from './AttendeeListRow';

export interface AttendeeListScreenProps {
  id: number;
  type: 'GROUP_ACCESS' | 'EVENT';
  title: string;
  subtitle?: string;
  date: string;
}

interface PageFlatListProps {
  data: GetBookingsAttendeesResData[];
  isLoading: boolean;
  refetch: () => void;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  total: number;
}

type Props = AppScreenProps<'ATTENDEE_LIST_SCREEN'>;

const AttendeeListScreen = ({ route }: Props): React.JSX.Element => {
  const params = route?.params;
  const isEvent = params?.type === 'EVENT';
  const id = params?.id;

  const {
    formattedData: bookingFormattedData,
    customRefetch: customBookingRefetch,
    queryData: bookingQueryData,
  } = useGetBookingsGroupAccessAttendees({
    enabled: !!id && !isEvent,
    id,
  });
  const {
    formattedData: eventFormattedData,
    customRefetch: customEventRefetch,
    queryData: eventQueryData,
  } = useGetBookingsEventAttendees({
    enabled: !!id && isEvent,
    id,
  });

  const getPageFlatListProps = (): PageFlatListProps => {
    if (isEvent) {
      return {
        data: eventFormattedData,
        isLoading: eventQueryData?.isPending,
        refetch: customEventRefetch,
        fetchNextPage: eventQueryData?.fetchNextPage,
        hasNextPage: eventQueryData?.hasNextPage,
        isFetchingNextPage: eventQueryData?.isFetchingNextPage,
        total: eventQueryData?.data?.pages?.[0]?.data?.totalRecordCount || 0,
      };
    } else {
      return {
        data: bookingFormattedData,
        isLoading: bookingQueryData?.isPending,
        refetch: customBookingRefetch,
        fetchNextPage: bookingQueryData?.fetchNextPage,
        hasNextPage: bookingQueryData?.hasNextPage,
        isFetchingNextPage: bookingQueryData?.isFetchingNextPage,
        total: bookingQueryData?.data?.pages?.[0]?.data?.totalRecordCount || 0,
      };
    }
  };

  const {
    data,
    isLoading,
    refetch,
    fetchNextPage,
    hasNextPage,
    total,
    isFetchingNextPage,
  } = getPageFlatListProps();

  return (
    <AppScreen showDownInset>
      <AppScreenHeader>
        <AppText style={styles.headerTitle}>{params?.title}</AppText>
        <AppText numberOfLines={1} style={styles.headerSubtitle}>
          {params?.subtitle}
        </AppText>
      </AppScreenHeader>
      <View style={styles.banner}>
        <AppText style={styles.bannerText}>{params?.date}</AppText>
        <AppText style={styles.bannerText}>
          {total} check-in{total > 1 ? 's' : ''}
        </AppText>
      </View>
      <FlatList
        data={data}
        refreshControl={
          <AppRefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        showsVerticalScrollIndicator
        ListEmptyComponent={
          isLoading ? (
            <DuplicateLoader loader={<AttendeeListRowLoader />} />
          ) : (
            <EmptyTableComponent />
          )
        }
        renderItem={({ item }) => (
          <AttendeeListRow onPress={() => {}} val={item} />
        )}
        keyExtractor={(_, index) => index?.toString()}
        contentContainerStyle={{ paddingBottom: Size.calcHeight(70) }}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={2}
        ListFooterComponent={
          <AppListFooterLoader isloading={isFetchingNextPage} />
        }
      />
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: Size.calcAverage(10),
    borderBottomWidth: Size.calcHeight(1),
    borderBottomColor: colors.WHITE_300,
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(8),
    marginBottom: Size.calcHeight(18),
  },

  bannerText: {
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
  },

  headerSubtitle: {
    paddingHorizontal: Size.calcWidth(20),
    textAlign: 'center',
    paddingTop: Size.calcHeight(2),
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
  },

  headerTitle: {
    fontFamily: fonts.INTER_600,
    fontSize: Size.calcAverage(12),
    color: colors.BLACK_200,
    paddingHorizontal: Size.calcWidth(20),
    textAlign: 'center',
  },
});

export default AttendeeListScreen;
