import { StyleSheet } from 'react-native';

import AppScreen from '@src/components/AppScreen';
import colors from '@src/configs/colors';
import HomeHeaderSection from './components/HomeHeaderSection';

const HomeScreen = (): React.ReactNode => {
  return (
    <AppScreen style={styles.container}>
      <HomeHeaderSection />
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE_200,
    paddingHorizontal: 0,
  },
});

export default HomeScreen;
