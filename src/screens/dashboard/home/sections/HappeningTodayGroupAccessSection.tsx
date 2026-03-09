import { FlatList } from 'react-native';

import AppRefreshControl from '@src/components/custom/AppRefreshControl';
import DuplicateLoader from '@src/components/DuplicateLoader';
import EmptyTableComponent from '@src/components/EmptyTableComponent';
import { useGetGroupAccessHappeningToday } from '@src/hooks/useGetRequests';
import GroupAccessListRow, {
  GroupAccessListRowLoader,
} from '../components/GroupAccessListRow';

const HappeningTodayGroupAccessSection = (): React.JSX.Element => {
  const {
    value: { data, isLoading },
    customRefetch,
  } = useGetGroupAccessHappeningToday();

  return (
    <FlatList
      data={data || []}
      refreshControl={
        <AppRefreshControl refreshing={isLoading} onRefresh={customRefetch} />
      }
      showsVerticalScrollIndicator
      ListEmptyComponent={
        isLoading ? (
          <DuplicateLoader loader={<GroupAccessListRowLoader />} />
        ) : (
          <EmptyTableComponent onRetry={customRefetch} />
        )
      }
      renderItem={({ item }) => <GroupAccessListRow data={item} />}
      keyExtractor={(_, index) => index?.toString()}
      scrollEnabled={false}
    />
  );
};

export default HappeningTodayGroupAccessSection;
