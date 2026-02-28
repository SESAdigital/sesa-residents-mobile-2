import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { GetEstateRulesResData } from '@src/api/helpCenter.api';
import AppSkeletonLoader from '@src/components/AppSkeletonLoader';
import AppText from '@src/components/AppText';
import { MaterialSymbolsChevronRightRounded } from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import Size from '@src/utils/useResponsiveSize';

interface Props {
  data: GetEstateRulesResData;
  onPress: () => void;
}

const EstateRuleRow = ({ data, onPress }: Props): React.JSX.Element => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.contentContainer}>
        <AppText style={styles.title}>{data?.title}</AppText>
        <AppText style={styles.subtitle}>{data?.details}</AppText>
      </View>
      <MaterialSymbolsChevronRightRounded
        height={Size.calcAverage(24)}
        width={Size.calcAverage(24)}
        color={colors.BLACK_100}
      />
    </TouchableOpacity>
  );
};

export const EstateRuleRowLoader = (): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <AppSkeletonLoader width="50%" />
        <AppSkeletonLoader width="80%" />
      </View>
      <MaterialSymbolsChevronRightRounded
        height={Size.calcAverage(24)}
        width={Size.calcAverage(24)}
        color={colors.BLACK_100}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: Size.calcHeight(1),
    borderColor: colors.WHITE_300,
    paddingVertical: Size.calcHeight(16),
    marginHorizontal: Size.calcWidth(21),
  },

  contentContainer: {
    paddingRight: Size.calcWidth(16),
    flex: 1,
    rowGap: Size.calcHeight(4),
  },

  subtitle: {
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
  },

  title: {
    fontFamily: fonts.INTER_600,
    color: colors.BLACK_300,
  },
});

export default EstateRuleRow;
