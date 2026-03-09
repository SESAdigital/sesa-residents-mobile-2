import { FlatList } from 'react-native';

import AppRefreshControl from '@src/components/custom/AppRefreshControl';
import DuplicateLoader from '@src/components/DuplicateLoader';
import EmptyTableComponent from '@src/components/EmptyTableComponent';
import { useGetVistorHappeningToday } from '@src/hooks/useGetRequests';
import VisitorListRow, {
  VisitorListRowLoader,
} from '../components/VisitorListRow';

const HappeningTodayVisitorSection = (): React.JSX.Element => {
  const {
    value: { data, isLoading },
    customRefetch,
  } = useGetVistorHappeningToday();

  return (
    <FlatList
      data={data || []}
      refreshControl={
        <AppRefreshControl refreshing={isLoading} onRefresh={customRefetch} />
      }
      showsVerticalScrollIndicator
      ListEmptyComponent={
        isLoading ? (
          <DuplicateLoader loader={<VisitorListRowLoader />} />
        ) : (
          <EmptyTableComponent onRetry={customRefetch} />
        )
      }
      renderItem={({ item }) => <VisitorListRow data={item} />}
      keyExtractor={(_, index) => index?.toString()}
      scrollEnabled={false}
    />
  );
};

export default HappeningTodayVisitorSection;
