import { useAppNavigator } from '@src/navigation/AppNavigator';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import {
  getBookingsVisitors,
  GetBookingsVisitorsRes,
} from '@src/api/bookings.api';
import queryKeys from '@src/api/constants/queryKeys';
import AppFAB from '@src/components/AppFAB';
import AppRefreshControl from '@src/components/custom/AppRefreshControl';
import DuplicateLoader from '@src/components/DuplicateLoader';
import EmptyTableComponent from '@src/components/EmptyTableComponent';
import AppSearchInput from '@src/components/forms/AppSearchInput';
import colors from '@src/configs/colors';
import routes from '@src/navigation/routes';
import { useAuthStore } from '@src/stores/auth.store';
import { handleToastApiError } from '@src/utils/handleErrors';
import Size from '@src/utils/useResponsiveSize';
import VisitorBookingRow, {
  MappedVisitorBookingRowData,
  VisitorBookingRowLoader,
} from './VisitorBookingRow';

const VisitorBookingsScreen = (): React.JSX.Element => {
  const [searchText, setSearchText] = useState('');
  const { selectedProperty } = useAuthStore();

  const navigation = useAppNavigator();

  const queryKey = [
    queryKeys.GET_VISITOR_BOOKINGS,
    'getBookingsVisitors',
    selectedProperty?.id,
    searchText,
  ];

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await getBookingsVisitors({
        id: selectedProperty?.id!,
        query: {
          ...(searchText ? { SearchText: searchText } : {}),
        },
      });
      if (response.ok) {
        return response?.data;
      } else {
        handleToastApiError(response);
        return null;
      }
    },
    enabled: !!selectedProperty?.id,
  });

  const queryClient = useQueryClient();
  const refetch = () => queryClient.resetQueries({ queryKey });

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.searchContainer}>
        <AppSearchInput
          disabled={isLoading}
          onSearchDone={val => setSearchText(val)}
          placeholder="Search visitors"
        />
      </View>

      <FlatList
        data={mapVisitorHistoryToSections(data || null)}
        refreshControl={
          <AppRefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        showsVerticalScrollIndicator
        ListEmptyComponent={
          isLoading ? (
            <DuplicateLoader loader={<VisitorBookingRowLoader />} />
          ) : (
            <EmptyTableComponent />
          )
        }
        renderItem={({ item }) => (
          <VisitorBookingRow
            onPress={id =>
              navigation.navigate(routes.VISITOR_BOOKING_DETAILS_SCREEN, { id })
            }
            val={item}
          />
        )}
        keyExtractor={(_, index) => index?.toString()}
        contentContainerStyle={{ paddingBottom: Size.calcHeight(100) }}
      />
      <AppFAB
        onPress={() => navigation.navigate(routes.BOOK_VISITOR_SCREEN)}
        style={{ bottom: Size.calcHeight(30) }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(10),
    borderBottomWidth: Size.calcHeight(0.5),
    borderColor: colors.LIGHT_GRAY_200,
  },
});

export default VisitorBookingsScreen;

function mapVisitorHistoryToSections(
  response: GetBookingsVisitorsRes | null,
): MappedVisitorBookingRowData[] {
  const data = response?.data;
  const sections: MappedVisitorBookingRowData[] = [];

  if (!data) return sections;

  if (data?.todayHistroy?.length > 0) {
    sections.push({
      title: 'Today',
      data: data?.todayHistroy,
    });
  }

  if (data?.upcommingHistroy?.length > 0) {
    sections.push({
      title: 'Upcoming',
      data: data?.upcommingHistroy,
    });
  }

  if (data?.olderHistroy?.length > 0) {
    sections.push({
      title: 'Older',
      data: data?.olderHistroy,
    });
  }

  return sections;
}
