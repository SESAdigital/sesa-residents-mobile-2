import { StyleSheet, View } from 'react-native';

import AppText from '@src/components/AppText';
import { MaterialSymbolsLightStickyNote2Rounded } from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import Size from '@src/utils/useResponsiveSize';

const EmptyRFIDComponent = (): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <MaterialSymbolsLightStickyNote2Rounded
            height={Size.calcAverage(24)}
            width={Size.calcAverage(24)}
            color={colors.GRAY_100}
          />
        </View>
        <AppText style={styles.title}>No RFIDs</AppText>
        <AppText style={styles.description}>
          When you get RFIDs, they will appear here.
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Size.calcAverage(21),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    alignItems: 'center',
    maxWidth: Size.calcWidth(220),
  },

  description: {
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
    textAlign: 'center',
  },

  iconContainer: {
    borderRadius: 100,
    height: Size.calcAverage(56),
    width: Size.calcAverage(56),
    backgroundColor: colors.LIGHT_GRAY_200,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontFamily: fonts.INTER_500,
    color: colors.BLACK_300,
    paddingBottom: Size.calcHeight(4),
    paddingTop: Size.calcHeight(10),
    textAlign: 'center',
  },
});

export default EmptyRFIDComponent;
