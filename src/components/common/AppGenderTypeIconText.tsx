import { StyleSheet, View } from 'react-native';

import { GenderType, GenderTypeData } from '@src/api/constants/default';
import Size from '@src/utils/useResponsiveSize';
import AppText from '../AppText';
import colors from '@src/configs/colors';
import {
  MaterialSymbolsHorizontalRuleRounded,
  RiMenLine,
  RiWomenLine,
} from '../icons';

interface Props {
  type: GenderType;
  text: string;
}

const AppGenderTypeIconText = (props: Props): React.JSX.Element => {
  const { type, text } = props;

  const getIcon = () => {
    if (type === GenderTypeData.Male) return RiMenLine;
    if (type === GenderTypeData.Female) return RiWomenLine;
    return MaterialSymbolsHorizontalRuleRounded;
  };

  const Icon = getIcon();

  return (
    <View style={styles.container}>
      <Icon
        height={Size.calcAverage(14)}
        width={Size.calcAverage(14)}
        color={colors.GRAY_100}
      />
      <AppText style={styles.text}>{text}</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Size.calcAverage(2),
  },

  text: {
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
  },
});

export default AppGenderTypeIconText;
