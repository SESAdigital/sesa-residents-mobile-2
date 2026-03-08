import AppScreen from '@src/components/AppScreen';
import HappeningTodaySection from './components/HappeningTodaySection';
import HomeHeaderSection from './components/HomeHeaderSection';
import QuickActionAndAdsSection from './components/QuickActionAndAdsSection';

const HomeScreen = (): React.JSX.Element => {
  return (
    <AppScreen scrollable>
      <HomeHeaderSection />
      <QuickActionAndAdsSection />
      <HappeningTodaySection />
    </AppScreen>
  );
};

export default HomeScreen;
