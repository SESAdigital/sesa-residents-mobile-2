import { FlatList } from 'react-native';

import AppRefreshControl from '@src/components/custom/AppRefreshControl';
import DuplicateLoader from '@src/components/DuplicateLoader';
import EmptyTableComponent from '@src/components/EmptyTableComponent';
import { useGetEventsHappeningToday } from '@src/hooks/useGetRequests';
import EventListRow, { EventListRowLoader } from '../components/EventListRow';

const HappeningTodayEventsSection = (): React.JSX.Element => {
  const {
    value: { data, isLoading },
    customRefetch,
  } = useGetEventsHappeningToday();

  return (
    <FlatList
      data={data || []}
      refreshControl={
        <AppRefreshControl refreshing={isLoading} onRefresh={customRefetch} />
      }
      showsVerticalScrollIndicator
      ListEmptyComponent={
        isLoading ? (
          <DuplicateLoader loader={<EventListRowLoader />} />
        ) : (
          <EmptyTableComponent onRetry={customRefetch} />
        )
      }
      renderItem={({ item }) => <EventListRow data={item} />}
      keyExtractor={(_, index) => index?.toString()}
      scrollEnabled={false}
    />
  );
};

export default HappeningTodayEventsSection;
