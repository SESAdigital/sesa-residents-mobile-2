import { View, StyleSheet } from 'react-native';

import AppText from '@src/components/AppText';
import Size from '@src/utils/useResponsiveSize';

const HomeHeaderSection = (): React.ReactNode => {
  return (
    <>
      <View style={styles.headerContainer}>
        <View>
          <AppText>Hello, Akachi 👋</AppText>
          <AppText>6:16, Wesley Close,Frie...</AppText>
        </View>
      </View>

      <View>
        <AppText>My Wallet</AppText>
        <AppText>₦ 34,124,239</AppText>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: Size.calcHeight(12),
    paddingHorizontal: Size.calcWidth(21),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default HomeHeaderSection;
