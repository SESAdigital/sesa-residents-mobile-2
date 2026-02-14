import { StyleSheet, View } from 'react-native';

import AppScreen from '@src/components/AppScreen';
import AppText from '@src/components/AppText';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import SwitchPropertyRow from '@src/components/common/SwitchPropertyRow';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import Size from '@src/utils/useResponsiveSize';

const BookVisitorScreen = (): React.JSX.Element => {
  return (
    <AppScreen style={styles.container}>
      <AppScreenHeader>
        <View>
          <AppText style={styles.headerTitle}>Book Visitor</AppText>
          <SwitchPropertyRow />
        </View>
      </AppScreenHeader>

      <View></View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
  },

  headerTitle: {
    fontFamily: fonts.INTER_600,
    textAlign: 'center',
    fontSize: Size.calcAverage(16),
    color: colors.BLACK_200,
    paddingBottom: Size.calcHeight(2),
  },
});

export default BookVisitorScreen;
