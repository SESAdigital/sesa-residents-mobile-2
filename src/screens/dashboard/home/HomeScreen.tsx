import { StyleSheet } from 'react-native';

import AppScreen from '@src/components/AppScreen';
import HappeningTodaySection from './components/HappeningTodaySection';
import HomeHeaderSection from './components/HomeHeaderSection';
import QuickActionAndAdsSection from './components/QuickActionAndAdsSection';

const HomeScreen = (): React.ReactNode => {
  return (
    <AppScreen scrollable style={styles.container}>
      <HomeHeaderSection />
      <QuickActionAndAdsSection />
      <HappeningTodaySection />
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
  },
});

export default HomeScreen;
