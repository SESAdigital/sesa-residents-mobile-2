import AppScreen from '@src/components/AppScreen';
import HappeningTodaySection from './components/HappeningTodaySection';
import HomeHeaderSection from './components/HomeHeaderSection';
import QuickActionAndAdsSection from './components/QuickActionAndAdsSection';
import { ScrollView } from 'react-native';
import AppRefreshControl from '@src/components/custom/AppRefreshControl';
import {
  useGetVistorHappeningToday,
  useGetEventsHappeningToday,
  useGetGroupAccessHappeningToday,
} from '@src/hooks/useGetRequests';

const HomeScreen = (): React.JSX.Element => {
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

  const handleRefetch = () => {
    customEventRefetch();
    customVisitorRefetch();
    custonGroupAccessRefetch();
  };

  const isLoading = isEventLoading || isGroupAccessLoading || isVisitorLoading;

  return (
    <AppScreen>
      <ScrollView
        refreshControl={
          <AppRefreshControl refreshing={isLoading} onRefresh={handleRefetch} />
        }
      >
        <HomeHeaderSection />
        <QuickActionAndAdsSection />
        <HappeningTodaySection />
      </ScrollView>
    </AppScreen>
  );
};

export default HomeScreen;
