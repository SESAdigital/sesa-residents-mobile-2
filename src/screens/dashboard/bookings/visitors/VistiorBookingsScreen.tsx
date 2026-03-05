import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import {
  getBookingsVisitors,
  GetBookingsVisitorsRes,
} from '@src/api/bookings.api';
import queryKeys from '@src/api/constants/queryKeys';
import AppRefreshControl from '@src/components/custom/AppRefreshControl';
import DuplicateLoader from '@src/components/DuplicateLoader';
import { useAuthStore } from '@src/stores/auth.store';
import { handleToastApiError } from '@src/utils/handleErrors';
import Size from '@src/utils/useResponsiveSize';
import EmtpyTransactionComponent from '../../transactions/components/EmtpyTransactionComponent';
import { TransactionListRowLoader } from '../../transactions/components/TransactionListRow';
import VisitorBookingRow, {
  MappedVisitorBookingRowData,
} from './VisitorBookingRow';

const VistiorBookingsScreen = (): React.JSX.Element => {
  const [searchText, setSearchText] = useState('');
  const { selectedProperty } = useAuthStore();

  const queryKey = [
    queryKeys.GET_VISITOR_BOOKINGS,
    selectedProperty?.id,
    searchText,
  ];

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await getBookingsVisitors({
        id: selectedProperty?.id!,
        query: {
          ...(!!searchText ? { SearchText: searchText } : {}),
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
    <FlatList
      data={mapVisitorHistoryToSections(data || null)}
      refreshControl={
        <AppRefreshControl refreshing={isLoading} onRefresh={refetch} />
      }
      showsVerticalScrollIndicator
      ListEmptyComponent={
        isLoading ? (
          <DuplicateLoader loader={<TransactionListRowLoader />} />
        ) : (
          <EmtpyTransactionComponent />
        )
      }
      renderItem={({ item }) => <VisitorBookingRow val={item} />}
      keyExtractor={(_, index) => index?.toString()}
      contentContainerStyle={{ paddingBottom: Size.calcHeight(70) }}
    />
  );
};

const styles = StyleSheet.create({});

export default VistiorBookingsScreen;

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
