import AppScreen from '@src/components/AppScreen';
import HappeningTodaySection from './components/HappeningTodaySection';
import HomeHeaderSection from './components/HomeHeaderSection';
import QuickActionSection from './components/QuickActionSection';
import { ScrollView } from 'react-native';
import AppRefreshControl from '@src/components/custom/AppRefreshControl';
import {
  useGetVistorHappeningToday,
  useGetEventsHappeningToday,
  useGetGroupAccessHappeningToday,
  useGetBillsMetrics,
  useGetDasboardAdverts,
} from '@src/hooks/useGetRequests';
import AdvertsSection from './components/AdvertsSection';

const HomeScreen = (): React.JSX.Element => {
  const { isLoading: isPaymentsLoading, customRefetch: refetchPayments } =
    useGetBillsMetrics();

  const {
    value: { isLoading: isVisitorLoading },
    customRefetch: customVisitorRefetch,
  } = useGetVistorHappeningToday();

  const {
    value: { isLoading: isEventLoading },
    customRefetch: customEventRefetch,
  } = useGetEventsHappeningToday();

  const {
    value: { isLoading: isGroupAccessLoading },
    customRefetch: custonGroupAccessRefetch,
  } = useGetGroupAccessHappeningToday();

  const {
    value: { isLoading: isAdvertsLoading },
    customRefetch: customAdvertsRefetch,
  } = useGetDasboardAdverts();

  const handleRefetch = () => {
    customEventRefetch();
    customVisitorRefetch();
    custonGroupAccessRefetch();
    customAdvertsRefetch();
    refetchPayments();
  };

  const isLoading =
    isEventLoading ||
    isGroupAccessLoading ||
    isVisitorLoading ||
    isPaymentsLoading ||
    isAdvertsLoading;

  return (
    <AppScreen>
      <ScrollView
        refreshControl={
          <AppRefreshControl refreshing={isLoading} onRefresh={handleRefetch} />
        }
      >
        <HomeHeaderSection />
        <QuickActionSection />
        <AdvertsSection />
        <HappeningTodaySection />
      </ScrollView>
    </AppScreen>
  );
};

export default HomeScreen;
